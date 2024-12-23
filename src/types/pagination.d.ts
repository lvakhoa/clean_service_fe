type PaginationProps = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  itemsPerPage?: number;
  onPageChange: (newPage: number) => void;
};

type PaginationResponseWrapper<T = null> = {
  totalItems: number;
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
  totalPages: number;
  results: T[];
};
