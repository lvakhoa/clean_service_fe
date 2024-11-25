"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { InputWithLabel } from "@/components/input/inputwithlabel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/skeleton/skeleton";
import { ClipLoader } from "react-spinners";

import { partialAdminCustomerSchema } from "@/schemas/customerSchema";
import { Gender } from "@/types/enum";

import { useCustomer } from "@/hooks/useCustomer";

import { formatDate } from "@/helpers/formatDateTime";
import { toast } from "react-toastify";

const genderOptions = Object.values(Gender);

const DEFAULT_IMAGES = {
  idCard: "/images/identity.png",
  profilePicture: "/images/camera.svg",
};

type FormField = z.infer<typeof partialAdminCustomerSchema>;

const CustomerInfo = () => {
  const { id } = useParams<{ id: string }>();

  const [customerIdCard, setCustomerIdCard] = useState<string | null>(
    DEFAULT_IMAGES.idCard,
  );
  const [customerProfilePicture, setCustomerProfilePicture] = useState<
    string | null
  >(DEFAULT_IMAGES.profilePicture);

  const { useUpdateUser, useGetCustomerById } = useCustomer();

  const {
    isPending,
    data: queryData,
    error: queryError,
  } = useGetCustomerById(id);
  const updateCustomerMutation = useUpdateUser(id);

  const form = useForm<FormField>({
    mode: "onBlur",
    resolver: zodResolver(partialAdminCustomerSchema),
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (queryData) {
      reset({
        ...queryData.data,
        profilePictureFile: undefined,
        idCardFile: undefined,
      });
      setCustomerIdCard(queryData.data?.identityCard || DEFAULT_IMAGES.idCard);
      setCustomerProfilePicture(
        queryData.data?.profilePicture || DEFAULT_IMAGES.profilePicture,
      );
    } else {
      toast.error("Get customer info failed");
      console.log(queryError);
    }
  }, [queryData, queryError, reset]);

  const onSubmitHandle = async (data: FormField) => {
    try {
      toast.info("Updating customer info...");
      await updateCustomerMutation.mutateAsync(data);

      toast.dismiss();
      toast.success("Update customer successfully");
    } catch (error) {
      toast.dismiss();
      toast.error("Update customer failed");
      console.error("Update customer error:", error);
    }
  };

  const handleFileChange =
    (setFilePreview: (url: string) => void, onChange: (file: File) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFilePreview(URL.createObjectURL(file));
        onChange(file);
      }
    };

  return (
    <div className="flex h-full w-full flex-col bg-white md:flex-row">
      <FormProvider {...form}>
        <form
          className="flex h-full w-full flex-col bg-white md:flex-row"
          onSubmit={handleSubmit(onSubmitHandle)}
        >
          <div className="min-h-screen bg-white pb-10 md:w-2/3">
            <div className="flex flex-row">
              <Image
                src="/images/exit-button.png"
                alt="X-button"
                width={70}
                height={70}
                className="cursor-pointer"
                onClick={() => window.history.back()}
              />
              <p className="my-auto ml-[10px] text-center font-Averta-Bold text-4xl">
                User Info
              </p>
            </div>

            <div className="mt-[75px] grid items-center justify-center">
              <div className="flex flex-col md:flex-row">
                {isPending ? (
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-[21px] w-[5vw]" />
                    <Skeleton className="h-[50px] w-[25vw]" />
                  </div>
                ) : (
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <InputWithLabel
                        labelText="FULL NAME"
                        inputType="text"
                        inputPlaceholder="Enter Full Name"
                        inputId="fullName"
                        inputWidth="25vw"
                        defaultValue={field.value}
                        error={errors.fullName?.message}
                        {...field}
                      />
                    )}
                  />
                )}
                <div className="md:ml-2 md:mt-0">
                  {isPending ? (
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-[21px] w-[5vw]" />
                      <Skeleton className="h-[50px] w-[11.25vw]" />
                    </div>
                  ) : (
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field: { onChange, value, ...field } }) => (
                        <InputWithLabel
                          labelText="DATE OF BIRTH"
                          inputType="date"
                          inputId="dateOfBirth"
                          inputPlaceholder=""
                          inputWidth="11.25vw"
                          error={errors.dateOfBirth?.message}
                          defaultValue={formatDate(value ?? null)}
                          onChange={(e) => onChange(new Date(e.target.value))}
                          {...field}
                        />
                      )}
                    />
                  )}
                </div>
                <div className="md:ml-2 md:mt-0">
                  {isPending ? (
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-[21px] w-[5vw]" />
                      <Skeleton className="h-[50px] w-[6.875vw]" />
                    </div>
                  ) : (
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <InputWithLabel
                          labelText="GENDER"
                          inputPlaceholder=""
                          inputType="combobox"
                          inputId="gender"
                          inputWidth="6.875vw"
                          options={genderOptions}
                          error={errors.gender?.message}
                          onValueChange={(val) => {
                            onChange(val as Gender);
                          }}
                          defaultValue={queryData?.data?.gender as Gender}
                        />
                      )}
                    />
                  )}
                </div>
              </div>
              <div className="mt-[30px] flex flex-col md:flex-row">
                {isPending ? (
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-[21px] w-[5vw]" />
                    <Skeleton className="h-[50px] w-[25vw]" />
                  </div>
                ) : (
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <InputWithLabel
                        labelText="PHONE NUMBER"
                        inputType="text"
                        inputPlaceholder="Enter a Phone number"
                        inputId="phoneNumber"
                        defaultValue={field.value}
                        inputWidth="25vw"
                        {...field}
                      />
                    )}
                  />
                )}
                <div className="md:ml-2 md:mt-0">
                  {isPending ? (
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-[21px] w-[5vw]" />
                      <Skeleton className="h-[50px] w-[18.125vw]" />
                    </div>
                  ) : (
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <InputWithLabel
                          labelText="EMAIL ADDRESS"
                          inputType="email"
                          inputPlaceholder="Enter your email address"
                          inputId="contactEmail"
                          inputWidth="18.125vw"
                          plusPX="8px"
                          defaultValue={field.value}
                        />
                      )}
                    />
                  )}
                </div>
              </div>
              <div className="mt-[30px] flex w-full flex-col md:flex-row">
                {isPending ? (
                  <div className="flex w-full flex-col gap-1.5">
                    <Skeleton className="h-[21px] w-[5vw]" />
                    <Skeleton className="h-[50px] w-[full]" />
                  </div>
                ) : (
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <InputWithLabel
                        labelText="ADDRESS"
                        inputType="text"
                        inputPlaceholder="Enter your city/province"
                        inputId="address"
                        inputWidth="44vw"
                        defaultValue={field.value}
                        error={errors.address?.message}
                        {...field}
                      />
                    )}
                  />
                )}
              </div>
              <div className="mt-[3.5vw] flex items-center justify-center pb-[2vw]">
                <Button
                  disabled={updateCustomerMutation.isPending || isPending}
                  type="submit"
                  className="h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px] md:w-1/3"
                >
                  {isPending
                    ? "Loading..."
                    : updateCustomerMutation.isPending
                      ? "Saving..."
                      : "Save"}
                </Button>
              </div>
            </div>
          </div>
          {/* Section Right */}
          <div className="min-h-screen md:w-1/3">
            <p className="my-[12.8875px] font-Averta-Bold text-4xl">Avatar</p>

            <div className="mb-6">
              {isPending ? (
                <ClipLoader color="#000000" loading={isPending} size={100} />
              ) : (
                <Image
                  src={customerProfilePicture ?? "/images/camera.svg"}
                  alt="camera"
                  width={160}
                  height={160}
                  className="mx-auto flex items-center justify-center"
                />
              )}
              <Button
                variant="link"
                className="mx-auto flex items-center justify-center font-Averta-Semibold text-[18px] text-[#1A78F2]"
                onClick={() =>
                  document.getElementById("profilePictureInput")?.click()
                }
              >
                Upload
                <Controller
                  name="profilePictureFile"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      id="profilePictureInput"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange(
                        setCustomerProfilePicture,
                        field.onChange,
                      )}
                    />
                  )}
                />
              </Button>
            </div>

            <p className="mb-4 ml-[2.2vw] mt-[1vw] font-Averta-Bold text-3xl">
              ID Card
            </p>
            <div className="px-4 py-8 text-center">
              {isPending ? (
                <ClipLoader color="#000000" loading={isPending} size={150} />
              ) : (
                <Image
                  src={customerIdCard ?? "/images/identity.png"}
                  alt="identity"
                  width={400}
                  height={200}
                />
              )}
            </div>
            <div className="flex flex-row justify-center">
              <Button className="h-[40px] w-[170px] bg-[#1A78F2] font-Averta-Semibold text-[16px]">
                Download
              </Button>
              <Button
                className="ml-[10px] h-[40px] w-[170px] border-2 border-[#1A78F2] bg-white font-Averta-Semibold text-[16px] text-[#1A78F2] hover:bg-gray-100"
                onClick={() => document.getElementById("idCardInput")?.click()}
              >
                Upload
                <Controller
                  name="idCardFile"
                  control={control}
                  render={({ field }) => (
                    <input
                      accept="image/*"
                      type="file"
                      id="idCardInput"
                      className="hidden"
                      onChange={handleFileChange(
                        setCustomerIdCard,
                        field.onChange,
                      )}
                    />
                  )}
                />
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CustomerInfo;
