import { ECategory } from "@/common/types";
import FlashCardList from "@/common/ui/FlashCardList";

export default function HiraFlashList() {
  return (
    <div>
      <FlashCardList category={ECategory.VocabularyTypeHiragana} />
    </div>
  );
}
