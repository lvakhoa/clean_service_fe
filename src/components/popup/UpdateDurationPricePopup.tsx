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
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  serviceTypeSchema,
  updateServiceTypeData,
} from "@/schemas/serviceTypeSchema";

export function UpdateDurationPricePopup({
  id,
  open,
  onClose,
  durationHours,
  priceMultiplier,
}: {
  id: string | null;
  open: boolean;
  durationHours: number;
  priceMultiplier: number;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const form = useForm<updateServiceTypeData>({
    mode: "onSubmit",
    resolver: zodResolver(serviceTypeSchema),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitHandle = async (data: updateServiceTypeData) => {
    try {
      console.log("Submitting data:", data);
      // await updateServiceDetail(data);
      console.log("Service detail update successfully.");
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
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Name"
                  placeholder="Enter Type Name"
                  id="name"
                  className="w-full"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.name?.message}
                ></CustomInput>
              )}
            />

            <Controller
              name="basePrice"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Base Price (USD)"
                  placeholder="Base Price"
                  id="base-price"
                  className="w-full"
                  type="number"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.basePrice?.message}
                ></CustomInput>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Description"
                  placeholder="Enter Description"
                  id="description"
                  className="w-full"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.description?.message}
                ></CustomInput>
              )}
            />
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
