import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LayoutBuilder from "@/components/LayoutBuilder";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Full-width Header met grid-based elementen */}
      <Header />

      {/* ✅ Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 gap-8 mt-20">
        <h1 className="text-2xl font-bold">🚀 No-Code Website Builder</h1>
        <LayoutBuilder />
      </main>

      {/* ✅ Full-width Footer met grid-based elementen */}
      <Footer />
    </div>
  );
}
