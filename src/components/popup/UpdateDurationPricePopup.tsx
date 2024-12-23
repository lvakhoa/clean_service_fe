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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  updateDurationPriceData,
  durationPriceSchema,
  partialDurationPriceSchema,
} from "@/schemas/durationPriceSchema";
import { useEffect } from "react";
import { useUpdateDurationPrice } from "@/hooks/useDurationPrice";

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

  const form = useForm<updateDurationPriceData>({
    mode: "onSubmit",
    resolver: zodResolver(partialDurationPriceSchema),
  });

  useEffect(() => {
    form.setValue("durationHours", durationHours);
    form.setValue("priceMultiplier", priceMultiplier);
  }, [durationHours, priceMultiplier]);

  const mutation = useUpdateDurationPrice();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitHandle = async (data: updateDurationPriceData) => {
    try {
      await mutation.mutateAsync({ id: id ?? "", data });
      queryClient.invalidateQueries({ queryKey: ["allDurationPrice"] });
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
          <DialogTitle>Update Duration Price</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div className="flex flex-col items-center justify-center gap-6 py-4">
            <Controller
              name="durationHours"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Duration Hours"
                  placeholder="Enter Type Name"
                  id="durationHours"
                  className="w-full"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.durationHours?.message}
                ></CustomInput>
              )}
            />

            <Controller
              name="priceMultiplier"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Base Price (USD)"
                  placeholder="Base Price"
                  id="priceMultiplier"
                  className="w-full"
                  type="number"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.priceMultiplier?.message}
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
