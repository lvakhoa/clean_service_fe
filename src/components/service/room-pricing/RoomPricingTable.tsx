"use client";

import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import SearchBarAndFilter from "./SearchBarAndFilter";
import RoomPricingRow from "./RoomPricingRow";
import { UpdateRoomPricingPopup } from "@/components/popup/UpdateRoomPricingPopup";
import Pagination from "./Pagination";
import { useGetRoomPricing } from "@/hooks/useRoomPricing";
import { RoomType } from "@/configs/enum";

const columns = [
  {
    header: "SERVICE TYPE NAME",
    className: "w-[300px] ml-5 hidden md:table-cell",
  },
  { header: "ROOM TYPE", className: "w-[350px] hidden md:table-cell" },
  { header: "ROOM COUNT", className: "w-[276px] hidden md:table-cell" },
  { header: "ADDITIONAl PRICE", className: "w-[276px] hidden md:table-cell" },
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
  const [initValue, setInitValue] = useState<{
    roomCount: number;
    additionalPrice: number;
  }>({ roomCount: 0, additionalPrice: 0 });

  const { data, isLoading } = useGetRoomPricing();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Category");

  const applyFilter = (data: RoomPricingResponse[]) => {
    if (filter === "Room Count ↑") {
      return [...data].sort((a, b) => a.roomCount - b.roomCount);
    }
    if (filter === "Room Count ↓") {
      return [...data].sort((a, b) => b.roomCount - a.roomCount);
    }
    if (filter === "Additional Price ↑") {
      return [...data].sort((a, b) => a.additionalPrice - b.additionalPrice);
    }
    if (filter === "Additional Price ↓") {
      return [...data].sort((a, b) => b.additionalPrice - a.additionalPrice);
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
  const handleInitValue = (value: {
    roomCount: number;
    additionalPrice: number;
  }) => {
    setInitValue(value);
  };
  const itemsPerPage = 10;

  const filteredData = (data?.results ?? []).filter((category) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Name")
      return category.serviceTypeName.toLowerCase().includes(term);
    if (searchBy === "Type")
      return category.roomType.toString().toLowerCase().includes(term);
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
        {currentData.map((category: RoomPricingResponse, index: any) => (
          <RoomPricingRow
            key={category.id}
            {...category}
            onRowClick={handleRowClick}
            setInitValue={handleInitValue}
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

      <UpdateRoomPricingPopup
        id={selectedRoomPricingId}
        open={isDialogOpen}
        roomCount={initValue.roomCount}
        additionalPrice={initValue.additionalPrice}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default RoomPricingTable;
