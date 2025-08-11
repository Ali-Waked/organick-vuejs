export function getNotificationIcon(type) {
  switch (type) {
    // Orders
    case 'order_created':
      return 'mdi-cart-plus';
    case 'order_status_updated':
      return 'mdi-progress-check';
    case 'order_cancelled':
      return 'mdi-cart-off';
    case 'order_refund_requested':
      return 'mdi-cash-refund';
    case 'order_completed':
      return 'mdi-cart-check';
    case 'order_assigned_to_driver':
      return 'mdi-truck-delivery';

    // Inventory
    case 'product_low_stock':
      return 'mdi-battery-low';
    case 'product_out_of_stock':
      return 'mdi-battery-alert';
    case 'product_added':
      return 'mdi-package-variant';

    // Payments
    case 'payment_success':
      return 'mdi-credit-card-check';
    case 'payment_failed':
      return 'mdi-credit-card-off';
    case 'payment_refunded':
      return 'mdi-cash-refund';

    // Users & Customers
    case 'customer_registered':
      return 'mdi-account-plus';
    case 'newsletter_subscribed':
      return 'mdi-email-newsletter';
    case 'contact_message': // Contact Us
      return 'mdi-email-alert';

    case 'chat_message': // Chat
      return 'mdi-chat-outline';

    // Ratings
    case 'product_rated':
      return 'mdi-star';
    case 'site_rated':
      return 'mdi-star-outline';

    // Services
    case 'service_subscribed':
      return 'mdi-handshake';

    default:
      return 'mdi-bell';
  }
}
