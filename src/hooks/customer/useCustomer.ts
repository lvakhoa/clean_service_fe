"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import customerAction from "@/apis/customer.action";

export const useCustomer = () => {
  const getAllCustomers = useQuery({
    queryKey: ["customers"],
    queryFn: customerAction.getAllCustomer,
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
