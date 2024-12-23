"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomInput from "../input/CustomInput";
import CustomSelect from "../select/CustomSelect";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateServiceTypeData,
  partialServiceTypeSchema,
} from "@/schemas/serviceTypeSchema";
import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { useUpdateServiceType } from "@/hooks/useServiceType";

export function UpdateServiceTypePopup({
  id,
  open,
  basePrice,
  description,
  onClose,
}: {
  id: string | null;
  open: boolean;
  basePrice: number;
  description: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const form = useForm<updateServiceTypeData>({
    mode: "onSubmit",
    resolver: zodResolver(partialServiceTypeSchema),
  });

  const mutation = useUpdateServiceType();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    form.setValue("description", description);
    form.setValue("basePrice", basePrice);
  }, [basePrice, description]);

  const onSubmitHandle = async (data: updateServiceTypeData) => {
    try {
      await mutation.mutateAsync({ id: id ?? "", data });
      queryClient.invalidateQueries({ queryKey: ["serviceTypes"] });
      onClose();
    } catch (error) {
      console.error("Error while updating service detail:", error);
      alert("Failed to update service detail. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Service Detail</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div className="flex flex-col items-center justify-center gap-6 py-4">
            <div className="flex w-full gap-4">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Description"
                    placeholder="Enter description"
                    id="description"
                    className="w-full"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.description?.message}
                  />
                )}
              />

              <Controller
                name="basePrice"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Base Price (USD)"
                    placeholder="Enter Base Price"
                    id="basePrice"
                    className="w-full"
                    type="number"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.basePrice?.message}
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="px-[23px] py-[9px] text-[16px]"
              variant={"default"}
              type="submit"
            >
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
