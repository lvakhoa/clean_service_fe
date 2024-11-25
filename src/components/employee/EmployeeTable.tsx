"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import SearhBarAndFilter from "./SearchBarAndFilter";
import EmployeeRow from "./EmployeeRow";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useHelper } from "@/hooks/useHelper";

const columns = [
  { header: "ID", className: "w-[10%] hidden md:table-cell" },
  { header: "NAME", className: "w-[12%] hidden md:table-cell" },
  { header: "ADDRESS", className: "w-[18%] hidden md:table-cell" },
  { header: "EVALUATE", className: "w-[15%] hidden md:table-cell " },
  { header: "PHONE", className: "w-[11%] hidden md:table-cell" },
  { header: "EMAIL", className: "w-[20%] hidden md:table-cell" },
  { header: "", className: "w-[8%] hidden md:table-cell" },
];

const sample: Helper[] = [
  {
    id: "1",
    experienceDescription:
      "3 years of experience in house cleaning and organizing spaces.",
    resumeUploaded: null,
    servicesOffered: ["House Cleaning", "Organizing"],
    hourlyRate: 20,
    averageRating: 4.8,
    completedJobs: 150,
    cancelledJobs: 3,
    gender: "Female",
    profilePicture: "https://example.com/profiles/helper1.jpg",
    identityCard: "123456789",
    fullName: "Jane Doe",
    dateOfBirth: "1990-05-15",
    address: "123 Main Street, Springfield, USA",
    phoneNumber: "+1234567890",
    email: "jane.doe@example.com",
  },
  {
    id: "2",
    experienceDescription:
      "5 years specializing in gardening and lawn maintenance.",
    resumeUploaded: null,
    servicesOffered: ["Gardening", "Lawn Maintenance"],
    hourlyRate: 25,
    averageRating: 4.6,
    completedJobs: 200,
    cancelledJobs: 5,
    gender: "Male",
    profilePicture: "https://example.com/profiles/helper2.jpg",
    identityCard: "987654321",
    fullName: "John Smith",
    dateOfBirth: "1985-09-10",
    address: "456 Elm Street, Metropolis, USA",
    phoneNumber: "+1239876543",
    email: "john.smith@example.com",
  },
  {
    id: "3",
    experienceDescription:
      "2 years providing babysitting and childcare services.",
    resumeUploaded: null,
    servicesOffered: ["Babysitting", "Childcare"],
    hourlyRate: 18,
    averageRating: 4.9,
    completedJobs: 80,
    cancelledJobs: 2,
    gender: "Female",
    profilePicture: "https://example.com/profiles/helper3.jpg",
    identityCard: "456789123",
    fullName: "Emily Brown",
    dateOfBirth: "1995-12-22",
    address: "789 Pine Avenue, Gotham, USA",
    phoneNumber: "+1236547890",
    email: "emily.brown@example.com",
  },
];

const EmployeeTable = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");
  const [helpersData, setHelpersData] = useState<Helper[]>(sample);

  const { useGetAllHelpers } = useHelper();

  const { data, error } = useGetAllHelpers();

  useEffect(() => {
    if (data && data.data?.results) {
      setHelpersData(data.data.results);
    }
  }, [data]);

  //Filter
  const applyFilter = (data: Helper[]) => {
    switch (filter) {
      case "Best Rating":
        return [...data].sort((a, b) => b.averageRating - a.averageRating);

      case "Worst Rating":
        return [...data].sort((a, b) => a.averageRating - b.averageRating);

      default:
        return data;
    }
  };

  // Search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = (helpersData || []).filter((employee: any) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Id") return employee.id.toLowerCase().includes(term);
    if (searchBy === "Name")
      return employee.fullName.toLowerCase().includes(term);
    if (searchBy === "Address")
      return employee.address.toLowerCase().includes(term);
    if (searchBy === "Phone")
      return employee.phoneNumber.toLowerCase().includes(term);
    if (searchBy === "Email")
      return employee.email?.toLowerCase().includes(term);
    return employee.fullName.toLowerCase().includes(term);
  });

  const finalData = applyFilter(filteredData);

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(finalData.length / itemsPerPage);
  const currentData = finalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  if (!helpersData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SearhBarAndFilter
        setSearchTerm={handleSearch}
        setSearchBy={setSearchBy}
        onFilterChange={setFilter}
      />

      {/* title column */}
      <div className="flex w-full bg-[#f5f5f5] h-[48px] items-center mt-4 gap-3 p-2.5">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} text-left text-[#202224] text-sm font-Averta-Bold`}
          >
            {col.header}
          </div>
        ))}
      </div>

      {/* employee table */}
      <div className="flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
        {finalData.map((Employee: Helper, index: any) => (
          <EmployeeRow key={Employee.id} {...Employee} />
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

export default EmployeeTable;
