"use client";

import { VerbData } from "@/api/verb";
import { useMemo, useState } from "react";

interface Props {
  initialData: {
    group1: VerbData[];
    group2: VerbData[];
    group3: VerbData[];
  };
}

type GroupType = "all" | "group1" | "group2" | "group3";

const GROUP_LABELS = {
  all: "Tất cả",
  group1: "Nhóm 1",
  group2: "Nhóm 2",
  group3: "Nhóm 3",
};

const GROUP_DESCRIPTIONS = {
  all: "Hiển thị tất cả động từ",
  group1: "Động từ nhóm 1 - Động từ đuôi う",
  group2: "Động từ nhóm 2 - Động từ đuôi る",
  group3: "Động từ nhóm 3 - Động từ đuôi する",
};

const GROUP_COLORS = {
  all: "from-purple-600 to-pink-600",
  group1: "from-blue-600 to-indigo-600",
  group2: "from-green-600 to-teal-600",
  group3: "from-red-600 to-teal-600",
};

export default function VerbCtn({ initialData }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<GroupType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Combine and filter data
  const displayData = useMemo(() => {
    let data: VerbData[] = [];

    if (selectedGroup === "all") {
      data = [
        ...initialData.group1,
        ...initialData.group2,
        ...initialData.group3,
      ];
    } else {
      data = initialData[selectedGroup];
    }

    // Apply search filter
    if (searchTerm) {
      data = data.filter(
        (verb) =>
          verb.verb.includes(searchTerm) ||
          verb.reading.includes(searchTerm) ||
          verb.meaning.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return data;
  }, [selectedGroup, searchTerm, initialData]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            📚 Động từ tiếng Nhật
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Danh sách động từ phân theo nhóm
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          {/* Search Bar */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              🔍 Tìm kiếm động từ
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm theo động từ, cách đọc hoặc nghĩa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Group Filter Buttons */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              📂 Chọn nhóm động từ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {(Object.keys(GROUP_LABELS) as GroupType[]).map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`p-4 rounded-xl font-semibold transition-all duration-200 text-left ${
                    selectedGroup === group
                      ? `bg-gradient-to-r ${GROUP_COLORS[group]} text-white shadow-lg scale-105`
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <div className="text-lg font-bold mb-1">
                    {GROUP_LABELS[group]}
                  </div>
                  <div
                    className={`text-sm ${
                      selectedGroup === group
                        ? "text-white/90"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {GROUP_DESCRIPTIONS[group]}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      selectedGroup === group
                        ? "text-white/80"
                        : "text-gray-400"
                    }`}
                  >
                    {group === "all"
                      ? `${initialData.group1.length + initialData.group2.length} động từ`
                      : `${initialData[group].length} động từ`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Results Info */}
          {searchTerm && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Tìm thấy{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {displayData.length}
                </span>{" "}
                kết quả
              </p>
            </div>
          )}
        </div>

        {/* Verb Table */}
        {displayData.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              Không tìm thấy động từ nào
            </p>
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Xóa tìm kiếm
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">STT</th>
                      <th className="px-6 py-4 text-left font-bold">Động từ</th>
                      <th className="px-6 py-4 text-left font-bold">
                        Cách đọc
                      </th>
                      <th className="px-6 py-4 text-left font-bold">Nghĩa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {displayData.map((verb, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-medium">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {verb.verb}
                        </td>
                        <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">
                          {verb.reading}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                          {verb.meaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {displayData.map((verb, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {verb.verb}
                      </div>
                      <div className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                        {verb.reading}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {verb.meaning}
                      </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm flex-shrink-0 ml-3">
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
