import { useEffect, useMemo, useState } from "react";

interface UsePaginationOptions {
  itemsPerPage: number;
  initialPage?: number;
}

const usePagination = <T,>(
  items: T[],
  { itemsPerPage, initialPage = 1 }: UsePaginationOptions
) => {
  const [page, setPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, itemsPerPage, page]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const goToFirstPage = () => {
    setPage(1);
  };

  return {
    page,
    totalPages,
    paginatedItems,
    setPage,
    handlePageChange,
    goToFirstPage,
  };
};

export default usePagination;
