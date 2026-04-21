import { ECategory, ETopic } from "@/common/types";
import { IVocabulary, VocabularyQuery } from "@/common/types/interface-api";
import { useEffect, useMemo, useState } from "react";
import { MOCK_VOCABULARIES } from "@/common/data/vocabularies";

type Props = {
  category?: ECategory;
};

export function useVocabularies({ category }: Props) {
  const [query, setQuery] = useState<VocabularyQuery>({
    page: 1,
    size: 18,
    category: category || ECategory.VocabularyTypeNone,
    topic: ETopic.None,
    search: "",
    sub_category: "",
  });

  // Filter mock data based on query (basic implementation)
  const filteredData = useMemo(() => {
    return MOCK_VOCABULARIES.filter((item) => {
      // Filter by main category if provided
      if (query.category && item.category !== query.category) {
        return false;
      }

      // Filter by sub_category if provided
      if (query.sub_category && item.sub_category !== query.sub_category) {
        return false;
      }

      if (query.search) {
        return (
          item.name_vi.toLowerCase().includes(query.search.toLowerCase()) ||
          item.name_jpn.toLowerCase().includes(query.search.toLowerCase())
        );
      }
      return true;
    });
  }, [query.category, query.sub_category, query.search]);

  const vocabularyList = useMemo(() => {
    return filteredData.slice(
      (query.page - 1) * query.size,
      query.page * query.size,
    );
  }, [filteredData, query.page, query.size]);

  const pagination = {
    page: query.page,
    size: query.size,
    total: filteredData.length,
  };

  const [vocabulariesRandomData, setVocabulariesRandomData] = useState<
    IVocabulary[]
  >([]);

  useEffect(() => {
    // Shuffling when filtered data changes
    const setVol = () => {
      const shuffled = [...filteredData].sort(() => Math.random() - 0.5);
      setVocabulariesRandomData(shuffled);
    };
    setVol();
  }, [filteredData]);

  return {
    vocabularyList,
    pagination,
    loading: false,
    setQuery,
    vocabulariesRandomData,
    loadingRandom: false,
    createVocabulary: () => {},
    isCreating: false,
    deleteVocabulary: () => {},
    isDeleting: false,
  };
}
