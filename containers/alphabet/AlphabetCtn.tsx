/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import kanaData from "./kana-data.json";
import { useSearchParams } from "next/navigation";

interface KanaChar {
  romaji: string;
  hiragana: string;
  katakana: string;
}

type Mode = "hiragana" | "katakana";

export default function AlphabetCtn() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as Mode;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>(type);
  const [showRomaji, setShowRomaji] = useState<boolean>(false);
  const [shuffled, setShuffled] = useState<boolean>(false);
  const [cards, setCards] = useState<KanaChar[]>(kanaData as KanaChar[]);

  useEffect(() => {
    if (shuffled) {
      const newCards = [...kanaData].sort(() => Math.random() - 0.5);
      setCards(newCards as KanaChar[]);
      setCurrentIndex(0);
    } else {
      setCards(kanaData as KanaChar[]);
      setCurrentIndex(0);
    }
  }, [shuffled]);

  const currentCard = cards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleFlip();
    } else if (e.key === "ArrowRight") {
      handleNext();
    } else if (e.key === "ArrowLeft") {
      handlePrev();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFlipped, currentIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            日本語の文字
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Japanese Alphabet Flashcards
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMode("hiragana");
                  setIsFlipped(false);
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  mode === "hiragana"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                ひらがな Hiragana
              </button>
              <button
                onClick={() => {
                  setMode("katakana");
                  setIsFlipped(false);
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  mode === "katakana"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                カタカナ Katakana
              </button>
            </div>

            {/* Options */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showRomaji}
                  onChange={(e) => setShowRomaji(e.target.checked)}
                  className="w-5 h-5 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Show Romaji
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shuffled}
                  onChange={(e) => setShuffled(e.target.checked)}
                  className="w-5 h-5 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Shuffle
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-6">
          <div
            onClick={handleFlip}
            className={`relative w-full h-96 cursor-pointer transition-transform duration-500 transform-style-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <div
              className="absolute w-full h-full backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-white">
                <div className="text-9xl font-bold mb-4">
                  {mode === "hiragana"
                    ? currentCard.hiragana
                    : currentCard.katakana}
                </div>
                {showRomaji && (
                  <div className="text-4xl font-medium opacity-80">
                    {currentCard.romaji}
                  </div>
                )}
                <div className="absolute bottom-8 text-sm opacity-60">
                  Click or press Space to flip
                </div>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute w-full h-full backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-white">
                <div className="text-6xl font-bold mb-6">
                  {currentCard.romaji.toUpperCase()}
                </div>
                <div className="text-9xl font-bold mb-4">
                  {mode === "hiragana"
                    ? currentCard.katakana
                    : currentCard.hiragana}
                </div>
                <div className="text-3xl opacity-80">
                  {mode === "hiragana" ? "カタカナ" : "ひらがな"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <button
            onClick={handlePrev}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            ← Previous
          </button>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {currentIndex + 1} / {cards.length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Use arrow keys to navigate
            </div>
          </div>

          <button
            onClick={handleNext}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            Next →
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / cards.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
