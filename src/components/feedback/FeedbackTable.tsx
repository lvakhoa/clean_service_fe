"use client";

import React, { useEffect, useState } from "react";
import FeedbackRow from "./FeedbackRow";
import Pagination from "./Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import { useFeedback } from "@/hooks/feedback/useFeedback";

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

export default function FeedbackTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");

  const [feedbackData, setFeedbackData] =
    useState<Feedback[]>(feedbackSampleData);

  const { getAllFeedbacks } = useFeedback();

  const { data, error, isPending } = getAllFeedbacks;

  useEffect(() => {
    if (data) {
      setFeedbackData(data.data.results);
    } else {
      console.error(error);
    }
  }, [data]);

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
  const filteredData = feedbackData.filter((Feedback) => {
    switch (searchBy) {
      case "Title":
        return Feedback.title.toLowerCase().includes(searchTerm.toLowerCase());
      case "Date":
        return Feedback.createdAt
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      default:
        return Feedback.createdAt
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
          <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-neutral-700 max-md:max-w-full">
            {currentData.map((feedback: Feedback, index: any) => (
              <FeedbackRow
                key={feedback.id}
                {...feedback}
                isEven={index % 2 === 0}
                sentiment={
                  feedback.helperRating != null && feedback.helperRating > 3
                    ? "Positive"
                    : feedback.helperRating != null && feedback.helperRating < 3
                    ? "Negative"
                    : "Neutral"
                }
                isPending={isPending}
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
