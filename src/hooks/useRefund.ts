"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import refundAction from "@/apis/refund.action";

export const useRefund = (page?: number, limit?: number) => {
  const queryClient = useQueryClient();

  const getAllRefunds = useQuery({
    queryKey: ["refunds"],
    queryFn: () => {
      return refundAction.getAllRefunds(page, limit);
    },
  });

  const useGetRefundById = (id: string) =>
    useQuery({
      queryKey: ["refund", id],
      queryFn: () => {
        return refundAction.getRefundById(id);
      },
    });

  const getRefundOfCurrentUser = useQuery({
    queryKey: ["refunds/customer"],
    queryFn: () => {
      return refundAction.getRefundOfCurrentUser(page, limit);
    },
  });

  const deleteRefundMutation = useMutation({
    mutationFn: (id: string) => refundAction.deleteRefund(id),
  });

  const updateRefundMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      refundAction.updateRefund(id, data),
  });

  return {
    queryClient,
    getRefundOfCurrentUser,
    getAllRefunds,
    useGetRefundById,
    deleteRefundMutation,
    updateRefundMutation,
  };
};
