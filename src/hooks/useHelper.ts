"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import helperAction from "@/apis/helper.action";
import { updateAdminHelperData } from "@/schemas/helperSchema";

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

  const useUpdateHelper = (id: string) => {
    return useMutation({
      mutationFn: (data: updateAdminHelperData) => {
        return helperAction.updateHelper(id, data);
      },
    });
  };

  const useGetCurrentHelper = () => {
    return useQuery({
      queryKey: ["helper", "me"],
      queryFn: () => {
        return helperAction.getCurrentHelper();
      },
    });
  };

  const useUpdateCurrentHelper = () => {
    return useMutation({
      mutationFn: (data: updateAdminHelperData) => {
        return helperAction.updateCurrentHelper(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["helper", "me"] });
      },
    });
  };

  return {
    queryClient,
    useGetCurrentHelper,
    useGetAllHelpers,
    useGetHelperById,
    useUpdateHelper,
    useUpdateCurrentHelper,
  };
};
