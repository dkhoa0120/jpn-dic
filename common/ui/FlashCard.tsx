"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { IVocabulary } from "../types/interface-api";

interface FlashCardProps {
  vocabulary: IVocabulary;
  setTotalScore: Dispatch<SetStateAction<number>>;
  totalScore: number;
}

function FlashCard({ vocabulary, setTotalScore, totalScore }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleFlip = () => {
    if (isAnswered) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleSubmit = () => {
    // Chuẩn hóa đáp án (loại bỏ khoảng trắng thừa, chuyển về chữ thường)
    const correctAnswer = vocabulary.name_vi.toLowerCase().trim();
    const answer1 = userAnswer.toLowerCase().trim();

    // Kiểm tra đáp án
    const correct = answer1 === correctAnswer;

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setTotalScore(totalScore + 1);
    }
  };

  const handleReset = () => {
    setIsFlipped(false);
    setUserAnswer("");
    setIsAnswered(false);
    setIsCorrect(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Flash Card */}
      <div className="relative h-80 perspective-1000" onClick={handleFlip}>
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            pointerEvents: isFlipped ? "none" : "auto",
          }}
        >
          {/* Mặt sau (Back) - Hiển thị khi flip */}
          <div
            className="absolute w-full h-full backface-hidden"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="h-full bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center text-white">
              <div className="text-sm font-semibold mb-4 bg-white/20 px-4 py-2 rounded-full">
                {vocabulary.category}
              </div>
              <h2 className="text-5xl font-bold mb-3 text-center">
                {vocabulary.name_jpn}
              </h2>
              <p className="text-2xl mb-2 text-blue-100">
                {vocabulary.phonetic}
              </p>
              <p className="text-white/80 text-lg mt-4">{vocabulary.name_vi}</p>

              <span
                onClick={handleFlip}
                className="mt-6 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full transition-colors "
              >
                Xem lại
              </span>
            </div>
          </div>

          {/* Mặt trước (Front) */}
          <div className="absolute w-full h-full backface-hidden">
            <div className="h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center text-white">
              <div className="text-sm font-semibold mb-4 bg-white/20 px-4 py-2 rounded-full">
                {vocabulary.topic}
              </div>

              <h2 className="text-5xl font-bold mb-6 text-center">
                {vocabulary.name_jpn}
              </h2>

              <p className="text-blue-100 text-sm mb-4">
                Nghĩa tiếng Việt là gì?
              </p>

              {/* Input fields */}
              <div
                className="w-full max-w-xs space-y-3"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Đáp án"
                  disabled={isAnswered}
                  className={`w-full px-4 py-3 rounded-lg text-gray-800 text-center font-medium focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    isAnswered
                      ? isCorrect
                        ? "bg-green-300"
                        : "bg-red-300"
                      : "bg-white"
                  }`}
                />

                {!isAnswered ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer}
                    className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Kiểm tra
                  </button>
                ) : (
                  <div className="text-center">
                    <p
                      className={`text-lg font-bold mb-2 ${isCorrect ? "text-green-200" : "text-red-200"}`}
                    >
                      {isCorrect ? "✓ Chính xác!" : "✗ Sai rồi"}
                    </p>
                    <p
                      className="text-sm text-blue-100 cursor-pointer"
                      onClick={handleFlip}
                    >
                      {isCorrect
                        ? "Nhấn vào để xem lại"
                        : `Đáp án đúng: ${vocabulary.name_vi}`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Display */}
      <div className="mt-4 text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
        Điểm: {totalScore}
      </div>
    </div>
  );
}

export default FlashCard;
