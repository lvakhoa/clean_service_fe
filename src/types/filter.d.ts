type FilterDropdownProps = {
  onFilterChange: (filter: string) => void;
};

type SearchBarAndFilterProps = {
  setSearchTerm: (term: string) => void;
  setSearchBy: (field: string) => void;
  onFilterChange: (term: string) => void;
};
