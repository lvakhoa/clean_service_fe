"use client";
import React, { use, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Pagination from "./Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import { UpdateDurationPricePopup } from "@/components/popup/UpdateDurationPricePopup";
import DurationPriceRow from "./DurationPriceRow";
import { Button } from "@/components/ui/button";
import { useGetDurationPrice } from "@/hooks/useDurationPrice";
import { init } from "next/dist/compiled/webpack/webpack";

const columns = [
  {
    header: "SERVICE TYPE NAME",
    className: "w-[500px] ml-5 hidden xl:table-cell",
  },
  { header: "DURATION HOURS", className: "w-[552px] hidden xl:table-cell" },
  { header: "PRICE MULTIPLIER", className: "w-[210px] hidden xl:table-cell" },
];

const DurationPriceTable = () => {
  const queryClient = useQueryClient();

  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState<
    string | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initValue, setInitValue] = useState<{
    durationHours: number;
    priceMultiplier: number;
  }>({ durationHours: 0, priceMultiplier: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");

  const { data, isLoading } = useGetDurationPrice();

  const applyFilter = (data: DurationPriceResponse[]) => {
    if (filter === "Duration Hours ↑") {
      return [...data].sort((a, b) => a.durationHours - b.durationHours);
    }
    if (filter === "Duration Hours ↓") {
      return [...data].sort((a, b) => b.durationHours - a.durationHours);
    }
    if (filter === "Price Multiplier ↑") {
      return [...data].sort((a, b) => a.priceMultiplier - b.priceMultiplier);
    }
    if (filter === "Price Multiplier ↓") {
      return [...data].sort((a, b) => b.priceMultiplier - a.priceMultiplier);
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
    setSelectedServiceTypeId(id);
    setIsDialogOpen(true);
  };
  const handleInitValue = (value: {
    durationHours: number;
    priceMultiplier: number;
  }) => {
    setInitValue(value);
  };

  useEffect(() => {}, [initValue]);

  const itemsPerPage = 10;

  const filteredData = (data?.results ?? []).filter((detail) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Name")
      return detail.serviceTypeName.toLowerCase().includes(term);
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
      <div className="mt-4 flex h-[48px] w-full items-center gap-3 bg-[#f5f5f5] p-2.5">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} text-left font-Averta-Bold text-sm text-[#202224]`}
          >
            {col.header}
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col justify-center overflow-hidden max-md:max-w-full">
        {currentData.map((detail: DurationPriceResponse, index: any) => (
          <DurationPriceRow
            key={detail.id}
            {...detail}
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
      <UpdateDurationPricePopup
        durationHours={initValue.durationHours}
        priceMultiplier={initValue.priceMultiplier}
        id={selectedServiceTypeId}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};
export default DurationPriceTable;
