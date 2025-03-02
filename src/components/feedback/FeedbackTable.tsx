"use client";

import React, { useEffect, useState } from "react";
import FeedbackRow from "./FeedbackRow";
import Pagination from "./Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import { useFeedback } from "@/hooks/useFeedback";
import Image from "next/image";
import { toast } from "react-toastify";
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

const feedbackSampleData: Feedback[] = [
  {
    id: "1",
    bookingId: "1",
    helperRating: 0,
    title: "",
    description: "",
    createdAt: "",
  },
  {
    id: "2",
    bookingId: "2",
    helperRating: 0,
    title: "",
    description: "",
    createdAt: "",
  },
  {
    id: "3",
    bookingId: "2",
    helperRating: 0,
    title: "",
    description: "",
    createdAt: "",
  },
  {
    id: "4",
    bookingId: "2",
    helperRating: 0,
    title: "",
    description: "",
    createdAt: "",
  },
  {
    id: "5",
    bookingId: "2",
    helperRating: 0,
    title: "",
    description: "",
    createdAt: "",
  },
];

export default function FeedbackTable({ role }: { role: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

  const [feedbackData, setFeedbackData] =
    useState<Feedback[]>(feedbackSampleData);

  const itemsPerPage = 10;

  const {
    getAllFeedbacks,
    useDeleteFeedback,
    queryClient,
    getFeedBackOfCurrentUser,
  } = useFeedback(currentPage, itemsPerPage);

  const { data, error, isPending } =
    role == "Admin" ? getAllFeedbacks : getFeedBackOfCurrentUser;

  const mutation = useDeleteFeedback();

  useEffect(() => {
    console.log(data?.data?.results);

    if (data) {
      setFeedbackData(data.data?.results || feedbackSampleData);
    } else {
      console.error(error);
    }
  }, [data, error]);

  const handleCheckboxToggle = (id: string, isChecked: boolean) => {
    setCheckedRows((prevCheckedRows) =>
      isChecked
        ? [...prevCheckedRows, id]
        : prevCheckedRows.filter((rowId) => rowId !== id)
    );
  };
  const handleDeleteFeedback = async () => {
    if (checkedRows.length === 0) {
      toast.error("Please select feedback to delete");
    } else {
      try {
        setDeleting(true);
        await Promise.all(checkedRows.map((id) => mutation.mutateAsync(id)));
        toast.success("Delete feedback successfully!");
        if (role == "Admin") {
          queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
        }
        queryClient.invalidateQueries({ queryKey: ["feedbacks/customer"] });
      } catch (error) {
        toast.error("Failed to delete some feedback");
        console.error(error);
      } finally{
        setDeleting(false);
      }
    }
  };

  // filter
  const applyFilter = (data: Feedback[]) => {
    switch (filter) {
      case "Positive":
        return [...data].sort((a) =>
          a.helperRating != null && a.helperRating > 3
            ? -1
            : a.helperRating != null && a.helperRating < 3
            ? 0
            : 1
        );
      case "Negative":
        return [...data].sort((a) =>
          a.helperRating != null && a.helperRating < 3
            ? -1
            : a.helperRating != null && a.helperRating > 3
            ? 0
            : 1
        );
      case "Neutral":
        return [...data].sort((a) =>
          a.helperRating != null && a.helperRating === 3 ? -1 : 1
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
  const filteredData =
    feedbackData != undefined
      ? feedbackData.filter((Feedback) => {
          switch (searchBy) {
            case "Title":
              return Feedback.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            case "Date":
              return Feedback.createdAt
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            default:
              return Feedback.createdAt
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
          }
        })
      : feedbackSampleData;

  const finalData = applyFilter(filteredData);

  const currentData = finalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && data && newPage <= (data.data?.totalPages ?? 1))
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
                      the feedback.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteFeedback}
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
          <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-neutral-700 max-md:max-w-full">
            {feedbackData == null || feedbackData.length === 0 ? (
              <div className="flex justify-center items-center w-full bg-white">
                {role == "Admin"
                  ? "We have no feedback"
                  : "This customer has no feedback"}
              </div>
            ) : (
              currentData.map((feedback: Feedback, index: any) => (
                <FeedbackRow
                  key={feedback.id}
                  {...feedback}
                  isEven={index % 2 === 0}
                  sentiment={
                    feedback.helperRating != null && feedback.helperRating > 3
                      ? "Positive"
                      : feedback.helperRating != null &&
                        feedback.helperRating < 3
                      ? "Negative"
                      : "Neutral"
                  }
                  isPending={isPending}
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
