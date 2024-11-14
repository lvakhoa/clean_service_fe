import CleanClient from './CleanClient';

export const cleanClient = CleanClient.getInstance();
export const cleanApi = cleanClient.getClient();
