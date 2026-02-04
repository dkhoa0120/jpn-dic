"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"vocabulary" | "grammar">(
    "vocabulary",
  );
  const [selectedVocabOption, setSelectedVocabOption] = useState<string | null>(
    "hika",
  );

  const vocabularyOptions = [
    {
      id: "hika",
      title: "Hiragana & Kanji",
      description: "Từ vựng mới bằng hiragana và kanji",
    },
    {
      id: "katakana ",
      title: "Katakana",
      description: "Từ katakana",
    },
  ];

  const grammarOptions = [
    {
      id: "n5",
      title: "Tổng hợp N5",
      description: "Ngữ pháp cơ bản N5",
    },
    {
      id: "n4",
      title: "Tổng hợp N4",
      description: "Ngữ pháp cơ bản N4",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Học Tiếng Nhật</h1>
            <p className="text-blue-100">
              Nâng cao kiến thức tiếng Nhật cho Khoa
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("vocabulary")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors cursor-pointer ${
                activeTab === "vocabulary"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              📚 Từ vựng
            </button>
            <button
              onClick={() => setActiveTab("grammar")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors cursor-pointer ${
                activeTab === "grammar"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              ✏️ Ngữ pháp
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "vocabulary" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  Chọn loại từ vựng bạn muốn học
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {vocabularyOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedVocabOption(option.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        selectedVocabOption === option.id
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 shadow-lg transform scale-105"
                          : "border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:shadow-md dark:hover:border-blue-500"
                      }`}
                    >
                      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>

                {selectedVocabOption && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-200">
                      Bạn đã chọn:{" "}
                      <span className="font-bold">
                        {
                          vocabularyOptions.find(
                            (opt) => opt.id === selectedVocabOption,
                          )?.title
                        }
                      </span>
                    </p>
                    <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Bắt đầu học
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "grammar" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  Ngữ pháp tiếng Nhật
                </h2>
                <div className="space-y-4">
                  {grammarOptions.map((item) => (
                    <div
                      className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer"
                      key={item.id}
                    >
                      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
