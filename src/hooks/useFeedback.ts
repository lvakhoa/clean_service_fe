"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import feedbackAction from "@/apis/feedback.action";
import { use } from "react";
import { number } from "zod";

export const useFeedback = (page?: number, limit?: number) => {
  const queryClient = useQueryClient();

  const getAllFeedbacks = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => {
      return feedbackAction.getAllFeedbacks(page, limit);
    },
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

  const getFeedBackOfCurrentUser = useQuery({
    queryKey: ["feedbacks/customer"],
    queryFn: () => {
      return feedbackAction.getFeedBackOfCurrentUser(page, limit);
    },
  });

  return {
    getFeedBackOfCurrentUser,
    queryClient,
    getAllFeedbacks,
    useGetFeedbackById,
    useDeleteFeedback,
  };
};
