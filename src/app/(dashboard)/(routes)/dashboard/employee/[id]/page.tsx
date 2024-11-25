"use client";
import { InputWithLabel } from "@/components/input/inputwithlabel";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import helperAction from "@/apis/helper.action";
import customerAction from "@/apis/customer.action";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender } from "@/configs/enum";
import FileDownloadCard from "@/components/card/FileDownloadCard";
import { useHelper } from "@/hooks/useHelper";
import { formatDate } from "@/helpers/formatDateTime";
import { useCustomer } from "@/hooks/useCustomer";
import { partialAdminHelperSchema } from "@/schemas/helperSchema";
import { partialAdminCustomerSchema } from "@/schemas/customerSchema";
import { z } from "zod";
import { Skeleton } from "@/components/skeleton/skeleton";

const genderOptions = Object.values(Gender);

interface ResumeFile {
  fileName: string | null;
  fileSize: string | null;
  fileUrl?: string | null;
}

const DEFAULT_IMAGES = {
  idCard: "/images/identity.png",
  profilePicture: "/images/camera.svg",
};

const combinedSchema = z.object({
  ...partialAdminCustomerSchema.shape,
  ...partialAdminHelperSchema.shape,
});

type FormField = z.infer<typeof combinedSchema>;

const EmployeeInfo = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [helperIdCard, setHelperIdCard] = useState<string | null>(
    DEFAULT_IMAGES.idCard,
  );
  const [helperProfilePicture, setHelperProfilePicture] = useState<
    string | null
  >(DEFAULT_IMAGES.profilePicture);
  const [helperResumeFile, setHelperResumeFile] = useState<ResumeFile>();

  const { useGetHelperById, useUpdateHelper } = useHelper();
  const { useUpdateUser } = useCustomer();

  const { data: helperData, error, isPending } = useGetHelperById(id);

  const updateUserMutation = useUpdateUser(id);
  const updateHelperMutation = useUpdateHelper(id);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormField>({
    resolver: zodResolver(combinedSchema),
  });

  useEffect(() => {
    if (helperData) {
      setHelperIdCard(helperData.data?.identityCard || DEFAULT_IMAGES.idCard);
      setHelperProfilePicture(
        helperData.data?.profilePicture || DEFAULT_IMAGES.profilePicture,
      );
      const fileNameWithExtension = helperData.data?.resumeUploaded
        .split("/")
        .pop();
      setHelperResumeFile({
        fileName: fileNameWithExtension || "CV.docx",
        fileSize: "",
        fileUrl: helperData.data?.resumeUploaded,
      });

      reset({
        ...helperData.data,
        hourlyRate: helperData.data?.hourlyRate?.toString() || "",
      });
      console.log("helperData", helperData);
    }
  }, [helperData, error, reset]);

  const onSubmit = async (formData: FormField) => {
    try {
      const {
        experienceDescription,
        resumeUploadedFile,
        hourlyRate,
        ...other
      } = formData;

      const helperDto = {
        experienceDescription,
        resumeUploadedFile,
        hourlyRate,
      };
      const userDto = {
        ...other,
      };

      updateUserMutation.mutate(userDto);
      updateHelperMutation.mutate(helperDto);
      toast.success("User updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update user.");
      console.error("Update error:", error);
    }
  };

  const handleResumeChange =
    (onChange: (file: File) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const fileNameWithExtension = file.name;
        const fileSizeInKB = (file.size / 1024).toFixed(2);
        const fileUrl = URL.createObjectURL(file);
        setHelperResumeFile({
          fileName: fileNameWithExtension,
          fileSize: `${fileSizeInKB} KB`,
          fileUrl,
        });
        onChange(file);
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

  // if (!helperData) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="flex h-full w-full flex-col bg-white md:flex-row">
      {/* Section-Left */}
      <div className="min-h-screen bg-white pb-10 md:w-2/3">
        <div className="flex flex-row">
          <Image
            src="/images/exit-button.png"
            alt="X-button"
            width={70}
            height={70}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={() => router.back()}
          />
          <p className="my-auto ml-[10px] text-center font-Averta-Bold text-4xl">
            User Info
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[50px] grid justify-center"
        >
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
                      defaultValue={helperData?.data?.gender as Gender}
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
                      inputId="email"
                      inputWidth="18.125vw"
                      defaultValue={field.value}
                    />
                  )}
                />
              )}
            </div>
          </div>

          <div className="mt-[30px] flex flex-col gap-8">
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
            {isPending ? (
              <div className="flex w-full flex-col gap-1.5">
                <Skeleton className="h-[21px] w-[5vw]" />
                <Skeleton className="h-[50px] w-[full]" />
              </div>
            ) : (
              <Controller
                name="experienceDescription"
                control={control}
                render={({ field }) => (
                  <InputWithLabel
                    labelText="DESCRIPTION"
                    inputType="text"
                    inputPlaceholder="Describe your experience"
                    inputId="experienceDescription"
                    inputWidth="44vw"
                    defaultValue={field.value}
                    error={errors.experienceDescription?.message}
                    {...field}
                  />
                )}
              />
            )}
          </div>

          <div className="mt-[4.5vw] flex items-center justify-center pb-[2vw]">
            <Button
              type="submit"
              className="h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px] md:w-1/3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ClipLoader color="#ffffff" loading={isSubmitting} size={30} />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Section Right */}
      <div className="min-h-screen md:w-1/3">
        <p className="my-[12.8875px] font-Averta-Bold text-3xl">Avatar</p>

        <div className="mb-6 flex flex-col items-center justify-center">
          {isPending ? (
            <ClipLoader color="#000000" loading={isPending} size={100} />
          ) : (
            <Image
              src={helperProfilePicture ?? "/images/camera.svg"}
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
                    setHelperProfilePicture,
                    field.onChange,
                  )}
                />
              )}
            />
          </Button>
        </div>

        <p className="mb-3 mt-[1vw] font-Averta-Bold text-3xl">Identify Card</p>
        <div className="px-4 py-8 text-center">
          {isPending ? (
            <ClipLoader color="#000000" loading={isPending} size={150} />
          ) : (
            <Image
              src={helperIdCard ?? "/images/identity.png"}
              alt="identity"
              width={400}
              height={200}
            />
          )}
        </div>
        <div className="flex flex-row justify-center">
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
                  onChange={handleFileChange(setHelperIdCard, field.onChange)}
                />
              )}
            />
          </Button>
        </div>

        <p className="mb-3 mt-[1vw] font-Averta-Bold text-3xl">Résumé</p>
        {isPending ? (
          <div className="flex w-full flex-col gap-1.5">
            <Skeleton className="h-[50px] w-[full]" />
          </div>
        ) : (
          <>
            <FileDownloadCard
              fileName={helperResumeFile?.fileName || "CV.docx"}
              fileSize={helperResumeFile?.fileSize || ""}
              onClick={() => document.getElementById("resumeInput")?.click()}
              uri={helperResumeFile?.fileUrl || ""}
            />
            <Controller
              name="resumeUploadedFile"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  accept=".doc,.docx,.pdf"
                  id="resumeInput"
                  className="hidden"
                  onChange={handleResumeChange(field.onChange)}
                />
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeInfo;
