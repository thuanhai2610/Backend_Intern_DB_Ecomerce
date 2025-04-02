export enum NotificationType {
    personal = 'PERSONAL',
    all = 'ALL',
    newfeed = 'NEWFEED',
    follower = 'FOLLOWER',
  
    // APP CUSTOMER
    order_success = 'ORDER_SUCCESS',
    shipper_confirm = 'SHIPPER_CONFIRM',
    delivering = 'DELIVERING',
    delivery_success = 'DELIVERY_SUCCESS',
  
    // REFERRAL
    referral_success = 'REFERRAL_SUCCESS',
    receive_point = 'RECEIVE_POINT',
  
    // VOUCHER
    voucher_new = 'VOUCHER_NEW',
  
    // SHIPPER
    new_order_for_shipper = 'NEW_ORDER_FOR_SHIPPER',
  }