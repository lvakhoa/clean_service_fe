"use client";
import { InputWithLabel } from "@/components/input/inputwithlabel";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import helperAction from "@/apis/helper.action";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import UpdateUserSchema, { UpdateUserDto } from "@/schemas/updateUserSchema";
import UpdateHelperSchema from "@/schemas/updateHelperSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender } from "@/configs/enum";
import FileDownloadCard from "@/components/card/FileDownloadCard";
import { useHelper } from "@/hooks/useHelper";

const genderOptions = Object.values(Gender);

interface ResumeFile {
  fileName: string | null;
  fileSize: string | null;
  fileUrl?: string | null;
}

type FormData = UpdateUserDto & {
  experienceDescription: string;
};

const DEFAULT_IMAGES = {
  idCard: "/images/identity.png",
  profilePicture: "/images/camera.svg",
};

const EmployeeInfo = () => {
  const router = useRouter();

  const [helperData, setHelperData] = useState<Helper | undefined>();
  const [helperIdCard, setHelperIdCard] = useState<string | null>(
    DEFAULT_IMAGES.idCard
  );
  const [helperProfilePicture, setHelperProfilePicture] = useState<
    string | null
  >(DEFAULT_IMAGES.profilePicture);
  const [helperResumeFile, setHelperResumeFile] = useState<ResumeFile>();

  const {
    useGetCurrentHelper,
    useUpdateHelperIdCard,
    useUpdateHelperProfilePicture,
    useUpdateHelperResume,
  } = useHelper();

  const { data, error } = useGetCurrentHelper();

  const updateIdCardMutation = useUpdateHelperIdCard(helperData?.id || "");
  const updateProfilePictureMutation = useUpdateHelperProfilePicture(
    helperData?.id || ""
  );
  const updateResumeMutation = useUpdateHelperResume(helperData?.id || "");

  const combinedSchema = UpdateUserSchema.extend({
    experienceDescription: UpdateHelperSchema.shape.experienceDescription,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: new Date(), // Set default date
      gender: undefined,
      phoneNumber: "",
      address: "",
      experienceDescription: "",
      profilePicture: "",
      identityCard: "",
    },
  });

  useEffect(() => {
    if (data) {
      setHelperIdCard(data.data?.identityCard || DEFAULT_IMAGES.idCard);
      setHelperProfilePicture(
        data.data?.profilePicture || DEFAULT_IMAGES.profilePicture
      );
      setHelperData(data.data);

      const fileNameWithExtension = data.data?.resumeUploaded.split("/").pop();

      setHelperResumeFile({
        fileName: fileNameWithExtension || "CV.docx",
        fileSize: "",
        fileUrl: data.data?.resumeUploaded,
      });
      reset({ gender: data.data?.gender as Gender });
    }
  }, [data, reset]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-CA");
    return formattedDate;
  };

  const onSubmit = async (formData: FormData) => {
    try {
      const { experienceDescription, ...userDto } = formData;
      const helperDto = { experienceDescription };

      await helperAction.updateUserHelper(helperData?.id || "", userDto);
      await helperAction.updateHelper(helperData?.id || "", helperDto);

      toast.success("User updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update user.");
      console.error("Update error:", error);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    uploadMutation: any,
    setFileState: React.Dispatch<React.SetStateAction<string | null>>,
    fileKey: string
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append(fileKey, file);

        await uploadMutation.mutateAsync(formData);

        setFileState(URL.createObjectURL(file));
      } catch (error) {
        console.error(`Error uploading ${fileKey}:`, error);
      }
    }
  };

  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size should be less than 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", file);

      toast.loading("Uploading resume...");

      await updateResumeMutation.mutateAsync(formData);

      const formattedSize =
        file.size < 1024 * 1024
          ? `${(file.size / 1024).toFixed(1)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

      setHelperResumeFile({
        fileName: file.name,
        fileSize: formattedSize,
        fileUrl: URL.createObjectURL(file),
      });

      toast.dismiss();
      toast.success("Resume uploaded successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to upload resume");
      console.error("Error uploading resume:", error);
    }
  };

  if (!helperData) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="bg-white h-full w-full flex flex-col md:flex-row">
      {/* Section-Left */}
      <div className="md:w-2/3 pb-10 bg-white min-h-screen">
        <div className="flex flex-row">
          <Image
            src="/images/exit-button.png"
            alt="X-button"
            width={70}
            height={70}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={() => router.back()}
          />
          <p className="font-Averta-Bold text-4xl text-center my-auto ml-[10px]">
            User Info
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid justify-center mt-[50px]"
        >
          <div className="flex flex-col md:flex-row">
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
                  defaultValue={helperData.fullName}
                  error={errors.fullName?.message}
                  {...field}
                />
              )}
            />
            <div className="md:ml-2 md:mt-0">
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
                    defaultValue={formatDate(helperData.dateOfBirth)}
                    onChange={(e) => onChange(new Date(e.target.value))}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="md:ml-2 md:mt-0">
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
                    onValueChange={(val) => onChange(val as Gender)}
                    defaultValue={value || ""}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-[30px]">
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue={helperData.phoneNumber}
              render={({ field }) => (
                <InputWithLabel
                  labelText="PHONE NUMBER"
                  inputType="text"
                  inputPlaceholder="Enter a Phone number"
                  inputId="phoneNumber"
                  defaultValue={helperData.phoneNumber}
                  inputWidth="25vw"
                  {...field}
                />
              )}
            />
            <div className="md:ml-2 md:mt-0">
              <InputWithLabel
                labelText="EMAIL ADDRESS"
                inputType="email"
                inputPlaceholder="Enter your email address"
                inputId="email"
                inputWidth="18.125vw"
                defaultValue={helperData.email}
              />
            </div>
          </div>

          <div className="flex flex-col gap-8 mt-[30px]">
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
                  defaultValue={helperData.address}
                  error={errors.address?.message}
                  {...field}
                />
              )}
            />
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
                  defaultValue={helperData.experienceDescription}
                  error={errors.experienceDescription?.message}
                  {...field}
                />
              )}
            />
          </div>

          <div className="flex justify-center items-center mt-[4.5vw] pb-[2vw]">
            <Button
              type="submit"
              className="md:w-1/3 h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]"
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
      <div className="md:w-1/3 min-h-screen">
        <p className="font-Averta-Bold text-3xl my-[12.8875px]">Avatar</p>

        <div className="mb-6">
          <Image
            src={helperProfilePicture ?? "/images/camera.svg"}
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
                handleImageUpload(
                  e,
                  updateProfilePictureMutation,
                  setHelperProfilePicture,
                  "profilePicture"
                )
              }
              type="file"
              className="file:border-none file:bg-transparent file:text-blue-500 text-white file:hover:underline file:cursor-pointer w-[111px] overflow-hidden"
            />
          </Button>
        </div>

        <p className="text-3xl font-Averta-Bold mb-3 mt-[1vw]">Identify Card</p>
        <div className="px-4 py-8 text-center">
          <Image
            src={helperIdCard ?? "/images/identity.png"}
            alt="identity"
            width={400}
            height={200}
          />
        </div>
        <div className="flex flex-row justify-center">
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
                handleImageUpload(
                  e,
                  updateIdCardMutation,
                  setHelperIdCard,
                  "idCard"
                )
              }
            />
          </Button>
        </div>

        <p className="text-3xl font-Averta-Bold mb-3 mt-[1vw]">Résumé</p>
        <FileDownloadCard
          fileName={helperResumeFile?.fileName || "CV.docx"}
          fileSize={helperResumeFile?.fileSize || ""}
          onClick={() => document.getElementById("resumeInput")?.click()}
          uri={helperResumeFile?.fileUrl || ""}
        />
        <input
          type="file"
          accept=".doc,.docx,.pdf"
          id="resumeInput"
          className=" hidden"
          onChange={handleResumeUpload}
        />
      </div>
    </div>
  );
};

export default EmployeeInfo;
