"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import customerAction from "@/apis/customer.action";

export const useCustomer = () => {
  const getAllCustomers = () =>
    useQuery({
      queryKey: ["customers"],
      queryFn: customerAction.getAllCustomer,
    });

  const getCustomerById = (id: string) =>
    useQuery({
      queryKey: ["customer", id],
      queryFn: () => {
        return customerAction.getCustomerById(id);
      },
    });

  const updateCustomer = (id: string) =>
    useMutation({
      mutationFn: (data: any) => {
        return customerAction.updateCustomer(id, data);
      },
    });

  return {
    getAllCustomers,
    getCustomerById,
    updateCustomer,
  };
};
