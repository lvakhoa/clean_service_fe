import { AUTH_ENDPOINTS } from './auth';

export const ADMIN_ENDPOINTS = {
  ...AUTH_ENDPOINTS,
  dashboard: '/dashboard/chart',
  chart: '/dashboard/chart',
  service_type: '/dashboard/service/service-type',
  service_duration: '/dashboard/service/duration',
  service_room: '/dashboard/service/room',
  customer: '/dashboard/customer',
  employee: '/dashboard/employee',
  feedback: '/dashboard/feedback',
  issue: '/dashboard/issue',
  refund: '/dashboard/refund',
  order: '/dashboard/order',

};
