"use client";

import { MatchCard } from "@/components/match-card"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    // Show logout if logged in
    setShowLogout(document.cookie.includes("loggedIn=true"));
  }, []);

  const handleLogout = () => {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 relative">
      <MatchCard />
      {showLogout && (
        <div className="w-full flex justify-center mt-8">
          <span
            onClick={handleLogout}
            className="text-pink-600 underline cursor-pointer text-base opacity-80 hover:opacity-100 transition"
            style={{ textDecorationThickness: '2px' }}
          >
            Logout
          </span>
        </div>
      )}
    </main>
  );
}
