"use client";

import { useVocabularies } from "@/service/useVocabularies";
import { useState } from "react";
import { Button, Card, Space, Progress, Tag, Spin, Empty } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  ReloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import FlashCard from "@/common/ui/FlashCard";

export default function FlashcardCtn() {
  const { vocabulariesRandomData, loading } = useVocabularies({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

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

  if (!vocabulariesRandomData || vocabulariesRandomData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="text-center p-8">
          <Empty
            description="Không có flashcard nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Vui lòng thêm từ vựng để bắt đầu học
            </p>
          </Empty>
        </Card>
      </div>
    );
  }

  const currentCard = vocabulariesRandomData[currentIndex];
  const progress = ((currentIndex + 1) / vocabulariesRandomData.length) * 100;

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
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold m-0">🎴 Flashcard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Học từ vựng qua flashcard
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
        </Card>

        {/* Flashcard */}
        <div className="mb-6">
          <FlashCard
            vocabulary={currentCard}
            key={currentCard.id}
            setTotalScore={setTotalScore}
            totalScore={totalScore}
          />
        </div>

        {/* Controls */}
        <Card>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            {/* Progress */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Tiến độ</span>
                <span>
                  {currentIndex + 1} / {vocabulariesRandomData.length}
                </span>
              </div>
              <Progress percent={Math.round(progress)} strokeColor="#1677ff" />
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <div className="flex-1 flex items-center justify-center">
                <Tag color="green" className="text-lg px-6 py-2">
                  Thẻ {currentIndex + 1}
                </Tag>
              </div>

              <Button
                size="large"
                icon={<RightOutlined />}
                onClick={handleNext}
                disabled={currentIndex === vocabulariesRandomData.length - 1}
                className="flex-1"
              >
                <span className="hidden sm:inline">Tiếp</span>
              </Button>
            </div>

            {/* Info */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              💡 Mẹo: Nhập đáp án tiếng Việt rồi nhấn Kiểm tra
            </div>
          </Space>
        </Card>

        {/* Completion Message */}
        {currentIndex === vocabulariesRandomData.length - 1 && (
          <Card className="mt-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <div className="text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                Hoàn thành!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Bạn đã học hết {vocabulariesRandomData.length} flashcard
              </p>
              <div className="space-x-2">
                <Button
                  size="large"
                  icon={<ReloadOutlined />}
                  onClick={handleReset}
                >
                  Học lại từ đầu
                </Button>

                <Button
                  type="primary"
                  size="large"
                  icon={<SaveOutlined />}
                  onClick={handleReset}
                >
                  Lưu điểm
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
