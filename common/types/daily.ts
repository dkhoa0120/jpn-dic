export interface VocabularyNote {
  word: string;
  reading: string;
  meaning: string;
  position: number;
  length: number;
}

export interface Daily {
  id: string;
  title: string;
  content: string;
  fix_content?: string;
  note?: string;
  vocabulary_notes: VocabularyNote[];
  created_at: string;
  updated_at: string;
}

export interface DailyQuery {
  page?: number;
  size?: number;
  search?: string;
}

export interface DailyResponse {
  success: boolean;
  message?: string;
  data: Daily;
}

export interface ListDailyResponse {
  success: boolean;
  message?: string;
  data: Daily[];
}

export interface CreateDailyRequest {
  title: string;
  content: string;
  fix_content?: string;
  note?: string;
  vocabulary_notes?: VocabularyNote[];
}

export interface UpdateDailyRequest {
  title?: string;
  content?: string;
  fix_content?: string;
  note?: string;
  vocabulary_notes?: VocabularyNote[];
}
