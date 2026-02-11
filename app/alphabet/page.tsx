// app/alphabet/page.tsx
import { Suspense } from "react";
import AlphabetCtn from "@/containers/alphabet/AlphabetCtn";

function AlphabetLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

export default function AlphabetPage() {
  return (
    <div className="pb-[10px] md:pb-0">
      <Suspense fallback={<AlphabetLoading />}>
        <AlphabetCtn />
      </Suspense>
    </div>
  );
}
