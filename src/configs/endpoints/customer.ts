import { AUTH_ENDPOINTS } from './auth';

export const CUSTOMER_ENDPOINTS = {
  ...AUTH_ENDPOINTS,
  order_history: '/dashboard/order_history',
  calendar: '/dashboard/calendar',
  feedback: '/dashboard/feedback',
  refund: '/dashboard/refund',
  chart: '/dashboard/chart',
};
