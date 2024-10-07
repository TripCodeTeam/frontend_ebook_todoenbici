"use client";

import { ScalarBook } from "@/types/Book";
import { useEffect, useState } from "react";
import BookCard from "@/components/Cards/BookCard";

export default function Home() {
  const [books, setBooks] = useState<ScalarBook[]>([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const response = await fetch("/api/ebook", { method: "GET" });
        const data: ScalarBook[] = await response.json();
        console.log(data);
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllBooks();
  }, []);

  return (
    <>
      <main className=" bg-white min-h-dvh dark:bg-gray-700">
        {books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p>No books available</p>
        )}
      </main>
    </>
  );
}
