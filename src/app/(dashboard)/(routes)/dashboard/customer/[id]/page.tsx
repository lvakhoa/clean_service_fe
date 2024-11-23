"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { CustomerInputWithLabel } from "@/components/input/customerInputWithLabel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/skeleton/skeleton";

import { UserType } from "@/types/enum";
import { partialCustomerSchema } from "@/schemas/customer";

import { useCustomer } from "@/hooks/useCustomer";

const DEFAULT_CUSTOMER_DATA: Customer = {
  id: "-",
  fullName: "khang",
  address: "-",
  phoneNumber: "-",
  email: "-",
  userType: UserType.Customer,
  gender: "Other",
  createdAt: new Date(),
  updatedAt: new Date(),
  dateOfBirth: "2000-01-01",
};

const DEFAULT_IMAGES = {
  idCard: "/images/identity.png",
  profilePicture: "/images/camera.svg",
};

type FormField = z.infer<typeof partialCustomerSchema>;

const CustomerInfo = () => {
  const { id } = useParams<{ id: string }>();

  const [customerData, setCustomerData] = useState<Customer>(
    DEFAULT_CUSTOMER_DATA
  );
  const [customerIdCard, setCustomerIdCard] = useState<string | null>(
    DEFAULT_IMAGES.idCard
  );
  const [customerProfilePicture, setCustomerProfilePicture] = useState<
    string | null
  >(DEFAULT_IMAGES.profilePicture);

  const {
    useUpdateCustomer,
    useGetCustomerById,
    useUpdateCustomerIdCard,
    useUpdateCustomerProfile,
  } = useCustomer();

  const {
    isPending,
    data: queryData,
    error: queryError,
  } = useGetCustomerById(id);

  const updateCustomerMutation = useUpdateCustomer(id);
  const updateIdCardMutation = useUpdateCustomerIdCard(id);
  const updateProfilePictureMutation = useUpdateCustomerProfile(id);

  useEffect(() => {
    if (queryData) {
      console.log(queryData);
      setCustomerData(queryData.data || DEFAULT_CUSTOMER_DATA);
      setCustomerIdCard(queryData.data?.identityCard || DEFAULT_IMAGES.idCard);
      setCustomerProfilePicture(
        queryData.data?.profilePicture || DEFAULT_IMAGES.profilePicture
      );
      reset();
    } else {
      console.log(queryError);
    }
  }, [queryData, queryError]);

  const form = useForm<FormField>({
    mode: "onBlur",
    resolver: zodResolver(partialCustomerSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitHandle = async (data: FormField) => {
    try {
      await updateCustomerMutation.mutateAsync(data);
    } catch (error) {
      console.error("Update customer error:", error);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    uploadMutation: any,
    setImageState: React.Dispatch<React.SetStateAction<string | null>>,
    fileKey: string
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append(fileKey, file);

        await uploadMutation.mutateAsync(formData);

        setImageState(URL.createObjectURL(file));
      } catch (error) {
        console.error(`Error uploading ${fileKey}:`, error);
      }
    }
  };

  return (
    <div className="bg-white h-full w-full flex flex-col md:flex-row">
      <FormProvider {...form}>
        <form
          className="bg-white h-full w-full flex flex-col md:flex-row"
          onSubmit={handleSubmit(onSubmitHandle)}
        >
          <div className="md:w-2/3 pb-10 bg-white min-h-screen">
            <div className="flex flex-row">
              <Image
                src="/images/exit-button.png"
                alt="X-button"
                width={70}
                height={70}
                className="cursor-pointer"
                onClick={() => window.history.back()}
              />
              <p className="font-Averta-Bold text-4xl text-center my-auto ml-[10px]">
                User Info
              </p>
            </div>

            <div className="grid items-center justify-center mt-[75px]">
              <div className="flex flex-col md:flex-row">
                {isPending ? (
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-[21px] w-[5vw]" />
                    <Skeleton className="h-[50px] w-[25vw]" />
                  </div>
                ) : (
                  <CustomerInputWithLabel
                    labelText="FULL NAME"
                    inputType="text"
                    inputPlaceholder="Enter Full Name"
                    inputId="name"
                    inputWidth="25vw"
                    defaultValue={customerData.fullName}
                    keyName="fullName"
                  />
                )}
                <div className="md:ml-2 md:mt-0">
                  {isPending ? (
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-[21px] w-[5vw]" />
                      <Skeleton className="h-[50px] w-[11.25vw]" />
                    </div>
                  ) : (
                    <CustomerInputWithLabel
                      labelText="DATE OF BIRTH"
                      inputType="date"
                      inputPlaceholder=""
                      inputId="date"
                      inputWidth="11.25vw"
                      defaultValue={
                        new Date(customerData.dateOfBirth)
                          .toISOString()
                          .split("T")[0]
                      }
                      keyName="dateOfBirth"
                    />
                  )}
                </div>
                <div className="md:ml-2 md:mt-0">
                  {isPending && (
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-[21px] w-[5vw]" />
                      <Skeleton className="h-[50px] w-[6.875vw]" />
                    </div>
                  )}
                  {
                    <CustomerInputWithLabel
                      className={isPending ? "opacity-0 hidden" : ""}
                      labelText="GENDER"
                      inputType="combobox"
                      inputPlaceholder=""
                      inputId="gender"
                      defaultValue={customerData.gender}
                      inputWidth="6.875vw"
                      options={["Male", "Female", "Other"]}
                      keyName="gender"
                    />
                  }
                </div>
              </div>
              <div className="flex flex-col md:flex-row mt-[30px]">
                {isPending ? (
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-[21px] w-[5vw]" />
                    <Skeleton className="h-[50px] w-[25vw]" />
                  </div>
                ) : (
                  <CustomerInputWithLabel
                    labelText="PHONE NUMBER"
                    inputType="tel"
                    inputPlaceholder="Enter a Phone number"
                    inputId="phoneNum"
                    inputWidth="25vw"
                    defaultValue={customerData.phoneNumber}
                    keyName="phoneNumber"
                  />
                )}
                <div className="md:ml-2 md:mt-0">
                  {isPending ? (
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-[21px] w-[5vw]" />
                      <Skeleton className="h-[50px] w-[18.125vw]" />
                    </div>
                  ) : (
                    <CustomerInputWithLabel
                      labelText="EMAIL ADDRESS"
                      inputType="email"
                      inputPlaceholder="Enter your email address"
                      inputId="contactEmail"
                      inputWidth="18.125vw"
                      plusPX="8px"
                      defaultValue={customerData.email}
                      keyName="email"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row mt-[30px] w-full">
                {isPending ? (
                  <div className="flex flex-col gap-1.5 w-full">
                    <Skeleton className="h-[21px] w-[5vw]" />
                    <Skeleton className="h-[50px] w-[full]" />
                  </div>
                ) : (
                  <CustomerInputWithLabel
                    className="w-full max-w-none"
                    labelText="STREET NAME"
                    inputType="text"
                    inputPlaceholder="Enter your Street Name"
                    inputId="streetName"
                    plusPX="8px"
                    defaultValue={customerData.address}
                    keyName="address"
                  />
                )}
              </div>
              <div className="flex justify-center items-center mt-[3.5vw] pb-[2vw]">
                <Button
                  disabled={updateCustomerMutation.isPending || isPending}
                  type="submit"
                  className="md:w-1/3 h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]"
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
          <div className="md:w-1/3 min-h-screen">
            <p className="font-Averta-Bold text-4xl my-[12.8875px]">Avatar</p>

            <div className="mb-6">
              <Image
                src={customerProfilePicture ?? "/images/camera.svg"}
                alt="camera"
                width={160}
                height={160}
                className=" flex items-center justify-center mx-auto"
              />
              <Button
                variant="link"
                className="flex text-[18px] items-center justify-center mx-auto font-Averta-Semibold text-[#1A78F2]"
              >
                <input
                  onChange={(e) =>
                    handleFileUpload(
                      e,
                      updateProfilePictureMutation,
                      setCustomerProfilePicture,
                      "profilePicture"
                    )
                  }
                  type="file"
                  className="file:border-none file:bg-transparent file:text-blue-500 text-white file:hover:underline file:cursor-pointer w-[111px] overflow-hidden"
                />
              </Button>
            </div>

            <p className="text-3xl font-Averta-Bold mb-4 ml-[2.2vw] mt-[1vw]">
              ID Card
            </p>
            <div className="px-4 py-8 text-center">
              <Image
                src={customerIdCard ?? "/images/identity.png"}
                alt="identity"
                width={400}
                height={200}
              />
            </div>
            <div className="flex flex-row justify-center">
              <Button
                className="w-[170px] h-[40px] 
        bg-[#1A78F2] font-Averta-Semibold text-[16px]"
              >
                Download
              </Button>
              <Button
                className="ml-[10px] w-[170px] h-[40px]
         bg-white font-Averta-Semibold text-[#1A78F2] hover:bg-gray-100
         text-[16px] border-2 border-[#1A78F2]"
                onClick={() => document.getElementById("idCardInput")?.click()}
              >
                Upload
                <input
                  type="file"
                  id="idCardInput"
                  className=" hidden"
                  onChange={(e) =>
                    handleFileUpload(
                      e,
                      updateIdCardMutation,
                      setCustomerIdCard,
                      "idCard"
                    )
                  }
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
