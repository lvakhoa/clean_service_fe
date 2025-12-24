"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import CustomInput from "@/components/input/CustomInput";
import { ClipLoader } from "react-spinners";
import { useAuth } from "@/hooks/useAuth";

interface AddAccountPopupProps {
  toggle: () => void;
}

const AddAccountPopup: React.FC<AddAccountPopupProps> = ({ toggle }) => {
  const { signupAccount, queryClient } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userType, setUserType] = useState<string>("Helper");
  const [creating, setCreating] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      fullName: "",
      phoneNumber: "",
      password: "",
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Full name validation
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const accountData = {
      email,
      fullName,
      phoneNumber,
      password,
      userType,
    };

    setCreating(true);
    try {
      await signupAccount.mutateAsync(accountData);
      toast.success("Account created successfully!");

      // Invalidate queries to refresh employee list
      queryClient.invalidateQueries({ queryKey: ["employees"] });

      // Reset form
      setEmail("");
      setFullName("");
      setPhoneNumber("");
      setPassword("");
      setUserType("Helper");
      toggle();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to create account";
      toast.error(errorMessage);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      onClick={toggle}
    >
      <div
        className="flex h-fit max-h-[95vh] w-[90%] flex-col gap-[20px] overflow-y-auto rounded-lg bg-white px-[30px] py-[30px] shadow-lg scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 md:w-[60%] md:px-[50px] lg:w-[50%]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex h-[10%] w-full">
          <button
            onClick={toggle}
            className="ml-auto rounded-full p-2 transition duration-200 ease-in-out hover:bg-gray-200 hover:shadow-md"
            disabled={creating}
          >
            <Image
              src="/images/ProgressBar/Group.svg"
              alt="exitButton"
              width={20}
              height={20}
            />
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center justify-center">
          <p className="self-start font-Averta-Bold text-[28px] leading-[50px] text-[#1a78f2] md:text-[32px] md:leading-[62px]">
            - Add New Account
          </p>
          <p className="font-Averta-Bold text-[24px] leading-[40px] text-[#170f49] md:text-[32px] md:leading-[62px]">
            Fill the form to create a new account
          </p>
        </div>

        {/* Form */}
        <div className="mx-auto flex w-full flex-col gap-[20px]">
          {/* Email */}
          <CustomInput
            label="Email"
            id="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            error={errors.email}
          />

          {/* Full Name */}
          <CustomInput
            label="Full Name"
            id="fullName"
            type="text"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFullName(e.target.value)
            }
            error={errors.fullName}
          />

          {/* Phone Number */}
          <CustomInput
            label="Phone Number"
            id="phoneNumber"
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
            error={errors.phoneNumber}
          />

          {/* Password */}
          <CustomInput
            label="Password"
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            error={errors.password}
          />

          {/* User Type */}
          <div className="flex w-full flex-col gap-[11px]">
            <label
              className="font-Averta-Semibold text-[14px] text-[#9FA7B0]"
              htmlFor="userType"
            >
              USER TYPE
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="h-[50px] rounded-md border-2 border-[#E5E7EB] px-3 font-Averta-Regular text-[16px] text-[#4F6071] focus:outline-none focus:ring-2 focus:ring-[#1a78f2]"
            >
              <option value="Helper">Helper</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={creating}
            className="mt-4 h-[50px] w-full rounded-md bg-[#1b78f2] font-Averta-Bold text-[16px] text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating ? (
              <div className="flex items-center justify-center gap-2">
                <ClipLoader size={20} color="#ffffff" />
                <span>Creating...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAccountPopup;
