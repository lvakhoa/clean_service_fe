import { AUTH_ENDPOINTS } from './auth';

export const HELPER_ENDPOINTS = {
  ...AUTH_ENDPOINTS,
  feedback: '/dashboard/feedback',
  job_history: '/dashboard/job-history',
  calendar: '/dashboard/calendar',
};
