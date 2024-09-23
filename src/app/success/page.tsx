"use client";

import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center bg-green-400">
        <h1 className="text-white text-center font-extrabold text-3xl">
          Success
        </h1>
        <button
          className="w-1/2 mt-5 rounded-xl bg-slate-100"
          onClick={() => router.push("/")}
        >
          Go to shop
        </button>
      </div>
    </>
  );
}
