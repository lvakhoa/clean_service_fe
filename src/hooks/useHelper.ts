"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import helperAction from "@/apis/helper.action";

export const useHelper = (page?: number, limit?: number) => {
  const queryClient = useQueryClient();

  const useGetAllHelpers = () => {
    return useQuery({
      queryKey: ["helpers"],
      queryFn: () => helperAction.getAllHelpers(page, limit),
    });
  };

  const useGetHelperById = (id: string) => {
    return useQuery({
      queryKey: ["helper", id],
      queryFn: () => helperAction.getHelperById(id),
    });
  };

  const useUpdateUserHelper = (id: string) => {
    return useMutation({
      mutationFn: (data: any) => {
        return helperAction.updateUserHelper(id, data);
      },
    });
  };

  const useUpdateHelper = (id: string) => {
    return useMutation({
      mutationFn: (data: any) => {
        return helperAction.updateHelper(id, data);
      },
    });
  };

  const useUpdateHelperIdCard = (id: string) =>
    useMutation({
      mutationFn: (data: any) => {
        return helperAction.updateHelperIdCard(id, data);
      },
    });

  const useUpdateHelperProfilePicture = (id: string) =>
    useMutation({
      mutationFn: (data: any) => {
        return helperAction.updateHelperProfilePicture(id, data);
      },
    });

  const useUpdateHelperResume = (id: string) =>
    useMutation({
      mutationFn: (data: any) => {
        return helperAction.updateHelperResume(id, data);
      },
    });

  const useGetCurrentHelper = () => {
    return useQuery({
      queryKey: ["helper", "me"],
      queryFn: () => {
        return helperAction.getCurrentHelper();
      },
    });
  };

  return {
    queryClient,
    useGetCurrentHelper,
    useGetAllHelpers,
    useGetHelperById,
    useUpdateUserHelper,
    useUpdateHelper,
    useUpdateHelperIdCard,
    useUpdateHelperProfilePicture,
    useUpdateHelperResume,
  };
};
