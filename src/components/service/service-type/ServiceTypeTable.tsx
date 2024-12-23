"use client";

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import SearchBarAndFilter from "./SearchBarAndFilter";
import ServiceTypeRow from "./ServiceTypeRow";
import { UpdateServiceTypePopup } from "@/components/popup/UpdateServiceTypePopup";
import Pagination from "./Pagination";
import useGetAllServiceTypes, {
  useUpdateServiceType,
} from "@/hooks/useServiceType";

const columns = [
  {
    header: "SERVICE TYPE NAME",
    className: "w-[300px] ml-5 hidden md:table-cell",
  },
  { header: "CATEGORY ", className: "w-[276px] hidden md:table-cell" },
  { header: "DESCRIPTION", className: "w-[350px] hidden md:table-cell" },
  { header: "BASE PRICE", className: "w-[276px] hidden md:table-cell" },
];
const ServiceDetailsData: RoomPricing[] = [
  {
    id: "1",
    serviceTypeId: "Number of Bedroom",
    title: "1",
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "2",
    serviceTypeId: "Number of Bedroom",
    title: "1",
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "3",
    serviceTypeId: "Number of Bedroom",
    title: "1",
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "4",
    serviceTypeId: "Number of Bedroom",
    title: "1",
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "5",
    serviceTypeId: "Number of Bedroom",
    title: "1",
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
];

const RoomPricingTable = () => {
  const queryClient = useQueryClient();

  const [selectedRoomPricingId, setSelectedRoomPricingId] = useState<
    string | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, error } = useGetAllServiceTypes();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Category");
  const [initValue, setInitValue] = useState<{
    basePrice: number;
    description: string;
  }>({
    basePrice: 0,
    description: "",
  });
  const applyFilter = (data: ServiceTypeResponse[]) => {
    if (filter === "Base Price ↑") {
      return [...data].sort((a, b) => a.basePrice - b.basePrice);
    }
    if (filter === "Base Price ↓") {
      return [...data].sort((a, b) => b.basePrice - a.basePrice);
    }
    return data;
  };
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };
  const handleRowClick = (id: string) => {
    setSelectedRoomPricingId(id);
    setIsDialogOpen(true);
  };
  const handleInitValues = (value: {
    basePrice: number;
    description: string;
  }) => {
    setInitValue(value);
  };

  const itemsPerPage = 10;

  const filteredData = (data?.results ?? []).filter((type) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Category")
      return type.category.name.toLowerCase().includes(term);
    if (searchBy === "Type") return type.name.toLowerCase().includes(term);
    if (searchBy === "Description")
      return type.description?.toLowerCase().includes(term);
    return true;
  });
  const finalData = applyFilter(filteredData);
  const currentData = finalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(finalData.length / itemsPerPage);

  return (
    <>
      <div className="flex w-full flex-wrap justify-between">
        <SearchBarAndFilter
          setSearchTerm={handleSearch}
          setSearchBy={setSearchBy}
          onFilterChange={setFilter}
        />
      </div>

      {/* title column */}
      <div className="mt-4 hidden h-[48px] w-full items-center gap-3 bg-[#f5f5f5] p-2.5 xl:flex">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} text-left font-Averta-Bold text-sm text-[#202224]`}
          >
            {col.header}
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col justify-center overflow-hidden rounded-lg max-xl:mt-4 max-md:max-w-full">
        {currentData.map((category: ServiceTypeResponse, index: any) => (
          <ServiceTypeRow
            key={category.id}
            {...category}
            onRowClick={handleRowClick}
            setInitValue={handleInitValues}
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

      <UpdateServiceTypePopup
        id={selectedRoomPricingId}
        open={isDialogOpen}
        basePrice={initValue.basePrice}
        description={initValue.description}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default RoomPricingTable;
