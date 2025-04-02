import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { OtherDocument } from './schemas/other.schema';
import OtherRepository from './other.repository';
import CartService from '../f8-cart/cart.service';
import ShippingMethodService from '../f6-shipping-method/shipping-method.service';
import DiscountService from '../f5-discounts/discount.service';
import OrderService from '../f9-orders/order.service';
import OrderItemService from '../f10-orderitems/orderitem.service';
import CartRepository from '../f8-cart/cart.repository';
import SkuService from '../f7-skus/sku.service';
import NotifycationService from '../f11-notifycations/notifycation.service';
import CheckoutReviewDto from '../f9-orders/dto/checkout-review.dto';
import CreateOrderItemDto from '../f10-orderitems/dto/create-orderitem.dto';
import { OrderStatus } from '../f9-orders/enums/order-status.enum';

@Injectable()
export default class OtherService extends BaseService<OtherDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly otherRepository: OtherRepository,
    readonly cartService: CartService,
    readonly shippingMethodService: ShippingMethodService,
    readonly discountService: DiscountService,
    readonly orderService: OrderService,
    readonly orderItemService: OrderItemService,
    readonly cartReponsitory: CartRepository,
    readonly skuService: SkuService,
    readonly notificationService: NotifycationService,
  ) {
    super(logger, otherRepository);
  }

  async checkout(userId: string, input: CheckoutReviewDto) {
    if (!userId) {
      throw new Error('UserId is missing');
    }
    // checkoutreview product you want order
    const inputReviewed = await this.orderService.checkoutReview(input);

    if (inputReviewed.checkout.totalAmount <= 0) {
      throw new Error('tổng tiền phải lớn hơn 0');
    }

    //create order
    const order = await this.orderService.createOrderCheckout({
      userId,
      shopId: inputReviewed.shopId ?? '',
      discountId: inputReviewed.discountId,
      shippingMethodId: inputReviewed.shippingMethodId,
      totalAmount: inputReviewed.checkout.totalAmount,
      status: OrderStatus.Pending,
    });

    if (!order || !order.id) {
      throw new Error('tạo đơn hàng thất bại ');
    }

    //create orderItems
    const orderItems: CreateOrderItemDto[] = inputReviewed.orderItems.map(
      (item) => ({
        ...item,
        orderId: order.id, // Gán orderId của đơn hàng mới
      }),
    );

    await this.orderItemService.createOrderItems(orderItems);

    // when you order successfuly  remove items in  carts
    const removeCheckoutFromCart = await Promise.all(
      inputReviewed.orderItems.map((item) =>
        this.cartService.removeCheckoutFromCart(userId, item.skuId),
      ),
    );

    // reduce discount
    if (inputReviewed.discountId) {
      await this.discountService.reduceDiscountQuatity(
        inputReviewed.discountId,
      );
    }

    // reduce product/sku stock
    await Promise.all(
      inputReviewed.orderItems.map((item) =>
        this.skuService.reduceStock(item.productId, item.skuId, item.quantity),
      ),
    );

    // send notification when you order successfuly
    const sendNotification = await this.notificationService.sendNotificaiton(
      userId,
      order.id,
    );

    if (!sendNotification) {
      throw new Error('thông báo thất bại');
    }

    // console.log(sendNotification);

    return { order, sendNotification, removeCheckoutFromCart };
  }
}
