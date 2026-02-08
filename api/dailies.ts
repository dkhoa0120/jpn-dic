import {
  CreateDailyRequest,
  DailyQuery,
  DailyResponse,
  ListDailyResponse,
  UpdateDailyRequest,
} from "@/common/types/daily";
import { axiosClient, buildQueryParams } from "@/libs";
import axios from "axios";

export const dailyApi = {
  // Get all dailies
  getDailies: async (filters?: DailyQuery): Promise<ListDailyResponse> => {
    try {
      const params = filters ? buildQueryParams(filters) : "";
      const url = "/dailies";
      const response = await axiosClient.get<ListDailyResponse>(url);
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

  // Get daily by ID
  getDaily: async (id: string): Promise<DailyResponse> => {
    try {
      const response = await axiosClient.get<DailyResponse>(`/dailies/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.message || "Daily not found");
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

  // Create new daily
  createDaily: async (data: CreateDailyRequest): Promise<DailyResponse> => {
    try {
      const response = await axiosClient.post<DailyResponse>("/dailies", data);
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create daily");
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

  // Update daily
  updateDaily: async (
    id: string,
    data: UpdateDailyRequest,
  ): Promise<DailyResponse> => {
    try {
      const response = await axiosClient.put<DailyResponse>(
        `/dailies/${id}`,
        data,
      );
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update daily");
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

  // Delete daily
  deleteDaily: async (
    id: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axiosClient.delete<{
        success: boolean;
        message: string;
      }>(`/dailies/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete daily");
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
