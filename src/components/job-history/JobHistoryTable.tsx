"use client";
import React, { use, useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchBar from "./SearhBar";
import JobHistoryRow from "./JobHistoryRow";
import { useCustomer } from "@/hooks/useCustomer";
import { useGetBookingOfCurrentCustomer } from "@/hooks/useBooking";

const columns = [
  { header: "CUSTOMER", className: "w-[200px] hidden md:table-cell" },
  { header: "ADDRESS", className: "w-[230px] hidden md:table-cell" },
  { header: "TIME", className: "w-[190px] hidden md:table-cell" },
  { header: "RATING", className: "w-[100px] hidden md:table-cell mr-10" },
  { header: "PRICE", className: "w-[100px] hidden md:table-cell " },
  { header: "STATUS", className: "w-[140px] hidden md:table-cell" },
  { header: "", className: "w-[130px] hidden md:table-cell" },
];

const JobHistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Customer");

  const { data, isPending } = useGetBookingOfCurrentCustomer(currentPage, 10);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData =
    data && data.data
      ? data.data.results.filter((order) => {
          const term = searchTerm.toLowerCase();
          if (searchBy === "Customer")
            return order.customer.fullName.toLowerCase().includes(term);
          if (searchBy === "Rating")
            return order.helperRating?.toString().includes(term);
          if (searchBy === "Price")
            return order.totalPrice.toString().includes(term);
          if (searchBy === "Status")
            return order.status.toLowerCase().includes(term);
          return order.customer.fullName.toLowerCase().includes(term);
        })
      : [];

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (data?.data?.totalPages ?? 0))
      setCurrentPage(newPage);
  };

  return (
    <>
      <SearchBar setSearchTerm={handleSearch} setSearchBy={setSearchBy} />
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
        {isPending
          ? Array.from({ length: 5 }).map((_, index) => (
              <JobHistoryRow
                key={index}
                job={{} as Booking}
                isPending={isPending}
              />
            ))
          : filteredData.map((job: Booking, index: number) => (
              <JobHistoryRow job={job} key={index} isPending={isPending} />
            ))}
      </div>
      <Pagination
        currentPage={data?.data?.currentPage ?? 0}
        totalItems={data?.data?.totalItems ?? 0}
        totalPages={data?.data?.totalPages ?? 0}
        onPageChange={handlePageChange}
      />
    </>
  );
};
export default JobHistoryTable;
