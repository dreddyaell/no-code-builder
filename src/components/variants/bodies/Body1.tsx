"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { HeaderItem } from "@/components/variants/types";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;
}

interface Body1Props {
  items: HeaderItem[];
  previewMode?: boolean;
  backgroundColor?: string;
}

export default function Body1({ previewMode, backgroundColor }: Body1Props) {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "5 Tips voor Minimalistisch Wonen",
      description: "Leer hoe je jouw ruimte rustiger en functioneler maakt.",
      category: "Wonen",
    },
    {
      id: 2,
      title: "Hoe je productiever werkt met AI",
      description: "Gebruik AI-tools om slimmer te werken in je workflow.",
      category: "Tech",
    },
    {
      id: 3,
      title: "Koken met 5 ingrediënten",
      description: "Snelle en lekkere maaltijden met maar 5 ingrediënten.",
      category: "Eten",
    },
  ]);

  const [featuredPost, setFeaturedPost] = useState<BlogPost>({
    id: 999,
    title: "🚀 De kern van jouw verhaal",
    description: "Dit is waar je je missie, kernboodschap of visie vertelt. Inspireer je bezoekers!",
    category: "Uitgelicht",
    image: "https://source.unsplash.com/random/1200x600?startup",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempDesc, setTempDesc] = useState("");
  const [tempImage, setTempImage] = useState<string | undefined>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId !== null) inputRef.current?.focus();
  }, [editingId]);

  const handleEditClick = (id: number, title: string, description: string, image?: string) => {
    setEditingId(id);
    setTempTitle(title);
    setTempDesc(description);
    setTempImage(image);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setTempImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (editingId === featuredPost.id) {
      setFeaturedPost((prev) => ({
        ...prev,
        title: tempTitle,
        description: tempDesc,
        image: tempImage,
      }));
    } else {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, title: tempTitle, description: tempDesc, image: tempImage }
            : p
        )
      );
    }
    setEditingId(null);
  };

  return (
    <section
      className="w-full min-h-[90vh] flex flex-col items-center overflow-x-hidden px-4 py-10"
      style={{ backgroundColor: backgroundColor || "#f4f4f5" }}
    >
      <h2 className="text-gray-900 text-4xl font-bold mb-10">📰 Blogoverzicht</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.01] cursor-pointer relative"
            onClick={() =>
              !previewMode && handleEditClick(post.id, post.title, post.description, post.image)
            }
          >
            {editingId === post.id ? (
              <div className="p-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  placeholder="Titel"
                  className="w-full mb-2 border-b-2 border-gray-300 text-lg font-bold"
                />
                <textarea
                  value={tempDesc}
                  onChange={(e) => setTempDesc(e.target.value)}
                  placeholder="Beschrijving"
                  className="w-full border border-gray-200 p-2 rounded mb-2 text-gray-700"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mb-2"
                />
                {tempImage && (
                  <img
                    src={tempImage}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                )}
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                >
                  ✅ Opslaan
                </button>
              </div>
            ) : (
              <>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-xs text-blue-500 uppercase">
                    🔖 {post.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.description}</p>
                  {!previewMode && (
                    <span className="absolute top-2 right-3 text-gray-400 text-sm">✏️</span>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ✨ Highlight Section */}
      <div
        className="mt-16 w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden transition hover:scale-[1.01] cursor-pointer relative"
        onClick={() =>
          !previewMode &&
          handleEditClick(
            featuredPost.id,
            featuredPost.title,
            featuredPost.description,
            featuredPost.image
          )
        }
      >
        {editingId === featuredPost.id ? (
          <div className="p-6">
            <input
              ref={inputRef}
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="w-full mb-2 border-b-2 border-gray-300 text-2xl font-bold"
            />
            <textarea
              value={tempDesc}
              onChange={(e) => setTempDesc(e.target.value)}
              className="w-full border border-gray-200 p-2 rounded mb-2 text-gray-700"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-2"
            />
            {tempImage && (
              <img
                src={tempImage}
                alt="Preview"
                className="w-full h-72 object-cover rounded mb-4"
              />
            )}
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              ✅ Opslaan
            </button>
          </div>
        ) : (
          <>
            {featuredPost.image && (
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-72 object-cover"
              />
            )}
            <div className="p-6">
              <span className="text-xs text-blue-500 uppercase">🔎 {featuredPost.category}</span>
              <h3 className="text-2xl font-bold text-gray-900">{featuredPost.title}</h3>
              <p className="text-gray-700 mt-2">{featuredPost.description}</p>
              {!previewMode && (
                <span className="absolute top-3 right-4 text-gray-400 text-sm">✏️</span>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
