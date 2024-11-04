type PaginationProps = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};
