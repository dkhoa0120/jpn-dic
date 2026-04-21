export enum EVocabulary {
  HIRAGANA = "hrgn",
  KATAKANA = "ktkn",
}

export enum ECategory {
  VocabularyTypeNone = "",
  VocabularyTypeKatakana = "ktkn",
  VocabularyTypeHiragana = "hrgn",
  Noun = "noun",
  Verb = "verb",
  Adjective = "adj",
}

export enum ETopic {
  None = "",
  DailyLife = "daily_life",
  Food = "food",
  Travel = "travel",
  Work = "work",
  School = "school",
  Shopping = "shopping",
  Health = "health",
  Family = "family",
  Weather = "weather",
  Hobby = "hobby",
  Transportation = "transportation",
  Technology = "technology",
  Nature = "nature",
  Culture = "culture",
  Sports = "sports",
  TimeDate = "time",
  Feelings = "feelings",
  Location = "location",
  Other = "other",
}

export const vocabularyOptions = [
  {
    id: EVocabulary.HIRAGANA,
    title: "Hiragana & Kanji",
    description: "Từ vựng mới bằng hiragana và kanji",
  },
  {
    id: EVocabulary.KATAKANA,
    title: "Katakana",
    description: "Từ katakana",
  },
];

export const grammarOptions = [
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

export const TOPIC_LABELS: Record<ETopic, string> = {
  [ETopic.None]: "Tất cả",
  [ETopic.DailyLife]: "Cuộc sống hàng ngày",
  [ETopic.Food]: "Đồ ăn",
  [ETopic.Travel]: "Du lịch",
  [ETopic.Work]: "Công việc",
  [ETopic.School]: "Trường học",
  [ETopic.Shopping]: "Mua sắm",
  [ETopic.Health]: "Sức khỏe",
  [ETopic.Family]: "Gia đình",
  [ETopic.Weather]: "Thời tiết",
  [ETopic.Hobby]: "Sở thích",
  [ETopic.Transportation]: "Giao thông",
  [ETopic.Technology]: "Công nghệ",
  [ETopic.Nature]: "Thiên nhiên",
  [ETopic.Culture]: "Văn hóa",
  [ETopic.Sports]: "Thể thao",
  [ETopic.TimeDate]: "Thời gian",
  [ETopic.Feelings]: "Cảm xúc",
  [ETopic.Location]: "Địa điểm ",
  [ETopic.Other]: "Khác",
};

export const TOPIC_OPTIONS = Object.entries(TOPIC_LABELS).map(
  ([value, label]) => ({
    value: String(value),
    label: String(label),
  }),
);

// Icons for topics (optional)
export const TOPIC_ICONS: Record<ETopic, string> = {
  [ETopic.None]: "🏠",
  [ETopic.DailyLife]: "🌅",
  [ETopic.Food]: "🍜",
  [ETopic.Travel]: "✈️",
  [ETopic.Work]: "💼",
  [ETopic.School]: "🎓",
  [ETopic.Shopping]: "🛍️",
  [ETopic.Health]: "💊",
  [ETopic.Family]: "👨‍👩‍👧‍👦",
  [ETopic.Weather]: "⛅",
  [ETopic.Hobby]: "🎨",
  [ETopic.Transportation]: "🚗",
  [ETopic.Technology]: "💻",
  [ETopic.Nature]: "🌳",
  [ETopic.Culture]: "🎎",
  [ETopic.Sports]: "⚽",
  [ETopic.TimeDate]: "⏰",
  [ETopic.Feelings]: "😊",
  [ETopic.Other]: "📦",
  [ETopic.Location]: "📍",
};

export const displayedTopics: ETopic[] = [
  ETopic.None,
  ETopic.DailyLife,
  ETopic.Food,
  ETopic.Travel,
  ETopic.Work,
  ETopic.School,
  ETopic.Shopping,
  ETopic.Health,
  ETopic.Family,
  ETopic.Weather,
  ETopic.Hobby,
  ETopic.Transportation,
  ETopic.Technology,
  ETopic.Nature,
  ETopic.Culture,
  ETopic.Sports,
  ETopic.TimeDate,
  ETopic.Feelings,
  ETopic.Location,
  ETopic.Other,
];
