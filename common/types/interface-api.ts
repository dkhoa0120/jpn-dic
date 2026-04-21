import { ECategory, ETopic } from "./constant";

export interface IVocabulary {
  id: string;
  name_vi: string;
  name_jpn: string;
  phonetic: string;
  category: string;
  topic: string;
  sub_category?: string; // e.g., 'group1', 'group2', 'group3' for verbs, 'i', 'na' for adjectives
}

export interface VocabularyQuery {
  page: number;
  size: number;
  category: ECategory;
  topic: ETopic;
  search: string;
  sub_category?: string;
}

export interface IPagination {
  page: number;
  size: number;
  total: number;
}

export interface ListVocabularyListResponse {
  success: boolean;
  data: {
    items: IVocabulary[];
    pagination: IPagination;
  };
}
