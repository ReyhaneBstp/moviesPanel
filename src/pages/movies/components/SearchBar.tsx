import { useState, useEffect } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { useDebounce } from "../hooks/useDebounce";
import { useUrlFilters } from "../hooks/useUrlFilters";


export function SearchBar() {
  const {
    filters,
    filters: { search: searchFilter },
    setFilters,
  } = useUrlFilters();
  const [searchInput, setSearchInput] = useState(searchFilter);
  const debounced = useDebounce(searchInput, 400);
  const onChange = (val: string) => setFilters({ ...filters, search: val });

  useEffect(() => {
    if (debounced !== searchFilter) onChange(debounced);
  }, [debounced]);

  useEffect(() => {
    setSearchInput(searchFilter);
  }, [searchFilter]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <HiSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="جستجوی فیلم..."
        className="w-full rounded-2xl border-0 bg-white/70 backdrop-blur-sm py-3 pr-10 pl-10 text-sm
                   shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] outline-none transition-all duration-300
                   focus:bg-white focus:shadow-[0_4px_20px_-5px_rgba(99,102,241,0.3)] focus:ring-2 focus:ring-indigo-200
                   placeholder:text-gray-400"
        dir="rtl"
      />
      {searchInput && (
        <button
          onClick={() => {
            setSearchInput("");
            onChange("");
          }}
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-600"
        >
          <HiX className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
