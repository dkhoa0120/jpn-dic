"use client";

import { ECategory, ETopic } from "@/common/types";
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
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-2 mt-4 md:gap-4">
            {vocabularyList.map((item) => (
              <FlashCard key={item.id} vocabulary={item} />
            ))}
          </div>
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
