import { ECategory, ETopic } from "./constant";

export interface IVocabulary {
  id: string;
  name_vi: string;
  name_jpn: string;
  phonetic: string;
  category: string;
  topic: string;
}

export interface VocabularyQuery {
  page: number;
  size: number;
  category: ECategory;
  topic: ETopic;
  search: string;
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
