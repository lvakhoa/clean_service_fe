'use client'
import { InputWithLabel } from '@/components/input/inputwithlabel'
import { useForm, Controller } from 'react-hook-form'
import Image from "next/image"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import helperAction from '@/apis/helper.action'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import UpdateUserSchema, { UpdateUserDto } from '@/schemas/updateUserSchema'
import UpdateHelperSchema from '@/schemas/updateHelperSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Gender } from '@/configs/enum'
import FileDownloadCard from '@/components/card/FileDownloadCard'

const genderOptions = Object.values(Gender)

interface Props {
    params: {
        id: string
    }
}

type FormData = UpdateUserDto & {
    experienceDescription: string;
}

const EmployeeInfo = ({ params }: Props) => {
    const { id } = params
    const router = useRouter()

    const [helperData, setHelperData] = useState<any>(null)

    const { data, error } = useQuery({
        queryKey: ['getHelpers'],
        queryFn: () => helperAction.getHelpers()
    })

    const combinedSchema = UpdateUserSchema.extend({
        experienceDescription: UpdateHelperSchema.shape.experienceDescription,
    })

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
        }
    })

    useEffect(() => {
        if (data?.[0]) {
            const helper = data[0]
            reset({
                fullName: helper.fullName || "",
                dateOfBirth: helper.dateOfBirth || new Date(),
                gender: helper.gender as Gender || undefined,
                phoneNumber: helper.phoneNumber || "",
                address: helper.address || "",
                experienceDescription: helper.experienceDescription || "",
                profilePicture: helper.profilePicture || "",
                identityCard: helper.identityCard || "",
            })
            setHelperData(helper)
            //console.log("Helper Data: ", helper)
        }
    }, [data, reset])

    const formatDate = (dateString: string | null) => {
        if (!dateString) {
            return ""
        }
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-CA")
        return formattedDate;
    }


    const onSubmit = async (formData: FormData) => {
        try {
            //console.log("FormData: ", formData)
            const { experienceDescription, ...userDto } = formData
            const helperDto = { experienceDescription }

            await helperAction.updateUserHelper(id, userDto)
            await helperAction.updateHelper(id, helperDto)

            toast.success("User updated successfully!")
            router.refresh()
        } catch (error) {
            toast.error("Failed to update user.")
            console.error("Update error:", error)
        }
    }

    if (!helperData) return <div>Loading...</div>
    if (error) return <div>Error fetching data</div>

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
                    <p className="font-Averta-Bold text-4xl text-center my-auto ml-[10px]">User Info</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid justify-center mt-[50px]">
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
                                        defaultValue={value || ''}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* <div className="flex flex-col md:flex-row mt-[30px]">
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <InputWithLabel
                                    labelText="PHONE NUMBER"
                                    inputType="text"
                                    inputPlaceholder="Enter a Phone number"
                                    inputId="phoneNumber"
                                    inputWidth="25vw"
                                    error={errors.phoneNumber?.message}
                                    {...field}
                                />
                            )}
                        />
                    </div> */}
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
                        src="/images/camera.svg"
                        alt="camera"
                        width={160}
                        height={160}
                        className="cursor-pointer flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-110"
                    />
                    <Button variant="link" className="flex text-[18px] items-center justify-center mx-auto font-Averta-Semibold text-[#1A78F2]">Upload Avatar</Button>
                </div>

                <p className="text-3xl font-Averta-Bold mb-3 mt-[1vw]">Identify Card</p>
                <div className="px-3 py-5 text-center">
                    <Image
                        src="/images/identity.png"
                        alt="identity"
                        width={400}
                        height={200} />
                </div>
                <div className="flex flex-row justify-center mb-6">
                    <Button className="w-[170px] h-[40px] 
        bg-[#1A78F2] font-Averta-Semibold text-[16px]">Download</Button>
                    <Button className="ml-[10px] w-[170px] h-[40px]
         bg-white font-Averta-Semibold text-[#1A78F2] hover:bg-gray-100
         text-[16px] border-2 border-[#1A78F2]">Upload IDCard</Button>
                </div>

                <p className="text-3xl font-Averta-Bold mb-3 mt-[1vw]">Résumé</p>
                <FileDownloadCard />
            </div>

        </div>
    )
}

export default EmployeeInfo
