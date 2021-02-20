import { useState } from "react";

export const useSearch = <T>(
  items: T[],
  predicate: (text: string) => (value: T, index: number) => boolean
) => {
  const [search, setSearch] = useState("");

  return {
    search: search,
    setSearch: setSearch,
    result: items.filter(predicate(search)),
  };
};

const getFilterByFloor = (text: string) => <T extends { floor: string }>(
  item: T
) => item.floor.toLowerCase().includes(text.toLowerCase());

const getFilterById = (text: string) => <T extends { id: string | number }>(
  item: T
) => item.id.toString().toLowerCase().includes(text.toLowerCase());

export default useSearch;
export { getFilterByFloor, getFilterById };
