import { axiosClient, buildQueryParams } from "@/libs";
import axios from "axios";

export interface IScore {
  id?: string;
  title: string;
  wrong_word: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ListScoreResponse {
  success: boolean;
  message?: string;
  data: IScore[];
}

export interface SingleScoreResponse {
  success: boolean;
  message: string;
  data: IScore;
}

export const scoresDataApi = {
  getScores: async () => {
    try {
      const response = await axiosClient.get<ListScoreResponse>(`/scores`);

      if (!response.data.success) {
        throw new Error("Unknown error");
      }

      return response.data;
    } catch (error: unknown) {
      let message = "Server error";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ?? error.message ?? "Server error";
      } else if (error instanceof Error) {
        message = error.message;
      }

      throw new Error(message);
    }
  },

  createScore: async (data: { title: string; wrong_word: string[] }) => {
    try {
      const response = await axiosClient.post<SingleScoreResponse>(
        `/scores`,
        data,
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Unknown error");
      }

      return response.data;
    } catch (error: unknown) {
      let message = "Server error";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ?? error.message ?? "Server error";
      } else if (error instanceof Error) {
        message = error.message;
      }

      throw new Error(message);
    }
  },
};
