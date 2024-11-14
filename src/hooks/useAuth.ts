import authAction from '@/apis/auth.action';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useLogin = () => {
  return useQuery({
    queryKey: ['login'],
    queryFn: authAction.logIn,
    enabled: false,
  });
};
