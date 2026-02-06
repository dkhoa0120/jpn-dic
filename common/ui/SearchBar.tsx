"use client";

import { Input } from "antd";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  handleSearch: (searchTerm: string) => void;
};

export default function SearchBar({ handleSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const { Search } = Input;

  return (
    <div className="mb-4">
      <div className="relative md:w-2/3">
        <Search
          placeholder="Tìm kiếm theo tiếng Việt, tiếng Nhật ..."
          enterButton="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="large"
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
}
