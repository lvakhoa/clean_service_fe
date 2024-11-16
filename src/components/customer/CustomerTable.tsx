"use client";
import React, { use, useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import SearhBar from "./SearchBar";
import CustomerRow from "./CustomerRow";
import { UserType, Gender } from "@/types/enum";
import { Customer } from "@/types/customer";
import { useCustomer } from "@/hooks/customer/useCustomer";

const columns = [
  { header: "ID", className: "w-[8%] hidden md:table-cell" },
  { header: "NAME", className: "w-[20%] hidden md:table-cell" },
  { header: "ADDRESS", className: "w-[26%] hidden md:table-cell" },
  { header: "PHONE", className: "w-[11%] hidden md:table-cell" },
  { header: "EMAIL", className: "w-[20%] hidden md:table-cell" },
  { header: "", className: "w-[10%] hidden md:table-cell" },
];

const CustomerTable = () => {
  const customersSampleData: Customer[] = [
    {
      id: "00001",
      fullName: "Christine Brooks",
      address: "123 Maple Street Apt. 101",
      phoneNumber: "09123456789",
      email: "christine.brooks@example.com",
      userType: UserType.Customer,
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfBirth: "1990-01-01",
    },
    {
      id: "00002",
      fullName: "Rosie Pearson",
      address: "456 Oak Avenue Suite 202",
      phoneNumber: "09234567890",
      email: "rosie.pearson@example.com",
      userType: UserType.Customer,
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfBirth: "1990-01-01",
    },
    {
      id: "00003",
      fullName: "Michael Johnson",
      address: "789 Pine Lane Apt. 303",
      phoneNumber: "09345678901",
      email: "michael.johnson@example.com",
      userType: UserType.Customer,
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfBirth: "1990-01-01",
    },
    {
      id: "00004",
      fullName: "Samantha Lee",
      address: "159 Cedar Road Suite 404",
      phoneNumber: "09456789012",
      email: "samantha.lee@example.com",
      userType: UserType.Customer,
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfBirth: "1990-01-01",
    },
    {
      id: "00005",
      fullName: "David Smith",
      address: "357 Birch Drive Apt. 505",
      phoneNumber: "09567890123",
      email: "david.smith@example.com",
      userType: UserType.Customer,
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfBirth: "1990-01-01",
    },
    {
      id: "00006",
      fullName: "David Smith",
      address: "357 Birch Drive Apt. 505",
      phoneNumber: "09567890123",
      email: "david.smith@example.com",
      userType: UserType.Customer,
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfBirth: "1990-01-01",
    },
    {
      id: "00007",
      fullName: "David Smith",
      address: "357 Birch Drive Apt. 505",
      phoneNumber: "09567890123",
      email: "david.smith@example.com",
      userType: UserType.Customer,
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfBirth: "1990-01-01",
    },
    {
      id: "00008",
      fullName: "David Smith",
      address: "357 Birch Drive Apt. 505",
      phoneNumber: "09567890123",
      email: "david.smith@example.com",
      userType: UserType.Customer,
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfBirth: "1990-01-01",
    },
    {
      id: "00009",
      fullName: "David Smith",
      address: "357 Birch Drive Apt. 505",
      phoneNumber: "09567890123",
      email: "david.smith@example.com",
      userType: UserType.Customer,
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfBirth: "1990-01-01",
    },
    {
      id: "00010",
      fullName: "David Smith",
      address: "357 Birch Drive Apt. 505",
      phoneNumber: "09567890123",
      email: "david.smith@example.com",
      userType: UserType.Customer,
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfBirth: "1990-01-01",
    },
  ];

  const { getAllCustomers } = useCustomer();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Name");
  const [customersData, setCustomerData] =
    useState<Customer[]>(customersSampleData);

  const { isLoading, data, error } = getAllCustomers;

  useEffect(() => {
    if (data) {
      setCustomerData(data.data.results as Customer[]);
    } else if (error) {
      console.log(error);
    }
  }, [data]);

  // Search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = customersData?.filter((customer) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Id") return customer.id.toLowerCase().includes(term);
    if (searchBy === "Name")
      return customer.fullName.toLowerCase().includes(term);
    // if (searchBy === "Address")
    //   return customer.address.toLowerCase().includes(term);
    // if (searchBy === "Phone")
    //   return customer.phoneNumber.toLowerCase().includes(term);
    if (searchBy === "Email")
      return customer.email?.toLowerCase().includes(term);
    return customer.fullName.toLowerCase().includes(term);
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <>
      <SearhBar setSearchTerm={handleSearch} setSearchBy={setSearchBy} />

      {/* title column */}
      <div className="flex gap-3 w-full bg-[#f5f5f5] h-[48px] items-center mt-4 px-3.5 py-2.5">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} text-left text-[#202224] text-sm font-Averta-Bold`}
          >
            {col.header}
          </div>
        ))}
      </div>

      {/* table */}
      <div className="flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
        {currentData.map((customer: Customer, index: any) => (
          <CustomerRow
            key={customer.id}
            stt={index + 1}
            id={customer.id}
            name={customer.fullName}
            address={customer.address ?? "-"}
            phone={customer.phoneNumber ?? "-"}
            email={customer.email}
            isLoading={isLoading}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CustomerTable;
