import HomeCtn from "@/containers/home/HomeCtn";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="w-full max-w-4xl mx-auto p-6">
        <HomeCtn />
      </main>
    </div>
  );
}
