"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customerAction from "@/apis/customer.action";

export const useCustomer = (page?: number, limit?: number) => {
  const queryClient = useQueryClient();

  const getAllCustomers = useQuery({
    queryKey: ["customers"],
    queryFn: () => {
      return customerAction.getAllCustomer(page, limit);
    },
  });

  const useGetCustomerById = (id: string) =>
    useQuery({
      queryKey: ["customer", id],
      queryFn: () => {
        return customerAction.getCustomerById(id);
      },
    });

  const useUpdateCustomer = (id: string) =>
    useMutation({
      mutationFn: (data: any) => {
        return customerAction.updateCustomer(id, data);
      },
    });

  const useUpdateCustomerIdCard = (id: string) =>
    useMutation({
      mutationFn: (data: any) => {
        return customerAction.updateCustomerIdCard(id, data);
      },
    });

  const useUpdateCustomerProfile = (id: string) =>
    useMutation({
      mutationFn: (data: any) => {
        return customerAction.updateCustomerProfile(id, data);
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
  return {
    queryClient,
    getAllCustomers,
    useGetCurrentCustomer,
    useUpdateCustomerProfile,
    useUpdateCustomerIdCard,
    useGetCustomerById,
    useUpdateCustomer,
  };
};
