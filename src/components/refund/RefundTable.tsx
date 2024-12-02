"use client";

import React, { useEffect, useState } from "react";
import RefundRow from "./RefundRow";
import Pagination from "./Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import { useRefund } from "@/hooks/useRefund";
import { toast } from "react-toastify";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ClipLoader } from "react-spinners";

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

export default function RefundTable({ role }: { role: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

  const [refundData, setRefundData] = useState<Refund[]>(refundSampleData);

  const {
    getAllRefunds,
    deleteRefundMutation,
    getRefundOfCurrentUser,
    queryClient,
  } = useRefund();
  const mutation = deleteRefundMutation;
  const { data, error, isPending } =
    role == "Admin" ? getAllRefunds : getRefundOfCurrentUser;

  useEffect(() => {
    if (data) {
      setRefundData(data.data?.results || refundSampleData);
    } else {
      console.error(error);
    }
  }, [data]);

  useEffect(() => {}, [refundData]);

  const handleCheckboxToggle = (id: string, isChecked: boolean) => {
    setCheckedRows((prevCheckedRows) =>
      isChecked
        ? [...prevCheckedRows, id]
        : prevCheckedRows.filter((rowId) => rowId !== id)
    );
  };

  const handleDeleteRefund = async () => {
    if (checkedRows.length === 0) {
      toast.error("Please select feedback to delete");
    } else {
      try {
        setDeleting(true);
        await Promise.all(checkedRows.map((id) => mutation.mutateAsync(id)));
        toast.success("Delete refund successfully!");
        if (role == "Admin") {
          queryClient.invalidateQueries({ queryKey: ["refunds"] });
        } else {
          queryClient.invalidateQueries({ queryKey: ["refunds/customer"] });
        }
      } catch (error) {
        toast.error("Failed to delete some refund");
        console.error(error);
      } finally {
        setDeleting(false);
      }
    }
  };

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

  const currentData = finalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    console.log("current data:", currentData);
  }, [currentData]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (data?.data?.totalPages ?? 1))
      setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex justify-between">
        <SearchBarAndFilter
          setSearchTerm={setSearchTerm}
          setSearchBy={setSearchBy}
          onFilterChange={setFilter}
        />
        <AlertDialog>
                <AlertDialogTrigger disabled={deleting}>
                  {deleting ? (
                    <ClipLoader color="#ffffff" loading={deleting} size={30} />
                  ) : (
                    <div className="flex flex-row justify-center items-center px-7 h-[38px] bg-[#e11b1a] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose text-center text-white gap-1.5">
                      <Image
            src="/images/Dashboard/Feedback/Trash.svg"
            alt=""
            width={18}
            height={18}
          />
          <p>Delete</p>
                    </div>
                  )}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the refund request.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteRefund}
                      className="bg-[#e01a1a] hover:bg-[#e01a1a] hover:bg-opacity-70"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
      </div>

      <div className="flex flex-col justify-center px-8 py-7 mt-3.5 w-full bg-white rounded max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col w-full rounded max-md:max-w-full">
          <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-white max-md:max-w-full">
            {refundData.length === 0 ? (
              <div className="flex justify-center items-center w-full bg-white">
                {role == "Admin"
                  ? "We have no refund"
                  : "This customer has no refund"}
              </div>
            ) : (
              currentData.map((refund: Refund, index: any) => (
                <RefundRow
                  isPending={isPending}
                  key={refund.id}
                  {...refund}
                  isEven={index % 2 === 0}
                  onCheckboxToggle={handleCheckboxToggle}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={data?.data?.currentPage || 1}
        totalItems={data?.data?.totalItems || 0}
        totalPages={data?.data?.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </>
  );
}
