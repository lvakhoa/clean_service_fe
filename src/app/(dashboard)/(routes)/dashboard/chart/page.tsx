"use client";
import React, { useEffect, useState } from 'react'
import { ChartTable } from '@/components/chart/ChartTable'
import Dropdown from '@/components/chart/DropDown'
import { InfoCard } from '@/components/chart/InfoCard';
import { Chart } from '@/components/chart/Chart';
import Pagination from '@/components/pagination/Pagination';
import { useScheduler } from '@/hooks/useScheduler';
import { useCustomer } from '@/hooks/useCustomer';
import { BookingStatus } from '@/configs/enum';

const chartkData = [
    { titleInfo: "Total User", dataInfo: "40,689", urliconInfo: '/images/Chart/totalUser.svg', changeInfo: "Up from yesterday", percentageChangeInfo: "8.5%", trend: "up" as "up" },
    { titleInfo: "Total Order", dataInfo: "89", urliconInfo: '/images/Chart/totalOrder.svg', changeInfo: "Down from yesterday", percentageChangeInfo: "22.5%", trend: "down" as "down" },
    { titleInfo: "Total Income", dataInfo: "$22,689", urliconInfo: '/images/Chart/totalIncome.svg', changeInfo: "Up from yesterday", percentageChangeInfo: "8.5%", trend: "up" as "up" },
    { titleInfo: "Total Pending", dataInfo: "19", urliconInfo: '/images/Chart/totalPending.svg', changeInfo: "Down from yesterday", percentageChangeInfo: "18.5%", trend: "down" as "down" },
];

const ChartPage = () => {
    const { queryBookings, queryClient } = useScheduler();
    const { data: bookingResponse, error: bookingError, isPending: isBookingPending } = queryBookings;
    useEffect(() => {
        mappingChartData(   Array.isArray(bookingResponse?.data?.results)
            ? (bookingResponse?.data?.results as Booking[])
            : []);
      }, [bookingResponse]);

    const { useGetAllCustomers } = useCustomer()
    const { data: customerResponse, error: customerError, isPending: isCustomerPending } = useGetAllCustomers()
    useEffect(() => {
        if (customerResponse) {
            setUser(
              Array.isArray(customerResponse?.data?.results)
        ? (customerResponse?.data?.results as Customer[])
        : [])
        console.log("customerResponse: ", customerResponse)
        }
    }, [customerResponse])


    const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("None");
  const itemsPerPage = 5;

  const [totalIncome, setTotalIncome] = useState(Array(12).fill(0));
  const [totalPeding, setTotalPending] = useState<number | null>(null);
  const [user, setUser] = useState<Customer[]>([]);
  const [chartTableData, setChartTableData] = useState<
    {
      service_name: string;
      location: string;
      date_time: string;
      service_fee: number;
      status: string;
    }[]
  >([]);
  const [chartCardData, setChartCardData] = useState<
    {
      titleInfo: string;
      dataInfo: string;
      urliconInfo: string;
      percentageChangeInfo: string;
      trend: string;
    }[]
  >([
    {
      titleInfo: "Total Customer",
      dataInfo: "",
      urliconInfo: "/images/Chart/totalUser.svg",
      percentageChangeInfo: "",
      trend: "",
    },
    {
      titleInfo: "Total Order",
      dataInfo: "",
      urliconInfo: "/images/Chart/totalOrder.svg",
      percentageChangeInfo: "",
      trend: "",
    },
    {
      titleInfo: "Total Income",
      dataInfo: "",
      urliconInfo: "/images/Chart/totalIncome.svg",
      percentageChangeInfo: "",
      trend: "",
    },
    {
      titleInfo: "Total Pending",
      dataInfo: "",
      urliconInfo: "/images/Chart/totalPending.svg",
      percentageChangeInfo: "",
      trend: "",
    },
  ]);

  const mappingChartData = (responseDatas: Booking[]) => {
    const chartData = responseDatas.map((data) => {
      const formattedDateTime = new Date(
        data.scheduledStartTime
      ).toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return {
        service_name: data.serviceType.name,
        location: data.location,
        date_time: formattedDateTime,
        service_fee: data.totalPrice,
        status: data.status,
      };
    });
    setChartTableData(chartData);
  };

  const totalPages = Math.ceil(chartTableData.length / itemsPerPage);
  const currentData = [...chartTableData];

  const finalData =
    filter !== "None"
      ? currentData
          .sort((a, b) => {
            if (filter === "Ascending")
              return a.date_time.localeCompare(b.date_time);
            if (filter === "Descending")
              return b.date_time.localeCompare(a.date_time);
            return 0;
          })
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : chartTableData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  useEffect(() => {
    const newTotalIncome = Array(12).fill(0);
  let newTotalPending = 0;

  chartTableData.forEach((data) => {
    if (data.status === BookingStatus.Completed) {
      const month = new Date(data.date_time).getMonth();
      newTotalIncome[month] += Number(data.service_fee);
    }
    if (data.status === BookingStatus.Confirmed) {
      newTotalPending += 1;
    }
  });

  setTotalIncome(newTotalIncome);
  setTotalPending(newTotalPending);
  }, [chartTableData]);

  useEffect(() => {
    const totalUserToday = user.filter((data) => {
      const today = new Date();
      const createdAt = new Date(data.createdAt);
      return today.getDate() === createdAt.getDate();
    }).length;

    const totalUserYesterday = user.filter((data) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const createdAt = new Date(data.createdAt);
      return yesterday.getDate() === createdAt.getDate();
    }).length;

    const totalOrderToday = chartTableData.filter((data) => {
      const today = new Date();
      const date = new Date(data.date_time);
      return today.getDate() === date.getDate();
    }).length;

    const totalOrderYesterday = chartTableData.filter((data) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const date = new Date(data.date_time);
      return yesterday.getDate() === date.getDate();
    }).length;

    const totalIncomeToday = chartTableData.filter((data) => {
      const today = new Date();
      const date = new Date(data.date_time);
      return today.getDate() === date.getDate();
    }).length;

    const totalIncomeYesterday = chartTableData.filter((data) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const date = new Date(data.date_time);
      return yesterday.getDate() === date.getDate();
    }).length;

    const totalPendingToday = chartTableData.filter((data) => {
      const today = new Date();
      const date = new Date(data.date_time);
      return today.getDate() === date.getDate();
    }).length;

    const totalPendingYesterday = chartTableData.filter((data) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const date = new Date(data.date_time);
      return yesterday.getDate() === date.getDate();
    }).length;

    const percentageUserChange = totalUserYesterday !== 0 
    ? ((totalUserToday - totalUserYesterday) / totalUserYesterday) * 100 
    : 0;

const percentageOrderChange = totalOrderYesterday !== 0 
    ? ((totalOrderToday - totalOrderYesterday) / totalOrderYesterday) * 100 
    : 0;

const percentageIncomeChange = totalIncomeYesterday !== 0 
    ? ((totalIncomeToday - totalIncomeYesterday) / totalIncomeYesterday) * 100 
    : 0;

const percentagePendingChange = totalPendingYesterday !== 0 
    ? ((totalPendingToday - totalPendingYesterday) / totalPendingYesterday) * 100 
    : 0;


    const newChartCardData = chartCardData.map((card, index) => {
    switch(index) {
      case 0:
        return {
          ...card,
          dataInfo: user.length.toString(),
          percentageChangeInfo: `${percentageUserChange.toFixed(2)}%`,
          trend: percentageUserChange > 1 ? 'up' : 'down'
        };
      case 1:
        return {
          ...card,
          dataInfo: chartTableData.length.toString(),
          percentageChangeInfo: `${percentageOrderChange.toFixed(2)}%`,
          trend: percentageOrderChange > 1 ? 'up' : 'down'
        };
      case 2:
        return {
          ...card,
          dataInfo: `$${totalIncome.reduce((a, b) => a + b, 0)}`,
          percentageChangeInfo: `${percentageIncomeChange.toFixed(2)}%`,
          trend: percentageIncomeChange > 1 ? 'up' : 'down'
        };
      case 3:
        return {
          ...card,
          dataInfo: (totalPeding ?? 0).toString(),
          percentageChangeInfo: `${percentagePendingChange.toFixed(2)}%`,
          trend: percentagePendingChange > 1 ? 'up' : 'down'
        };
      default:
        return card;
    }
  });

  setChartCardData(prevData => {
    if (JSON.stringify(prevData) !== JSON.stringify(newChartCardData)) {
      return newChartCardData;
    }
    return prevData; 
  });
  }, [user, chartTableData, totalIncome, totalPeding]);


    return (
    <>
      <div className='flex flex-col gap-[30px] h-full w-full'>
      <div className='grid grid-cols-2 sm:flex sm:flex-row justify-between h-fit max-sm:gap-4'>
        {chartCardData.map((chart) => (
          <InfoCard key={chart.titleInfo} {...chart} />
        ))}
      </div>
      <div className='bg-white rounded-xl h-[500px]'>
        <div className='w-[95%] m-auto mt-[30px] flex flex-row justify-between h-[10%]'>
          <div className='text-[#202224] text-2xl font-bold leading-tight text-left'>Total Income Details</div>
        </div>
        <div className='w-[95%] m-auto my-[25px] h-[90%]'>
          <Chart totalIncome={totalIncome}/>
        </div>
      </div>
      <div className='bg-white rounded-xl h'>
        <div className='w-[95%] m-auto mt-[30px] flex flex-row justify-between'>
          <div className='text-[#202224] text-2xl font-bold leading-tight text-left'>Deals Details</div>
          <Dropdown setFilter={setFilter}/>
        </div>
        <ChartTable chartTableData={finalData}/>
      </div>
    </div>
    <Pagination 
      currentPage={currentPage} 
      totalItems={chartTableData.length} 
      totalPages={totalPages} 
      itemsPerPage={itemsPerPage}
      onPageChange={handlePageChange}
    />
    </>
  )
}

export default ChartPage