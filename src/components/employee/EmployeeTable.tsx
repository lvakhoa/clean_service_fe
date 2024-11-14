'use client';
import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import SearhBarAndFilter from './SearchBarAndFilter';
import EmployeeRow from './EmployeeRow';
import axios from 'axios';

const columns = [
  { header: 'ID', className: 'w-[10%] hidden md:table-cell' },
  { header: 'NAME', className: 'w-[12%] hidden md:table-cell' },
  { header: 'ADDRESS', className: 'w-[18%] hidden md:table-cell' },
  { header: 'EVALUATE', className: 'w-[15%] hidden md:table-cell ' },
  { header: 'PHONE', className: 'w-[11%] hidden md:table-cell' },
  { header: 'EMAIL', className: 'w-[20%] hidden md:table-cell' },
  { header: '', className: 'w-[8%] hidden md:table-cell' },
];

const fetchHelper = async (url: string) => {
  //const url = `http://localhost:26831/api/v1/manage/helpers`;
  const response = await axios.get(url, {
    withCredentials: true,
  });
  return response.data.data.results;
}

const EmployeeTable = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Filter by');
  const [searchBy, setSearchBy] = useState('Name');
  const [helpersData, setHelpersData] = useState<any>(null)

  useEffect(() => {
    const url = 'http://localhost:26831/api/v1/manage/helpers';

    const getHelpersData = async () => {
      try {
        const data = await fetchHelper(url)
        console.log('helperdata', data)
        setHelpersData(data)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    };

    getHelpersData();
  }, []);


  //Filter
  const applyFilter = (data: Employee[]) => {
    switch (filter) {
      case 'Best Rating':
        return [...data].sort((a, b) => b.averageRating - a.averageRating);

      case 'Worst Rating':
        return [...data].sort((a, b) => a.averageRating - b.averageRating);

      default:
        return data;
    }
  }

  // Search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = (helpersData || []).filter((employee: any) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === 'Id') return employee.id.toLowerCase().includes(term);
    if (searchBy === 'Name') return employee.fullName.toLowerCase().includes(term);
    if (searchBy === 'Address')
      return employee.address.toLowerCase().includes(term);
    if (searchBy === 'Phone')
      return employee.phoneNumber.toLowerCase().includes(term);
    if (searchBy === 'Email')
      return employee.email?.toLowerCase().includes(term);
    return employee.fullName.toLowerCase().includes(term);
  });

  const finalData = applyFilter(filteredData);

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(finalData.length / itemsPerPage);
  const currentData = finalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  if (!helpersData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SearhBarAndFilter
        setSearchTerm={handleSearch}
        setSearchBy={setSearchBy}
        onFilterChange={setFilter}
      />

      {/* title column */}
      <div className="flex w-full bg-[#f5f5f5] h-[48px] items-center mt-4 gap-3 p-2.5">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} text-left text-[#202224] text-sm font-Averta-Bold`}
          >
            {col.header}
          </div>
        ))}
      </div>

      {/* employee table */}
      <div className="flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
        {finalData.map((Employee: Employee, index: any) => (
          <EmployeeRow key={Employee.id} {...Employee} />
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

export default EmployeeTable;
