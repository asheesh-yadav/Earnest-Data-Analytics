"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registered successfully");

      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleRegister}
        className="p-6 border border-gray-600 rounded w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 bg-gray-900 text-white rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 bg-gray-900 text-white rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 bg-gray-900 text-white rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-green-500 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}