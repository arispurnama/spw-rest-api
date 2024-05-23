'use client'
import { useRouter } from "next/navigation";

export default function Home() {
const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-7xl text-red-500 font-bold">ARISSSS pakboy</p>
      <button className="py-3 px-5 rounded-full bg-purple-950 text-white" onClick={() => router.push('/homepage')}>Route me to home page</button>
    </main>
  );
}
