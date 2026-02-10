import { vocabulariesDataApi } from "@/api";
import { ECategory, ETopic } from "@/common/types";
import { VocabularyQuery } from "@/common/types/interface-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { message } from "antd";

type Props = {
  category?: ECategory;
};

export function useVocabularies({ category }: Props) {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState<VocabularyQuery>({
    page: 1,
    size: 18,
    category: category || ECategory.VocabularyTypeNone,
    topic: ETopic.None,
    search: "",
  });

  const { data: vocabulariesData, isFetching: loading } = useQuery({
    queryKey: ["vocabularies", query],
    queryFn: async () => {
      const res = await vocabulariesDataApi.getVocabularies(query);
      return {
        data: res.data.items,
        pagination: res.data.pagination,
      };
    },
    placeholderData: (previousData) => previousData,
  });

  const { data: vocabulariesRandomData, isFetching: loadingRandom } = useQuery({
    queryKey: ["vocabularies-random"],
    queryFn: async () => {
      const res = await vocabulariesDataApi.getRandomVocabularies();
      return res.data.items;
    },
    placeholderData: (previousData) => previousData,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: vocabulariesDataApi.createVocabulary,
    onSuccess: () => {
      message.success("Tạo từ vựng thành công!");
      queryClient.invalidateQueries({ queryKey: ["vocabularies"] });
    },
    onError: (error: Error) => {
      message.error(error.message || "Lỗi khi tạo từ vựng!");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: vocabulariesDataApi.deleteVocabulary,
    onSuccess: () => {
      message.success("Xóa từ vựng thành công!");
      queryClient.invalidateQueries({ queryKey: ["vocabularies"] });
    },
    onError: (error: Error) => {
      message.error(error.message || "Lỗi khi xóa từ vựng!");
    },
  });

  const vocabularyList = vocabulariesData?.data || [];
  const pagination = vocabulariesData?.pagination || {
    page: 1,
    size: 18,
    total: 0,
  };

  return {
    vocabularyList,
    pagination,
    loading,
    setQuery,
    vocabulariesRandomData,
    loadingRandom,
    createVocabulary: createMutation.mutate,
    isCreating: createMutation.isPending,
    deleteVocabulary: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}
