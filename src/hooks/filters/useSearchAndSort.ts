import { useMemo, useState } from "react";

export type SortDirection = "asc" | "desc";

type PrimitiveComparable = string | number | boolean | Date | null | undefined;

export interface SortOption<T> {
  key: string;
  label: string;
  getValue: (item: T) => PrimitiveComparable;
}

interface UseSearchAndSortOptions<T> {
  items: T[];
  searchableText: (item: T) => string;
  sortOptions: SortOption<T>[];
  defaultSortKey?: string;
  defaultSortDirection?: SortDirection;
}

const toComparableValue = (value: PrimitiveComparable): string | number => {
  if (value instanceof Date) return value.getTime();
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") return value.toLowerCase();
  return "";
};

const useSearchAndSort = <T,>({
  items,
  searchableText,
  sortOptions,
  defaultSortKey,
  defaultSortDirection = "asc",
}: UseSearchAndSortOptions<T>) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(defaultSortKey ?? sortOptions[0]?.key ?? "");
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSortDirection);

  const filteredSortedItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filteredItems = normalizedSearch
      ? items.filter((item) => searchableText(item).toLowerCase().includes(normalizedSearch))
      : items;

    const selectedSort = sortOptions.find((option) => option.key === sortKey);
    if (!selectedSort) return filteredItems;

    const direction = sortDirection === "asc" ? 1 : -1;

    return [...filteredItems].sort((a, b) => {
      const aValue = toComparableValue(selectedSort.getValue(a));
      const bValue = toComparableValue(selectedSort.getValue(b));

      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * direction;
      }

      return String(aValue).localeCompare(String(bValue), "es", { sensitivity: "base" }) * direction;
    });
  }, [items, search, searchableText, sortOptions, sortKey, sortDirection]);

  return {
    search,
    setSearch,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    filteredSortedItems,
  };
};

export default useSearchAndSort;
