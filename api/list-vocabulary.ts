import { ECategory, ETopic } from "@/common/types";
import {
  ListVocabularyListResponse,
  VocabularyQuery,
  IVocabulary,
} from "@/common/types/interface-api";
import { axiosClient, buildQueryParams } from "@/libs";
import axios from "axios";

export const vocabulariesDataApi = {
  getVocabularies: async (filters: VocabularyQuery) => {
    const params = buildQueryParams(filters);

    try {
      const response = await axiosClient.get<ListVocabularyListResponse>(
        `/vocabularies?${params.toString()}`,
      );

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

  getRandomVocabularies: async () => {
    try {
      const response =
        await axiosClient.get<ListVocabularyListResponse>(
          `/vocabularies/random`,
        );

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

  createVocabulary: async (data: {
    name_vi: string;
    name_jpn: string;
    phonetic: string;
    category: ECategory;
    topic: ETopic;
  }) => {
    try {
      const response = await axiosClient.post<{
        success: boolean;
        message: string;
        data: IVocabulary;
      }>(`/vocabularies`, data);

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

  deleteVocabulary: async (id: string) => {
    try {
      const response = await axiosClient.delete<{
        success: boolean;
        message: string;
      }>(`/vocabularies/${id}`);

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
