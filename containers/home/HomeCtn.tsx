"use client";

import { EVocabulary, grammarOptions, vocabularyOptions } from "@/common/types";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";

type TabType =
  | "vocabulary"
  | "grammar"
  | "dailies"
  | "flashcard"
  | "alphabet"
  | "more";

function HomeCtn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("vocabulary");
  const [selectedVocabOption, setSelectedVocabOption] = useState<EVocabulary>(
    EVocabulary.HIRAGANA,
  );

  const handleNavigate = (vocal: EVocabulary) => {
    switch (vocal) {
      case EVocabulary.KATAKANA:
        router.push(`/katakana`);
        break;
      case EVocabulary.HIRAGANA:
        router.push(`/hiragana`);
        break;
    }
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    router.push(`/${key}`);
  };

  const advancedItems: MenuProps["items"] = [
    {
      label: "Động từ",
      key: "verb",
    },
    {
      label: "Tính từ",
      key: "adj",
    },
  ];

  const tabs = [
    { id: "vocabulary", icon: "📚", label: "Từ vựng", shortLabel: "Từ vựng" },
    { id: "alphabet", icon: "🔤", label: "Bảng chữ", shortLabel: "Chữ" },
    { id: "grammar", icon: "✏️", label: "Ngữ pháp", shortLabel: "Ngữ pháp" },
    { id: "flashcard", icon: "🎴", label: "Flashcard", shortLabel: "Flash" },
    { id: "dailies", icon: "📝", label: "Nhật ký", shortLabel: "Nhật ký" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-8 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
          Học Tiếng Nhật
        </h1>
        <p className="text-sm sm:text-base text-blue-100">
          Nâng cao kiến thức tiếng Nhật cho Khoa
        </p>
      </div>

      {/* Tabs - Desktop */}
      <div className="hidden md:flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex-1 py-4 px-4 text-center font-semibold transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs - Mobile (Scrollable) */}
      <div className="md:hidden overflow-x-auto border-b border-gray-200 dark:border-gray-700">
        <div className="flex min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-shrink-0 py-3 px-4 text-center font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">{tab.icon}</span>
                <span className="text-xs sm:text-sm">{tab.shortLabel}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-8">
        {/* Vocabulary Tab */}
        {activeTab === "vocabulary" && (
          <div className="w-full relative">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">
              Chọn loại từ vựng bạn muốn học
            </h2>
            <div className="flex w-full justify-between items-center mb-4 sm:mb-6">
              <span />
              <Dropdown menu={{ items: advancedItems, onClick }}>
                <Button size="small" className="sm:size-default">
                  <Space>
                    <span className="hidden sm:inline">Nâng cao</span>
                    <span className="sm:hidden">Menu</span>
                    <SettingOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {vocabularyOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedVocabOption(option.id)}
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left cursor-pointer ${
                    selectedVocabOption === option.id
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 shadow-lg transform scale-105"
                      : "border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:shadow-md dark:hover:border-blue-500"
                  }`}
                >
                  <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100 mb-1 sm:mb-2">
                    {option.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>

            {selectedVocabOption && (
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200">
                  Bạn đã chọn:{" "}
                  <span className="font-bold">
                    {
                      vocabularyOptions.find(
                        (opt) => opt.id === selectedVocabOption,
                      )?.title
                    }
                  </span>
                </p>
                <button
                  className="mt-3 sm:mt-4 px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors cursor-pointer w-full sm:w-auto"
                  onClick={() => handleNavigate(selectedVocabOption)}
                >
                  Bắt đầu học
                </button>
              </div>
            )}
          </div>
        )}

        {/* Alphabet Tab */}
        {activeTab === "alphabet" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">
              Bảng chữ cái tiếng Nhật
            </h2>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              <button
                onClick={() => router.push("/alphabet?type=hiragana")}
                className="p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                  <div className="text-3xl sm:text-4xl">あ</div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100">
                      Hiragana (ひらがな)
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      46 ký tự cơ bản
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Bảng chữ Hiragana dùng cho từ vựng tiếng Nhật gốc
                </p>
              </button>

              <button
                onClick={() => router.push("/alphabet?type=katakana")}
                className="p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                  <div className="text-3xl sm:text-4xl">ア</div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100">
                      Katakana (カタカナ)
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      46 ký tự cơ bản
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Bảng chữ Katakana dùng cho từ ngoại lai
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Grammar Tab */}
        {activeTab === "grammar" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">
              Ngữ pháp tiếng Nhật
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {grammarOptions.map((item) => (
                <div
                  className="p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer"
                  key={item.id}
                >
                  <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100 mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Flashcard Tab */}
        {activeTab === "flashcard" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">
              Flashcard học tập
            </h2>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 sm:p-8 text-center">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🎴</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3">
                Luyện tập với Flashcard
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                Học từ vựng và bảng chữ cái hiệu quả với flashcard 3D
              </p>
              <button
                onClick={() => router.push("/flashcard")}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-purple-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-purple-700 transition-colors w-full sm:w-auto"
              >
                Bắt đầu luyện tập
              </button>
            </div>
          </div>
        )}

        {/* Dailies Tab */}
        {activeTab === "dailies" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">
              Nhật ký học tập
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 sm:p-8 text-center">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">📝</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3">
                Ghi chú hàng ngày
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                Theo dõi tiến trình học tập của bạn
              </p>
              <button
                onClick={() => router.push("/dailies")}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition-colors w-full sm:w-auto"
              >
                Xem nhật ký
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeCtn;
