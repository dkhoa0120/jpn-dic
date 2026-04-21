"use client";

import { useVocabularies } from "@/service/useVocabularies";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Space,
  Progress,
  Tag,
  Spin,
  Empty,
  Radio,
  Divider,
} from "antd";
import {
  LeftOutlined,
  RightOutlined,
  ReloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import FlashCard from "@/common/ui/FlashCard";
import { ECategory } from "@/common/types";

export default function FlashcardCtn() {
  const { vocabulariesRandomData, loading, setQuery } = useVocabularies({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  useEffect(() => {
    setQuery((prev) => ({
      ...prev,
      category: selectedCategory as ECategory,
      sub_category: selectedSubCategory,
      page: 1,
    }));
    const setFunc = () => {
      setCurrentIndex(0);
      setTotalScore(0);
    };
    setFunc();
  }, [selectedCategory, selectedSubCategory, setQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Spin size="large" />
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Đang tải flashcards...
          </p>
        </div>
      </div>
    );
  }

  const currentCard = vocabulariesRandomData[currentIndex];
  const progress =
    vocabulariesRandomData.length > 0
      ? ((currentIndex + 1) / vocabulariesRandomData.length) * 100
      : 0;

  const handleNext = () => {
    if (currentIndex < vocabulariesRandomData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setTotalScore(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold m-0 flex items-center gap-2">
                <span>🎴</span> Flashcard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Chọn nhóm từ vựng để bắt đầu học tập
              </p>
            </div>
            <Space>
              <Tag color="blue" className="text-lg px-4 py-1">
                {vocabulariesRandomData.length} thẻ
              </Tag>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReset}
                size="large"
              >
                Bắt đầu lại
              </Button>
            </Space>
          </div>

          <Divider className="my-4" />

          {/* Filters */}
          <Space direction="vertical" size="middle" className="w-full">
            <div>
              <div className="text-sm font-semibold mb-2 text-gray-500 uppercase tracking-wider">
                Loại từ
              </div>
              <Radio.Group
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubCategory("");
                }}
                buttonStyle="solid"
                size="large"
              >
                <Radio.Button value="">Tất cả</Radio.Button>
                <Radio.Button value="noun">Danh từ</Radio.Button>
                <Radio.Button value="verb">Động từ</Radio.Button>
                <Radio.Button value="adj">Tính từ</Radio.Button>
              </Radio.Group>
            </div>

            {selectedCategory === "verb" && (
              <div>
                <div className="text-sm font-semibold mb-2 text-gray-500 uppercase tracking-wider">
                  Nhóm Động Từ
                </div>
                <Radio.Group
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  size="middle"
                >
                  <Radio value="">Tất cả nhóm</Radio>
                  <Radio value="group1">Nhóm 1</Radio>
                  <Radio value="group2">Nhóm 2</Radio>
                  <Radio value="group3">Nhóm 3</Radio>
                </Radio.Group>
              </div>
            )}

            {selectedCategory === "adj" && (
              <div>
                <div className="text-sm font-semibold mb-2 text-gray-500 uppercase tracking-wider">
                  Loại Tính Từ
                </div>
                <Radio.Group
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  size="middle"
                >
                  <Radio value="">Tất cả</Radio>
                  <Radio value="i">Tính từ đuôi i</Radio>
                  <Radio value="na">Tính từ đuôi na</Radio>
                </Radio.Group>
              </div>
            )}
          </Space>
        </Card>

        {vocabulariesRandomData.length === 0 ? (
          <Card className="text-center p-12 shadow-sm">
            <Empty
              description="Không tìm thấy từ vựng nào trong nhóm này"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button
                type="primary"
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedSubCategory("");
                }}
              >
                Xem tất cả từ vựng
              </Button>
            </Empty>
          </Card>
        ) : (
          <>
            {/* Flashcard */}
            <div className="mb-6">
              <FlashCard
                vocabulary={currentCard}
                key={`${currentCard.id}-${currentIndex}`} // Force re-render on index change
                setTotalScore={setTotalScore}
                totalScore={totalScore}
              />
            </div>

            {/* Controls */}
            <Card className="shadow-sm">
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="large"
              >
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Tiến độ học tập</span>
                    <span className="font-bold">
                      {currentIndex + 1} / {vocabulariesRandomData.length}
                    </span>
                  </div>
                  <Progress
                    percent={Math.round(progress)}
                    strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <Button
                    size="large"
                    icon={<LeftOutlined />}
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="flex-1 h-12"
                  >
                    Trước
                  </Button>

                  <div className="flex-[0.5] flex items-center justify-center">
                    <Tag color="blue" className="text-lg px-4 py-1 m-0">
                      {currentIndex + 1}
                    </Tag>
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    icon={<RightOutlined />}
                    onClick={handleNext}
                    disabled={
                      currentIndex === vocabulariesRandomData.length - 1
                    }
                    className="flex-1 h-12"
                  >
                    Tiếp theo
                  </Button>
                </div>

                {/* Info */}
                <div className="text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Mẹo: Nhập nghĩa tiếng Việt và nhấn Kiểm tra để xem kết quả
                </div>
              </Space>
            </Card>

            {/* Completion Message */}
            {currentIndex === vocabulariesRandomData.length - 1 &&
              vocabulariesRandomData.length > 0 && (
                <Card className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-md">
                  <div className="text-center py-4">
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                      Tuyệt vời!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Bạn đã hoàn thành việc ôn tập nhóm này.
                    </p>
                    <Space size="middle">
                      <Button
                        size="large"
                        icon={<ReloadOutlined />}
                        onClick={handleReset}
                        className="min-w-[140px]"
                      >
                        Học lại
                      </Button>

                      <Button
                        type="primary"
                        size="large"
                        icon={<SaveOutlined />}
                        className="min-w-[140px]"
                      >
                        Lưu kết quả
                      </Button>
                    </Space>
                  </div>
                </Card>
              )}
          </>
        )}
      </div>
    </div>
  );
}
