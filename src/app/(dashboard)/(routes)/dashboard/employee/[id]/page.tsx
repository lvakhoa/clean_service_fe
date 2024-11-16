'use client'
import { InputWithLabel } from '@/components/input/inputwithlabel'
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import FileDownloadCard from '@/components/card/FileDownloadCard';
import { useQuery } from '@tanstack/react-query';
import helperAction from '@/apis/helper.action';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { RingLoader, ClipLoader } from 'react-spinners';
import updateUserSchema, { UpdateUserDto } from '@/schemas/updateUserSchema';
import { Gender } from '@/configs/enum';
import UpdateHelperSchema from '@/schemas/updateHelperSchema';
import { z } from 'zod';

const genderOptions = ["Female", "Male", "Other"]

interface Props {
    params: {
        id: string
    }
}

const EmployeeInfo = ({ params }: Props) => {
    const { id } = params
    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [helperData, setHelperData] = useState<any>(null)
    const [formUser, setFormUser] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        phoneNumber: "",
        email: "",
        address: "",
    })
    const [description, setDescription] = useState({
        experienceDescription: "",
    })


    const { data, error } = useQuery({
        queryKey: ['getHelpers'],
        queryFn: () => helperAction.getHelpers()
    })

    const formatDate = (dateString: string | null) => {
        if (!dateString) {
            return ""
        }
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-CA")
        return formattedDate;
    }

    useEffect(() => {
        if (data) {
            setHelperData(data[0])
            setFormUser({
                fullName: data[0].fullName,
                dateOfBirth: formatDate(data[0].dateOfBirth),
                gender: data[0].gender,
                phoneNumber: data[0].phoneNumber,
                email: data[0].email,
                address: data[0].address,
            })
            setDescription({
                experienceDescription: data[0].experienceDescription,
            })
        }
    }, [data])

    const handleDownload = () => {

    }

    const handleUpdate = () => {

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormUser({
            ...formUser,
            [id]: value,
        })
    }

    const handleSelectChange = (value: string) => {
        setFormUser((prevFormData) => ({
            ...prevFormData,
            gender: value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true)
        try {
            const updateUserDto = updateUserSchema.parse(formUser)
            const updateHelperDto = UpdateHelperSchema.parse(description)

            const updatedData = await helperAction.updateUserHelper(id, updateUserDto)
            const updatedHelper = await helperAction.updateHelper(id, updateHelperDto)

            toast.success("User updated successfully!")
            router.refresh()
        } catch (error) {
            if (error instanceof z.ZodError) {
                toast.error("Validation failed. Please check your input.")
            } else {
                toast.error("Failed to update user.")
            }
        } finally {
            setIsSubmitting(false)
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

                <form onSubmit={handleSubmit} className="grid justify-center mt-[50px]">
                    <div className="flex flex-col md:flex-row">
                        <InputWithLabel
                            labelText="FULL NAME"
                            inputType="text"
                            inputPlaceholder="Enter Full Name"
                            inputId="fullName"
                            inputWidth="25vw"
                            defaultValue={formUser.fullName}
                            onChange={handleChange}
                        />
                        <div className="md:ml-2 md:mt-0">
                            <InputWithLabel
                                labelText="DATE OF BIRTH"
                                inputType="date"
                                inputId="dateOfBirth"
                                inputPlaceholder=''
                                inputWidth="11.25vw"
                                defaultValue={formUser.dateOfBirth}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:ml-2 md:mt-0">
                            <InputWithLabel
                                labelText="GENDER"
                                inputPlaceholder=""
                                inputType="combobox"
                                inputId="gender"
                                inputWidth="6.875vw"
                                options={genderOptions}
                                defaultValue={formUser.gender}
                                onValueChange={handleSelectChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row mt-[30px]">
                        <InputWithLabel
                            labelText="PHONE NUMBER"
                            inputType="text"
                            inputPlaceholder="Enter a Phone number"
                            inputId="phoneNumber"
                            inputWidth="25vw"
                            defaultValue={formUser.phoneNumber}
                            onChange={handleChange}
                        />
                        <div className="md:ml-2 md:mt-0">
                            <InputWithLabel
                                labelText="EMAIL ADDRESS"
                                inputType="email"
                                inputPlaceholder="Enter your email address"
                                inputId="email"
                                inputWidth="18.125vw"
                                defaultValue={formUser.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 mt-[30px]">
                        <InputWithLabel
                            labelText="ADDRESS"
                            inputType="text"
                            inputPlaceholder="Enter your city/province"
                            inputId="address"
                            inputWidth="44vw"
                            defaultValue={formUser.address}
                            onChange={handleChange}
                        />
                        <InputWithLabel
                            labelText="DESCRIPTION"
                            inputType="text"
                            inputPlaceholder="Describe your experience"
                            inputId="experienceDescription"
                            inputWidth="44vw"
                            defaultValue={description.experienceDescription}
                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                                const { id, value } = e.target;
                                setDescription({
                                    ...description,
                                    [id]: value,
                                })
                            }}
                        />
                    </div>

                    <div className="flex justify-center items-center mt-[4.5vw] pb-[2vw]">
                        <Button type="submit" className="md:w-1/3 h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]" disabled={isSubmitting}>
                            {isSubmitting ? (
                                // <RingLoader color="#3498db" size={30} />
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
