"use client";

import { InputWithLabel } from "@/components/input/inputwithlabel";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/enum";
import { useQuery, useMutation } from "@tanstack/react-query";
import customerAction from "@/apis/customer.action";
import { Customer } from "@/types/customer";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { partialCustomerSchema } from "@/schemas/customer";

const sampleData: Customer = {
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

type FormField = z.infer<typeof partialCustomerSchema>;

const CustomerInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => customerAction.getCustomerById(id ?? ""),
  });

  const mutation = useMutation({
    mutationFn: (data: any) => {
      console.log(data);
      return customerAction.updateCustomer(id, data);
    },
  });

  const [customerData, setCustomerData] = useState<Customer>(sampleData);

  useEffect(() => {
    if (queryData) {
      const customerData: Customer = { ...queryData.data };
      setCustomerData(customerData as Customer);
      reset();
    } else {
      console.log(queryError);
    }
  }, [queryData]);

  useEffect(() => {
    console.log(customerData);
  }, [customerData]);

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
      await mutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
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

            <div className="grid justify-center mt-[50px]">
              <div className="flex flex-col md:flex-row">
                <InputWithLabel
                  labelText="FULL NAME"
                  inputType="text"
                  inputPlaceholder="Enter Full Name"
                  inputId="name"
                  inputWidth="25vw"
                  defaultValue={customerData.fullName}
                  keyName="fullName"
                />
                <div className="md:ml-2 md:mt-0">
                  <InputWithLabel
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
                </div>
                <div className="md:ml-2 md:mt-0">
                  <InputWithLabel
                    labelText="GENDER"
                    inputType="combobox"
                    inputPlaceholder=""
                    inputId="gender"
                    defaultValue={customerData.gender}
                    inputWidth="6.875vw"
                    options={["Male", "Female", "Other"]}
                    keyName="gender"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row mt-[30px]">
                <InputWithLabel
                  labelText="PHONE NUMBER"
                  inputType="tel"
                  inputPlaceholder="Enter a Phone number"
                  inputId="phoneNum"
                  inputWidth="25vw"
                  defaultValue={customerData.phoneNumber}
                  keyName="phoneNumber"
                />
                <div className="md:ml-2 md:mt-0">
                  <InputWithLabel
                    labelText="EMAIL ADDRESS"
                    inputType="email"
                    inputPlaceholder="Enter your email address"
                    inputId="contactEmail"
                    inputWidth="18.125vw"
                    plusPX="8px"
                    defaultValue={customerData.email}
                    keyName="email"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row mt-[30px]">
                <InputWithLabel
                  labelText="CITY/PROVINCE"
                  inputType="text"
                  inputPlaceholder="Enter your city/province"
                  inputId="city"
                  inputWidth="25vw"
                />
              </div>
              <div className="flex flex-col md:flex-row mt-[30px]">
                <InputWithLabel
                  labelText="WARD"
                  inputType="text"
                  inputPlaceholder="Enter ward"
                  inputId="ward"
                  inputWidth="27.5vw"
                />
                <div className="md:ml-2 md:mt-0">
                  <InputWithLabel
                    labelText="POSTAL CODE"
                    inputType="text"
                    inputPlaceholder="Enter Postal Code"
                    inputId="postal"
                    inputWidth="15.625vw"
                    plusPX="8px"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row mt-[30px]">
                <InputWithLabel
                  labelText="HOUSE NUMBER"
                  inputType="text"
                  inputPlaceholder="Enter your House Number"
                  inputId="houseNum"
                  inputWidth="18.75vw"
                />
                <div className="md:ml-2 md:mt-0">
                  <InputWithLabel
                    labelText="STREET NAME"
                    inputType="text"
                    inputPlaceholder="Enter your Street Name"
                    inputId="streetName"
                    inputWidth="24.375vw"
                    plusPX="8px"
                    defaultValue={customerData.address}
                    keyName="address"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center mt-[4.5vw] pb-[2vw]">
                <Button
                  type="submit"
                  className="md:w-1/3 h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
          {/* Section Right */}
          <div className="md:w-1/3 min-h-screen">
            <p className="font-Averta-Bold text-4xl my-[12.8875px]">Avatar</p>

            <div className="mb-6">
              <Image
                src="/images/camera.svg"
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
                src="/images/identity.png"
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
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                Upload
                <input type="file" id="fileInput" className=" hidden" />
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CustomerInfo;
