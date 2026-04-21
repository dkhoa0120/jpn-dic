"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type TabType =
  | "flashcard"
  | "alphabet"
  | "kanji"
  | "more";

function HomeCtn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("alphabet");

  const tabs = [
    { id: "alphabet", icon: "🔤", label: "Bảng chữ", shortLabel: "Chữ" },
    { id: "flashcard", icon: "🎴", label: "Flashcard", shortLabel: "Flash" },
    { id: "kanji", icon: "✍️", label: "Luyện viết", shortLabel: "Viết" },
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
              className={`flex-1 py-3 px-4 text-center font-semibold transition-colors cursor-pointer whitespace-nowrap ${
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

        {/* Kanji Tab */}
        {activeTab === "kanji" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">
              Luyện viết Kanji
            </h2>
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-xl p-6 sm:p-8 text-center">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">✍️</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3">
                Luyện viết Hán tự
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                Luyện tập viết Kanji trên lưới ô ly tiêu chuẩn
              </p>
              <button
                onClick={() => router.push("/kanji")}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-teal-700 transition-colors w-full sm:w-auto"
              >
                Bắt đầu viết
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeCtn;
