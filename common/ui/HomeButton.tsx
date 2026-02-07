"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "antd";

export default function HomeButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide button on home page
  if (pathname === "/") {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        size="large"
        type="primary"
        onClick={() => router.push("/")}
        className="shadow-lg hover:shadow-xl transition-shadow"
        icon={<span className="text-xl">🏠</span>}
      >
        <span className="hidden sm:inline ml-1">Trang chủ</span>
      </Button>
    </div>
  );
}
