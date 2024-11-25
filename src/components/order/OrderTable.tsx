"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import OrderRow from "./OrderRow";
import Pagination from "../pagination/Pagination";
import { useScheduler } from "@/hooks/useScheduler";

const columns = [
  { header: "CUSTOMER", className: "w-[150px] hidden md:table-cell" },
  { header: "HELPER", className: "w-[150px] hidden md:table-cell" },
  { header: "ADDRESS", className: "w-[190px] hidden md:table-cell" },
  { header: "TIME", className: "w-[167px] hidden md:table-cell" },
  { header: "RATING", className: "w-[100px] hidden md:table-cell mr-6" },
  { header: "PRICE", className: "w-[90px] hidden md:table-cell " },
  { header: "STATUS", className: "w-[140px] hidden md:table-cell" },
  { header: "", className: "w-[130px] hidden md:table-cell" },
];

const ordersData: Order[] = [
  {
    id: "00001",
    customerName: "John Doe",
    helperName: "Alice Smith",
    location: "123 Main St",
    scheduledStartTime: new Date("2024-11-10T09:00:00"),
    scheduledEndTime: new Date("2024-11-10T11:00:00"),
    helperRating: 4.5,
    totalPrice: 50,
    status: "Completed",
  },
  {
    id: "00002",
    customerName: "Jane Roe",
    helperName: "Bob Johnson",
    location: "456 Elm St",
    scheduledStartTime: new Date("2024-11-11T14:00:00"),
    scheduledEndTime: new Date("2024-11-11T16:00:00"),
    helperRating: null,
    totalPrice: 45,
    status: "Pending",
  },
  {
    id: "00003",
    customerName: "Michael Lee",
    helperName: "Carol White",
    location: "789 Oak Ave",
    scheduledStartTime: new Date("2024-11-12T08:00:00"),
    scheduledEndTime: new Date("2024-11-12T10:00:00"),
    helperRating: 5.0,
    totalPrice: 60,
    status: "In Progress",
  },
  {
    id: "00004",
    customerName: "Emily Davis",
    helperName: "David Brown",
    location: "101 Maple Rd",
    scheduledStartTime: new Date("2024-11-13T13:00:00"),
    scheduledEndTime: new Date("2024-11-13T15:00:00"),
    helperRating: 3.5,
    totalPrice: 40,
    status: "Cancelled",
  },
  {
    id: "00005",
    customerName: "Chris Wilson",
    helperName: "Eva Green",
    location: "202 Birch Blvd",
    scheduledStartTime: new Date("2024-11-14T10:00:00"),
    scheduledEndTime: new Date("2024-11-14T12:00:00"),
    helperRating: null,
    totalPrice: 55,
    status: "Completed",
  },
  // Tạo thêm 26 mục ở đây
  {
    id: "00006",
    customerName: "Oliver Twist",
    helperName: "Liam Brown",
    location: "303 Cherry Ln",
    scheduledStartTime: new Date("2024-11-15T09:00:00"),
    scheduledEndTime: new Date("2024-11-15T11:00:00"),
    helperRating: 4.0,
    totalPrice: 65,
    status: "Pending",
  },
  {
    id: "00007",
    customerName: "Sophia Turner",
    helperName: "Emma Wilson",
    location: "404 Pine St",
    scheduledStartTime: new Date("2024-11-16T14:00:00"),
    scheduledEndTime: new Date("2024-11-16T16:00:00"),
    helperRating: null,
    totalPrice: 70,
    status: "In Progress",
  },
  {
    id: "00008",
    customerName: "Isabella Martinez",
    helperName: "Noah Smith",
    location: "505 Cedar Blvd",
    scheduledStartTime: new Date("2024-11-17T08:00:00"),
    scheduledEndTime: new Date("2024-11-17T10:00:00"),
    helperRating: 5.0,
    totalPrice: 80,
    status: "Completed",
  },
  {
    id: "00009",
    customerName: "Lucas Garcia",
    helperName: "Mia Johnson",
    location: "606 Walnut St",
    scheduledStartTime: new Date("2024-11-18T13:00:00"),
    scheduledEndTime: new Date("2024-11-18T15:00:00"),
    helperRating: 3.0,
    totalPrice: 50,
    status: "Cancelled",
  },
  {
    id: "00010",
    customerName: "Mason Hall",
    helperName: "Ava Lee",
    location: "707 Birch Blvd",
    scheduledStartTime: new Date("2024-11-19T10:00:00"),
    scheduledEndTime: new Date("2024-11-19T12:00:00"),
    helperRating: null,
    totalPrice: 55,
    status: "Pending",
  },
  {
    id: "00011",
    customerName: "Elijah Scott",
    helperName: "Evelyn Taylor",
    location: "808 Oak St",
    scheduledStartTime: new Date("2024-11-20T09:00:00"),
    scheduledEndTime: new Date("2024-11-20T11:00:00"),
    helperRating: 4.2,
    totalPrice: 75,
    status: "In Progress",
  },
  {
    id: "00012",
    customerName: "Aiden Young",
    helperName: "Harper King",
    location: "909 Maple St",
    scheduledStartTime: new Date("2024-11-21T14:00:00"),
    scheduledEndTime: new Date("2024-11-21T16:00:00"),
    helperRating: 4.8,
    totalPrice: 90,
    status: "Completed",
  },
  {
    id: "00013",
    customerName: "James Hill",
    helperName: "Chloe Lopez",
    location: "111 Spruce Ave",
    scheduledStartTime: new Date("2024-11-22T08:00:00"),
    scheduledEndTime: new Date("2024-11-22T10:00:00"),
    helperRating: null,
    totalPrice: 40,
    status: "Cancelled",
  },
  {
    id: "00014",
    customerName: "Jackson Adams",
    helperName: "Abigail Nelson",
    location: "222 Willow Rd",
    scheduledStartTime: new Date("2024-11-23T13:00:00"),
    scheduledEndTime: new Date("2024-11-23T15:00:00"),
    helperRating: 4.3,
    totalPrice: 85,
    status: "Pending",
  },
  {
    id: "00015",
    customerName: "Liam Murphy",
    helperName: "Emily Wright",
    location: "333 Elm St",
    scheduledStartTime: new Date("2024-11-24T10:00:00"),
    scheduledEndTime: new Date("2024-11-24T12:00:00"),
    helperRating: 4.7,
    totalPrice: 68,
    status: "In Progress",
  },
  {
    id: "00016",
    customerName: "Mia Evans",
    helperName: "Henry White",
    location: "444 Chestnut Blvd",
    scheduledStartTime: new Date("2024-11-25T09:00:00"),
    scheduledEndTime: new Date("2024-11-25T11:00:00"),
    helperRating: null,
    totalPrice: 72,
    status: "Completed",
  },
  {
    id: "00017",
    customerName: "Noah Carter",
    helperName: "Grace Jackson",
    location: "555 Fir St",
    scheduledStartTime: new Date("2024-11-26T14:00:00"),
    scheduledEndTime: new Date("2024-11-26T16:00:00"),
    helperRating: 2.5,
    totalPrice: 55,
    status: "Cancelled",
  },
  {
    id: "00018",
    customerName: "Charlotte Martinez",
    helperName: "Ella Allen",
    location: "666 Hickory Ln",
    scheduledStartTime: new Date("2024-11-27T08:00:00"),
    scheduledEndTime: new Date("2024-11-27T10:00:00"),
    helperRating: 4.9,
    totalPrice: 90,
    status: "In Progress",
  },
  {
    id: "00019",
    customerName: "Amelia King",
    helperName: "Jack Brown",
    location: "777 Poplar St",
    scheduledStartTime: new Date("2024-11-28T13:00:00"),
    scheduledEndTime: new Date("2024-11-28T15:00:00"),
    helperRating: null,
    totalPrice: 65,
    status: "Pending",
  },
  {
    id: "00020",
    customerName: "Lucas Lee",
    helperName: "Isabella Clark",
    location: "888 Ash St",
    scheduledStartTime: new Date("2024-11-29T10:00:00"),
    scheduledEndTime: new Date("2024-11-29T12:00:00"),
    helperRating: 3.6,
    totalPrice: 70,
    status: "Completed",
  },
  {
    id: "00021",
    customerName: "Ella Thomas",
    helperName: "Oliver Green",
    location: "999 Cedar Ln",
    scheduledStartTime: new Date("2024-11-30T14:00:00"),
    scheduledEndTime: new Date("2024-11-30T16:00:00"),
    helperRating: 4.1,
    totalPrice: 50,
    status: "In Progress",
  },
  {
    id: "00022",
    customerName: "Jacob Wright",
    helperName: "Sophia Hall",
    location: "1010 Elm St",
    scheduledStartTime: new Date("2024-12-01T09:00:00"),
    scheduledEndTime: new Date("2024-12-01T11:00:00"),
    helperRating: 3.9,
    totalPrice: 80,
    status: "Pending",
  },
  {
    id: "00023",
    customerName: "Zoe Green",
    helperName: "James Adams",
    location: "1111 Maple Ave",
    scheduledStartTime: new Date("2024-12-02T08:00:00"),
    scheduledEndTime: new Date("2024-12-02T10:00:00"),
    helperRating: null,
    totalPrice: 55,
    status: "Completed",
  },
  {
    id: "00024",
    customerName: "Ben Hall",
    helperName: "Ava Carter",
    location: "1212 Pine St",
    scheduledStartTime: new Date("2024-12-03T10:00:00"),
    scheduledEndTime: new Date("2024-12-03T12:00:00"),
    helperRating: 4.6,
    totalPrice: 90,
    status: "In Progress",
  },
  {
    id: "00025",
    customerName: "Sofia Rivera",
    helperName: "William Taylor",
    location: "1313 Oak Ln",
    scheduledStartTime: new Date("2024-12-04T13:00:00"),
    scheduledEndTime: new Date("2024-12-04T15:00:00"),
    helperRating: 4.8,
    totalPrice: 75,
    status: "Cancelled",
  },
  {
    id: "00026",
    customerName: "Daniel Hill",
    helperName: "Mason Edwards",
    location: "1414 Walnut St",
    scheduledStartTime: new Date("2024-12-05T14:00:00"),
    scheduledEndTime: new Date("2024-12-05T16:00:00"),
    helperRating: null,
    totalPrice: 65,
    status: "Pending",
  },
  {
    id: "00027",
    customerName: "Mia Phillips",
    helperName: "Aiden Brooks",
    location: "1515 Birch Blvd",
    scheduledStartTime: new Date("2024-12-06T09:00:00"),
    scheduledEndTime: new Date("2024-12-06T11:00:00"),
    helperRating: 4.5,
    totalPrice: 85,
    status: "Completed",
  },
  {
    id: "00028",
    customerName: "Logan Perez",
    helperName: "Oliver Young",
    location: "1616 Chestnut Rd",
    scheduledStartTime: new Date("2024-12-07T14:00:00"),
    scheduledEndTime: new Date("2024-12-07T16:00:00"),
    helperRating: 3.8,
    totalPrice: 40,
    status: "In Progress",
  },
  {
    id: "00029",
    customerName: "Ethan Carter",
    helperName: "Ella Smith",
    location: "1717 Ash St",
    scheduledStartTime: new Date("2024-12-08T08:00:00"),
    scheduledEndTime: new Date("2024-12-08T10:00:00"),
    helperRating: null,
    totalPrice: 50,
    status: "Cancelled",
  },
  {
    id: "00030",
    customerName: "Avery Cox",
    helperName: "David King",
    location: "1818 Poplar Ave",
    scheduledStartTime: new Date("2024-12-09T13:00:00"),
    scheduledEndTime: new Date("2024-12-09T15:00:00"),
    helperRating: 4.2,
    totalPrice: 60,
    status: "Pending",
  },
  {
    id: "00031",
    customerName: "Abigail Reed",
    helperName: "Sofia Martinez",
    location: "1919 Elm St",
    scheduledStartTime: new Date("2024-12-10T10:00:00"),
    scheduledEndTime: new Date("2024-12-10T12:00:00"),
    helperRating: 4.9,
    totalPrice: 70,
    status: "Completed",
  },
];

const OrderTable = () => {
  const { queryBookings, queryClient } = useScheduler();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Customer");
  const [orders, setOrders] = useState<Booking[]>([]);

  const { data: bookingResponse, error, isPending } = queryBookings;

  useEffect(() => {
    setOrders(
      Array.isArray(bookingResponse?.data?.results)
        ? (bookingResponse?.data?.results as Booking[])
        : []
    );
    console.log("Data: ", bookingResponse);
  }, [bookingResponse]);

  // Search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = orders.filter((order) => {
    const term = searchTerm.toLowerCase();

    if (searchBy === "Customer")
      return order.customer.fullName.toLowerCase().includes(term);
    if (searchBy === "Helper")
      return order.helper.user.fullName.toLowerCase().includes(term);
    if (searchBy === "Rating")
      return order.helperRating?.toString().includes(term);
    if (searchBy === "Price") return order.totalPrice.toString().includes(term);
    if (searchBy === "Status") return order.status.toLowerCase().includes(term);

    return order.customer.fullName.toLowerCase().includes(term);
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

  if (!orders || !bookingResponse) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <SearchBar setSearchTerm={handleSearch} setSearchBy={setSearchBy} />

      {/* title column */}
      <div className="flex gap-3 w-full bg-[#f5f5f5] h-[48px] items-center mt-4 p-2.5">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} text-left text-[#202224] text-sm font-Averta-Bold`}
          >
            {col.header}
          </div>
        ))}
      </div>

      <div className="flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
        {currentData.map((booking: Booking, index: any) => (
          <OrderRow key={booking.id} booking={booking} />
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

export default OrderTable;
