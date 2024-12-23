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
  updateRoomPricingData,
  roomPricingSchema,
  partialRoomPricingSchema,
} from "@/schemas/roomPricingSchema";
import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useUpdateRoomPricing } from "@/hooks/useRoomPricing";

export function UpdateRoomPricingPopup({
  id,
  open,
  roomCount,
  additionalPrice,
  onClose,
}: {
  id: string | null;
  open: boolean;
  roomCount: number;
  additionalPrice: number;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const form = useForm<updateRoomPricingData>({
    mode: "onSubmit",
    resolver: zodResolver(partialRoomPricingSchema),
  });

  const mutation = useUpdateRoomPricing();

  useEffect(() => {
    form.setValue("roomCount", roomCount);
    form.setValue("additionalPrice", additionalPrice);
  }, [roomCount, additionalPrice]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitHandle = async (data: updateRoomPricingData) => {
    try {
      await mutation.mutateAsync({ id: id ?? "", data });
      queryClient.invalidateQueries({ queryKey: ["allRoomPricings"] });
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
          <DialogTitle>Update Room Pricing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div className="flex flex-col items-center justify-center gap-6 py-4">
            <div className="flex w-full gap-4">
              <Controller
                name="roomCount"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Room Count"
                    placeholder="Enter Room Count"
                    id="roomCount"
                    className="w-full"
                    type="number"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.roomCount?.message}
                  />
                )}
              />

              <Controller
                name="additionalPrice"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Additional Price (USD)"
                    placeholder="Enter + Price"
                    id="additionalPrice"
                    className="w-full"
                    type="number"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.additionalPrice?.message}
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
