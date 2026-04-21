import { IVocabulary } from "../types/interface-api";

export const MOCK_VOCABULARIES: IVocabulary[] = [
  // Nouns
  {
    id: "n1",
    name_vi: "Trường học",
    name_jpn: "がっこう",
    phonetic: "Gakkou",
    category: "noun",
    topic: "Địa điểm",
  },
  {
    id: "n2",
    name_vi: "Gia đình",
    name_jpn: "かぞく",
    phonetic: "Kazoku",
    category: "noun",
    topic: "Con người",
  },
  {
    id: "n3",
    name_vi: "Sách",
    name_jpn: "ほん",
    phonetic: "Hon",
    category: "noun",
    topic: "Vật dụng",
  },

  // Verbs - Group 1
  {
    id: "v1_1",
    name_vi: "Đi",
    name_jpn: "いく",
    phonetic: "Iku",
    category: "verb",
    topic: "Hành động",
    sub_category: "group1",
  },
  {
    id: "v1_2",
    name_vi: "Uống",
    name_jpn: "のむ",
    phonetic: "Nomu",
    category: "verb",
    topic: "Hành động",
    sub_category: "group1",
  },
  // Verbs - Group 2
  {
    id: "v2_1",
    name_vi: "Ăn",
    name_jpn: "たべる",
    phonetic: "Taberu",
    category: "verb",
    topic: "Hành động",
    sub_category: "group2",
  },
  {
    id: "v2_2",
    name_vi: "Xem",
    name_jpn: "みる",
    phonetic: "Miru",
    category: "verb",
    topic: "Hành động",
    sub_category: "group2",
  },
  // Verbs - Group 3
  {
    id: "v3_1",
    name_vi: "Làm",
    name_jpn: "する",
    phonetic: "Suru",
    category: "verb",
    topic: "Hành động",
    sub_category: "group3",
  },
  {
    id: "v3_2",
    name_vi: "Đến",
    name_jpn: "くる",
    phonetic: "Kuru",
    category: "verb",
    topic: "Hành động",
    sub_category: "group3",
  },

  // Adjectives - i
  {
    id: "ai_1",
    name_vi: "Nóng",
    name_jpn: "あつい",
    phonetic: "Atsui",
    category: "adj",
    topic: "Mô tả",
    sub_category: "i",
  },
  {
    id: "ai_2",
    name_vi: "Lạnh",
    name_jpn: "さむい",
    phonetic: "Samui",
    category: "adj",
    topic: "Mô tả",
    sub_category: "i",
  },
  // Adjectives - na
  {
    id: "ana_1",
    name_vi: "Đẹp trai/Sạch sẽ",
    name_jpn: "きれい",
    phonetic: "Kirei",
    category: "adj",
    topic: "Mô tả",
    sub_category: "na",
  },
  {
    id: "ana_2",
    name_vi: "Yên tĩnh",
    name_jpn: "しずか",
    phonetic: "Shizuka",
    category: "adj",
    topic: "Mô tả",
    sub_category: "na",
  },
];
