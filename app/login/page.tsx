"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import ".././../styles/globals.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "santildev" && password === "143@merabhai") {
  document.cookie = "loggedIn=true; path=/";
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 px-4">
      <Card className="p-4 sm:p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Username</label>
            <Input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full text-base py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div className="relative">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full text-base py-2 px-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <span
              className="absolute right-3 top-9 sm:top-9 top-2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{ zIndex: 2 }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <Button type="submit" className="w-full py-2 text-base rounded-md bg-pink-500 hover:bg-pink-600 transition">Login</Button>
        </form>
      </Card>
    </div>
  );
}
