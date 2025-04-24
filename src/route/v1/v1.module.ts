import FreeApiModule from '@authorization/a2-free-api/free-api.module';
import AuthUserAccessModule from '@authorization/a3-auth-user-access/auth-user-access.module';
import AuthUserIdModule from '@authorization/a4-auth-user-id/auth-user-id.module';
import GroupModule from '@authorization/a5-group/group.module';
import GroupDetailModule from '@authorization/a6-group-detail/group-detail.module';
import GroupApiModule from '@authorization/a7-group-api/group-api.module';
import BackupDataModule from '@common/c0-backup/backup-data.module';
import DashboardModule from '@common/c10-dashboard/dashboard.module';
import TransactionModule from '@common/c11-transaction/transaction.module';
import NotificationModule from '@common/c12-notification/notification.module';
import SettingModule from '@common/c13-setting/setting.module';
import { SeedModule } from '@common/c14-seed/seed.module';
import CountryModule from '@common/c15-country/country.module';
import CronSettingModule from '@common/c16-cron-setting/cron-setting.module';
import AppSubscriptionModule from '@common/c17-subscriptions/app-subscription.module';
import OtpModule from '@common/c2-otp/otp.module';
import HistoryModule from '@common/c9-history/history.module';
import RolesGuard from '@guard/roles.guard';
import { ShareFunction } from '@helper/static-function';
import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import TestModule from 'src/route/v1/features/f1-tests/test.module';
import UserModule from './authorization/a1-user/user.module';
import AuthModule from './common/c1-auth/auth.module';
import UploadModule from './common/c3-upload/upload.module';
import FileManagerModule from './common/c4-file-manager/file-manager.module';
import StaticS3Module from './common/c5-static-s3/static-s3.module';
import ProvinceModule from './common/c6-province/province.module';
import DistrictModule from './common/c7-district/district.module';
import VillageModule from './common/c8-village/village.module';
import ShopModule from './features/f2-shop/shop.module';
import ProductModule from './features/f3-products/product.module';
import CategoryModule from './features/f4-categories/category.module';
import DiscountModule from './features/f5-discounts/discount.module';
import ShippingMethodModule from './features/f6-shipping-method/shipping-method.module';
import SkuModule from './features/f7-skus/sku.module';
import CartModule from './features/f8-cart/cart.module';

import OrderModule from './features/f9-orders/order.module';
import OrderItemModule from './features/f10-orderitems/orderitem.module';
import NotifycationModule from './features/f11-notifycations/notifycation.module';
import SearchItemModule from './features/f12-searchItem/search-item.module';
import BankModule from './features/f13-banks/bank.module';
import BannerModule from './features/f14-banners/banner.module';
import UserBankModule from './features/f15-userbanks/user-bank.module';
import CustomerModule from './features/f18-customers/customer.module';
import ReferralModule from './features/f19-referrals/referral.module';
import UserAddressModule from './features/f20-users-address/user-address.module';
import BrandModule from './features/f21-brands/brand.module';
import AttributeModule from './features/f22-atrributes/attribute.module';
import FlashSaleModule from './features/f23-flash-sales/flash-sale.module';
import { ShopVoucher } from './features/f24-shop-vouchers/schemas/shop-voucher.schema';
import ShopVoucherModule from './features/f24-shop-vouchers/shop-voucher.module';
import ReviewModule from './features/f25-reviews/review.module';
import ConversationModule from './features/f26-conversations/conversation.module';
import MessageModule from './features/f27-messages/message.module';
import BranchModule from './features/f28-branches/branch.module';
import PaymentModule from './features/f29-payments/payment.module';
const routes: Routes = [
  {
    path: '/v1',
    children: [
      // Authorizations
      { path: '/users', module: UserModule },
      { path: '/free-apis', module: FreeApiModule },
      { path: '/auth-user-accesses', module: AuthUserAccessModule },
      { path: '/auth-user-ids', module: AuthUserIdModule },
      { path: '/groups', module: GroupModule },
      { path: '/group-details', module: GroupDetailModule },
      { path: '/group-apis', module: GroupApiModule },

      // Seed
      { path: '/seeds', module: SeedModule },

      // Commons
      { path: '/backup-datas', module: BackupDataModule },
      { path: '/auth', module: AuthModule },
      { path: '/otps', module: OtpModule },
      { path: '/uploads', module: UploadModule },
      { path: '/file-manager', module: FileManagerModule },
      { path: '/provinces', module: ProvinceModule },
      { path: '/districts', module: DistrictModule },
      { path: '/villages', module: VillageModule },
      { path: '/histories', module: HistoryModule },
      { path: '/dashboards', module: DashboardModule },
      { path: '/transactions', module: TransactionModule },
      { path: '/notifications', module: NotificationModule },
      { path: '/settings', module: SettingModule },
      { path: '/banks', module: BankModule },
      { path: '/countries', module: CountryModule },

      // Features
      { path: '/cron-settings', module: CronSettingModule },

      { path: '/tests', module: TestModule },
     
      { path: '/shops', module: ShopModule },
      { path: '/products', module: ProductModule },
      { path: '/categories', module: CategoryModule },
      { path: '/discounts', module: DiscountModule },
      { path: '/shipping-method', module: ShippingMethodModule },
      { path: '/skus', module: SkuModule },
      { path: '/carts', module: CartModule },
      { path: '/orders', module: OrderModule },
      { path: '/orderitems', module: OrderItemModule},
      { path: '/notifycations', module: NotifycationModule },
      { path: '/searchitems', module: SearchItemModule },
      { path: '/banners', module: BannerModule },
      { path: '/userbanks', module: UserBankModule },
      { path: '/districts', module: DistrictModule },
      { path: '/villages', module: VillageModule },
      { path: '/customers', module: CustomerModule },
      { path: '/referrals', module: ReferralModule },
      { path: '/users-address', module: UserAddressModule },
      { path: '/brands', module: BrandModule },
      { path: '/attributes', module: AttributeModule },
      { path: '/flash-sales', module: FlashSaleModule },
      { path: '/shop-vouchers', module: ShopVoucherModule },
      { path: '/reviews', module: ReviewModule },
      { path: '/conversations', module: ConversationModule },
      { path: '/messages', module: MessageModule },
      { path: '/branches', module: BranchModule },
      { path: '/payments', module: PaymentModule },
      { path: '/app-subscriptions', module: AppSubscriptionModule },
    ],
  },
];

if (ShareFunction.checkIsConfigS3Storage()) {
  /* eslint no-console: 0 */
  console.log('*** Replace serve static via router static with s3 storage ***');
  routes.push({ path: '/static', module: StaticS3Module });
}
const imports = [
  RouterModule.forRoutes(routes),

  // authorization
  UserModule,
  FreeApiModule,
  AuthUserAccessModule,
  AuthUserIdModule,
  GroupModule,
  GroupDetailModule,
  GroupApiModule,
  RolesGuard,

  // Seed
  SeedModule,

  // common
  BackupDataModule,
  AuthModule,
  OtpModule,
  UploadModule,
  FileManagerModule,
  ProvinceModule,
  DistrictModule,
  VillageModule,
  HistoryModule,
  DashboardModule,
  NotificationModule,
  SettingModule,
  CountryModule,
  BankModule,
  BannerModule,
  UserBankModule,
  DistrictModule,
  VillageModule,
CustomerModule,
ReferralModule,
UserAddressModule,
BrandModule,
AttributeModule,
FlashSaleModule,
ShopVoucherModule,
ReviewModule,
ConversationModule,
MessageModule,
BranchModule,
  TransactionModule,

  // features
  TestModule,
  AppSubscriptionModule,
ShopModule,
ProductModule,
CartModule,
CategoryModule,
DiscountModule,
ShippingMethodModule,
SkuModule,
OrderModule,
OrderItemModule,
NotifycationModule,
SearchItemModule,
PaymentModule,
];

if (ShareFunction.checkIsConfigS3Storage()) {
  /* eslint no-console: 0 */
  console.log('*** Import module S3Storage dynamic ***');
  imports.push(StaticS3Module);
}

@Module({
  imports,
})
export default class V1Module {}
