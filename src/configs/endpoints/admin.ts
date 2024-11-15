import { AUTH_ENDPOINTS } from './auth';

export const ADMIN_ENDPOINTS = {
  ...AUTH_ENDPOINTS,
  dashboard: '/dashboard/chart',
  chart: '/dashboard/chart',
  service_category: '/dashboard/service-category',
  service_details: '/dashboard/service-details',
  customer: '/dashboard/customer',
  employee: '/dashboard/employee',
  feedback: '/dashboard/feedback',
  issue: '/dashboard/issue',
  refund: '/dashboard/refund',
  order: '/dashboard/order',
};
