import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LayoutBuilder from "@/components/LayoutBuilder";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Full-width Header met bewerkbare elementen */}
      <Header />

      {/* ✅ Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 gap-8 mt-16">
        <h1 className="text-2xl font-bold">🚀 No-Code Website Builder</h1>
        <LayoutBuilder />
      </main>

      {/* ✅ Full-width Footer met bewerkbare elementen */}
      <Footer />
    </div>
  );
}
