"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import feedbackAction from "@/apis/feedback.action";
import { use } from "react";
import { number } from "zod";
import { CreateFeedbackDto } from "@/schemas/createFeedbackSchema";

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

  const createFeedback = useMutation({
    mutationFn: (data: CreateFeedbackDto) => {
      return feedbackAction.createFeedback(data);
    },
  });

  return {
    getFeedBackOfCurrentUser,
    queryClient,
    getAllFeedbacks,
    useGetFeedbackById,
    useDeleteFeedback,
    createFeedback,
  };
};
