import { useState } from "react";
type FilterDropdownProps = {
  onFilterChange: (filter: string) => void;
};
const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
  const options = [
    "Duration Hours ↑",
    "Duration Hours ↓",
    "Price Multiplier ↑",
    "Price Multiplier ↓",
    "None",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Filter by");
  const openDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onFilterChange(option);
    closeDropdown();
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };
  return (
    <div className="relative w-[150px]" onMouseLeave={closeDropdown}>
      <div
        className="flex h-[38px] w-full cursor-pointer items-center justify-between gap-4 rounded-lg border border-solid border-[#d5d5d5] bg-[#fcfdfd] px-4 font-Averta-Bold text-xs text-[#2b3034e6]"
        onClick={openDropdown}
      >
        {selectedOption}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.85892 2.26811L5 6.29356L1.14108 2.26811C0.836791 1.91808 0.532503 1.91078 0.228216 2.24624C-0.076072 2.58169 -0.076072 2.90985 0.228216 3.23072L4.54357 7.78123C4.65422 7.92708 4.80636 8 5 8C5.19364 8 5.34578 7.92708 5.45643 7.78123L9.77178 3.23072C10.0761 2.90985 10.0761 2.58169 9.77178 2.24624C9.4675 1.91078 9.16321 1.91808 8.85892 2.26811Z"
            fill="#2B3034"
            fillOpacity="0.9"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
          <ul className="py-1 font-Averta-Regular text-sm text-[#2b3034e6]">
            {options.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default FilterDropdown;
