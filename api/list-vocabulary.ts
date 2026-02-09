import {
  ListVocabularyListResponse,
  VocabularyQuery,
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

  createVocabularies: async (filters: VocabularyQuery) => {
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
};
