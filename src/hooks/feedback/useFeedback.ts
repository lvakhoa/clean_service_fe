"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import feedbackAction from "@/apis/feedback.action";

export const useFeedback = () => {
  const queryClient = useQueryClient();

  const getAllFeedbacks = useQuery({
    queryKey: ["feedbacks"],
    queryFn: feedbackAction.getAllFeedbacks,
  });

  const useGetFeedbackById = (id: string) =>
    useQuery({
      queryKey: ["feedback", id],
      queryFn: () => {
        return feedbackAction.getFeedbackById(id);
      },
    });

  const useDeleteFeedback = () =>
    useMutation({
      mutationFn: (id: string) => {
        return feedbackAction.deleteFeedback(id);
      },
    });

  return {
    queryClient,
    getAllFeedbacks,
    useGetFeedbackById,
    useDeleteFeedback,
  };
};
