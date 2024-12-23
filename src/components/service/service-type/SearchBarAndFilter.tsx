import React, { useState } from "react";
import FilterDropdown from "./Filter";
import { Button } from "@/components/ui/button";

type SearchBarAndFilterProps = {
  setSearchTerm: (term: string) => void;
  setSearchBy: (field: string) => void;
  onFilterChange: (term: string) => void;
};

const SearchBarAndFilter: React.FC<SearchBarAndFilterProps> = ({
  setSearchTerm,
  setSearchBy,
  onFilterChange,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const [selectedSearchBy, setSelectedSearchBy] = useState("Title");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchByChange = (field: string) => {
    setSelectedSearchBy(field);
    setSearchBy(field);
    setIsDropdownOpen(false);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const searchByOptions = ["Category", "Type", "Description"];

  return (
    <>
      <div className="flex w-full flex-wrap justify-between gap-4 md:w-fit">
        <div className="my-auto flex min-w-[240px] justify-center gap-5">
          <form className="my-auto flex w-[252px] min-w-[240px] items-center text-center text-sm text-neutral-800">
            <div className="my-auto flex w-[252px] min-w-[240px] self-stretch">
              <div className="border-[rgba(0, 0, 0, 0.5)] relative flex h-[38px] w-[147px] items-center rounded-l-lg border border-solid bg-white px-4">
                <img
                  loading="lazy"
                  src="/images/Dashboard/Employee/search.svg"
                  alt="icon-search"
                  className="aspect-square object-contain"
                />
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search"
                  className="h-full w-full bg-transparent px-2 font-Averta-Regular text-sm text-[#202224] opacity-50 focus:outline-none"
                  onChange={handleSearchChange}
                />
              </div>

              {/* search by */}
              <div className="relative" onMouseLeave={closeDropdown}>
                <div
                  className="flex h-[38px] w-[105px] cursor-pointer items-center justify-center rounded-r-lg border border-solid border-[#d5d5d5] bg-[#eceaea] font-Averta-Regular text-sm text-[#202224] opacity-50"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  {selectedSearchBy}
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                    <ul className="py-1 font-Averta-Regular text-sm text-[#2b3034e6]">
                      {searchByOptions.map((option, index) => (
                        <li
                          key={index}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleSearchByChange(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </form>

          <FilterDropdown onFilterChange={onFilterChange} />
        </div>
      </div>
    </>
  );
};

export default SearchBarAndFilter;
