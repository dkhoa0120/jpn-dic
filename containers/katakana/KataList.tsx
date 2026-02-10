import { ECategory } from "@/common/types";
import VocabularyList from "@/common/ui/VocabularyList";

export default function KataList() {
  return (
    <div>
      <VocabularyList category={ECategory.VocabularyTypeKatakana} />
    </div>
  );
}
