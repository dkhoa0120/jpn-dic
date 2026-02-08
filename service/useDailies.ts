/* eslint-disable @typescript-eslint/no-explicit-any */
import { dailyApi } from "@/api/dailies";
import { Daily, DailyQuery } from "@/common/types/daily";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useState } from "react";

type Props = {
  initialQuery?: DailyQuery;
};

export function useDailies({ initialQuery }: Props = {}) {
  const queryClient = useQueryClient();

  // Fetch dailies with React Query
  const { data: dailiesData, isFetching: loading } = useQuery({
    queryKey: ["dailies"],
    queryFn: async () => {
      const res = await dailyApi.getDailies();
      return {
        data: res.data || [],
      };
    },
    placeholderData: (previousData) => previousData,
  });

  const dailies = dailiesData?.data || [];

  // Create daily mutation
  const createMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      fix_content?: string;
      note?: string;
    }) => {
      return await dailyApi.createDaily(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailies"] });
      message.success("Tạo daily thành công!");
    },
    onError: (error: Error) => {
      message.error(error.message || "Lỗi khi tạo daily!");
    },
  });

  // Update daily mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        content: string;
        fix_content?: string;
        note?: string;
        vocabulary_notes?: any[];
      };
    }) => {
      return await dailyApi.updateDaily(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailies"] });
      message.success("Cập nhật daily thành công!");
    },
    onError: (error: Error) => {
      message.error(error.message || "Lỗi khi cập nhật daily!");
    },
  });

  // Delete daily mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await dailyApi.deleteDaily(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailies"] });
      message.success("Xóa daily thành công!");
    },
    onError: (error: Error) => {
      message.error(error.message || "Lỗi khi xóa daily!");
    },
  });

  // Helper functions
  const createDaily = async (data: {
    title: string;
    content: string;
    fix_content?: string;
    note?: string;
  }) => {
    return createMutation.mutateAsync(data);
  };

  const updateDaily = async (
    id: string,
    data: {
      title: string;
      content: string;
      fix_content?: string;
      note?: string;
      vocabulary_notes?: any[];
    },
  ) => {
    return updateMutation.mutateAsync({ id, data });
  };

  const deleteDaily = async (id: string) => {
    return deleteMutation.mutateAsync(id);
  };

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["dailies"] });
  };

  return {
    dailies,

    loading,

    createDaily,
    updateDaily,
    deleteDaily,
    refetch,
    // Expose mutation states if needed
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
