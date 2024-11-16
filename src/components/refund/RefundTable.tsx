"use client";

import React, { useEffect, useState } from "react";
import RefundRow from "./RefundRow";
import Pagination from "./Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import { useRefund } from "@/hooks/refund/useRefund";

const refundSampleData: Refund[] = [
  {
    id: "1",
    helperId: "",
    helperName: "",
    customerId: "",
    customerName: "",
    reason: "",
    status: "",
    createdAt: "",
    resolvedAt: "",
  },
  {
    id: "2",
    helperId: "",
    helperName: "",
    customerId: "",
    customerName: "",
    reason: "",
    status: "",
    createdAt: "",
    resolvedAt: "",
  },

  {
    id: "3",
    helperId: "",
    helperName: "",
    customerId: "",
    customerName: "",
    reason: "",
    status: "",
    createdAt: "",
    resolvedAt: "",
  },

  {
    id: "4",
    helperId: "",
    helperName: "",
    customerId: "",
    customerName: "",
    reason: "",
    status: "",
    createdAt: "",
    resolvedAt: "",
  },

  {
    id: "5",
    helperId: "",
    helperName: "",
    customerId: "",
    customerName: "",
    reason: "",
    status: "",
    createdAt: "",
    resolvedAt: "",
  },
];

export default function RefundTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");

  const [refundData, setRefundData] = useState<Refund[]>(refundSampleData);

  const { getAllRefunds } = useRefund();

  const { data, error, isPending } = getAllRefunds;

  useEffect(() => {
    if (data) {
      setRefundData(data.data.results);
    } else {
      console.error(error);
    }
  }, [data]);

  useEffect(() => {}, [refundData]);

  // filter
  const applyFilter = (data: Refund[]) => {
    switch (filter) {
      case "Refunded":
        return [...data].sort((a) =>
          a.status === "Refunded" ? -1 : a.status === "Pending" ? 0 : 1
        );
      case "Declined":
        return [...data].sort((a) =>
          a.status === "Declined" ? -1 : a.status === "Pending" ? 0 : 1
        );
      case "Pending":
        return [...data].sort((a) =>
          a.status === "Pending" ? -1 : a.status === "Pending" ? 0 : 1
        );
      case "Recent":
        return [...data].sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
        );
      case "Oldest":
        return [...data].sort((a, b) =>
          new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1
        );
      default:
        return data;
    }
  };

  // search by
  const filteredData = refundData.filter((Refund) => {
    switch (searchBy) {
      case "Reason":
        return Refund.reason.toLowerCase().includes(searchTerm.toLowerCase());
      case "Date":
        return Refund.createdAt
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      default:
        return Refund.createdAt
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
    }
  });

  const finalData = applyFilter(filteredData);

  // pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = finalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    console.log("current data:", currentData);
  }, [currentData]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <>
      <SearchBarAndFilter
        setSearchTerm={setSearchTerm}
        setSearchBy={setSearchBy}
        onFilterChange={setFilter}
      />

      <div className="flex flex-col justify-center px-8 py-7 mt-3.5 w-full bg-white rounded max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col w-full rounded max-md:max-w-full">
          <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-white max-md:max-w-full">
            {currentData.map((refund: Refund, index: any) => (
              <RefundRow
                isPending={isPending}
                key={refund.id}
                {...refund}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
