"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import customerAction from "@/apis/customer.action";

export const useCustomer = (page?: number, limit?: number) => {
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

  return {
    getAllCustomers,
    useGetCustomerById,
    useUpdateCustomer,
  };
};
