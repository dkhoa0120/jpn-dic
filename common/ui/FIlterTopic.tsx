"use client";

import { useState } from "react";
import { displayedTopics, ETopic, TOPIC_ICONS, TOPIC_LABELS } from "../types";

type Props = {
  handleTopicChange: (topic: ETopic) => void;
  isMobile: boolean;
  selectedTopic: ETopic;
};

export default function FIlterTopic({
  handleTopicChange,
  isMobile,
  selectedTopic,
}: Props) {
  const [showAllTopics, setShowAllTopics] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      {displayedTopics.map((topic) => (
        <button
          key={topic}
          onClick={() => handleTopicChange(topic)}
          className={`px-3 md:px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
            selectedTopic === topic
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          <span className="text-lg">{TOPIC_ICONS[topic]}</span>
          <span className="text-sm md:text-base">{TOPIC_LABELS[topic]}</span>
        </button>
      ))}

      {/* Show More/Less button on mobile */}
      {isMobile && displayedTopics.length > 6 && (
        <button
          onClick={() => setShowAllTopics(!showAllTopics)}
          className="px-4 py-2 rounded-lg font-semibold bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
        >
          {showAllTopics
            ? "Thu gọn ▲"
            : `Xem thêm (${displayedTopics.length - 6}) ▼`}
        </button>
      )}
    </div>
  );
}
