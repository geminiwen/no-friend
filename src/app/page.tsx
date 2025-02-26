import SentenceGenerator from "../components/SentenceGenerator";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-8 text-[#2b2b2b]">朋友圈生成器</h1>
        <SentenceGenerator />
      </main>
      <footer className="w-full py-4 text-center text-gray-500 text-sm">
        © 2024 朋友圈生成器 - 让创作更简单
      </footer>
    </div>
  );
}
