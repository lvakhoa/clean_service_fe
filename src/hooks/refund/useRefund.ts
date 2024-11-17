"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import refundAction from "@/apis/refund.action";

export const useRefund = () => {
  const queryClient = useQueryClient();

  const getAllRefunds = useQuery({
    queryKey: ["refunds"],
    queryFn: refundAction.getAllRefunds,
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
    queryFn: refundAction.getRefundOfCurrentUser,
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
