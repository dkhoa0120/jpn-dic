"use client";

import { ECategory, ETopic, TOPIC_ICONS, TOPIC_LABELS } from "@/common/types";
import FIlterTopic from "@/common/ui/FIlterTopic";
import FlashCard from "@/common/ui/FlashCard";
import SearchBar from "@/common/ui/SearchBar";
import { useVocabularies } from "@/service/useVocabularies";
import { Button, Pagination } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  category: ECategory;
};

export default function FlashCardList({ category }: Props) {
  const { vocabularyList, loading, setQuery, pagination } = useVocabularies({
    category,
  });
  const [isMobile, setIsMobile] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState<ETopic>(ETopic.None);
  const router = useRouter();
  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px = md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({ ...prev, page }));
  };

  const handleTopicChange = (topic: ETopic) => {
    setSelectedTopic(topic);
    setQuery((prev) => ({
      ...prev,
      page: 1,
      topic: topic === ETopic.None ? ETopic.None : topic,
    }));
  };

  const handleSearch = (searchTerm: string) => {
    setQuery((prev) => ({
      ...prev,
      search: searchTerm,
      page: 1,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 flex flex-col">
      {/* Content Area - Flexible height */}
      <div className="flex-1 mb-6 overflow-y-auto">
        <SearchBar handleSearch={handleSearch} />

        <FIlterTopic
          handleTopicChange={handleTopicChange}
          selectedTopic={selectedTopic}
          isMobile={isMobile}
        />

        {!loading && (!vocabularyList || vocabularyList.length === 0) && (
          <div className="h-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Không có từ vựng nào
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="h-full flex flex-col items-center justify-center min-h-[400px] pt-2">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Đang tải từ vựng...
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden pt-3">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">
                        Katakana
                      </th>
                      <th className="px-6 py-4 text-left font-bold">
                        Cách đọc
                      </th>
                      <th className="px-6 py-4 text-left font-bold">Nghĩa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {vocabularyList.map((noun, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {noun.name_jpn}
                        </td>
                        <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">
                          {noun.phonetic}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                          {noun.name_vi}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 pt-4">
              {vocabularyList.map((noun, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {noun.name_jpn}
                      </div>
                      <div className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                        {noun.phonetic}
                      </div>

                      <div className="text-gray-600 dark:text-gray-400">
                        {noun.name_vi}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination - Fixed at bottom */}
      <div className="flex items-center justify-center md:justify-between py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <span />
        <Pagination
          total={pagination?.total}
          current={pagination?.page}
          pageSize={pagination?.size}
          showSizeChanger={false}
          onChange={handlePageChange}
          size={isMobile ? "small" : "large"}
          showLessItems={isMobile}
          responsive
        />
      </div>
    </div>
  );
}
