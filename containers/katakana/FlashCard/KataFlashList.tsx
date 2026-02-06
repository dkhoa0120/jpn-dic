import { ECategory } from "@/common/types";
import FlashCardList from "@/common/ui/FlashCardList";

export default function KataFlashList() {
  return (
    <div>
      <FlashCardList category={ECategory.VocabularyTypeKatakana} />
    </div>
  );
}
