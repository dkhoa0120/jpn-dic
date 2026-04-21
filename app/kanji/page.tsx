import { Suspense } from "react";
import KanjiCtn from "@/containers/kanji/KanjiCtn";

function KanjiLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 dark:from-gray-900 dark:via-teal-900 dark:to-emerald-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
    </div>
  );
}

export default function KanjiPage() {
  return (
    <div className="pb-[10px] md:pb-0">
      <Suspense fallback={<KanjiLoading />}>
        <KanjiCtn />
      </Suspense>
    </div>
  );
}
