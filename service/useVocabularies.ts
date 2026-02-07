import { vocabulariesDataApi } from "@/api";

import { ECategory, ETopic } from "@/common/types";
import { VocabularyQuery } from "@/common/types/interface-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  category: ECategory;
};

export function useVocabularies({ category }: Props) {
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
  };
}
