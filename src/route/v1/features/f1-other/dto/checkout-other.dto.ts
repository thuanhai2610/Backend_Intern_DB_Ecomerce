export class CheckoutDto {
    userId: string;
    cartItems: { sku: string; quatity: number; price: number }[];
    shippingFee: number;
    discount: number;
  }