"use client";

import { useState } from "react";
import { IVocabulary } from "../types/interface-api";

interface FlashCardProps {
  vocabulary: IVocabulary;
}

function FlashCard({ vocabulary }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Flash Card */}
      <div
        className="relative h-80 cursor-pointer perspective-1000"
        onClick={handleFlip}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
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
            </div>
          </div>

          <div className="absolute w-full h-full backface-hidden">
            <div className="h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center text-white">
              <div className="text-sm font-semibold mb-2 bg-white/20 px-4 py-2 rounded-full">
                {vocabulary.topic}
              </div>
              <h2 className="text-4xl font-bold mb-4 text-center">
                {vocabulary.name_vi}
              </h2>
              <p className="text-blue-100 text-sm">Nhấn để xem tiếng Nhật</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator (Optional) */}
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"></div>
    </div>
  );
}

export default FlashCard;
