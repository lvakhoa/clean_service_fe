"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customerAction from "@/apis/customer.action";

export const useCustomer = (page?: number, limit?: number) => {
  const queryClient = useQueryClient();

  const useGetAllCustomers = () => {
    return useQuery({
      queryKey: ["customers"],
      queryFn: () => {
        return customerAction.getAllCustomer(page, limit);
      },
    });
  };

  const useGetCustomerById = (id: string) =>
    useQuery({
      queryKey: ["customer", id],
      queryFn: () => {
        return customerAction.getCustomerById(id);
      },
    });

  const useUpdateUser = (id: string) =>
    useMutation({
      mutationFn: (data: any) => {
        return customerAction.updateUser(id, data);
      },
    });

  const useGetCurrentCustomer = () => {
    return useQuery({
      queryKey: ["customer", "me"],
      queryFn: () => {
        return customerAction.getCurrentCustomer();
      },
    });
  };

  const useUpdateCurrentUser = () => {
    return useMutation({
      mutationFn: (data: any) => {
        return customerAction.updateCurrentUser(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["customer", "me"] });
      },
    });
  };
  return {
    queryClient,
    useGetAllCustomers,
    useGetCurrentCustomer,
    useGetCustomerById,
    useUpdateUser,
    useUpdateCurrentUser,
  };
};
