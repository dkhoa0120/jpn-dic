import { ECategory } from "@/common/types";
import VocabularyList from "@/common/ui/VocabularyList";

export default function HiraList() {
  return (
    <div>
      <VocabularyList category={ECategory.VocabularyTypeHiragana} />
    </div>
  );
}
