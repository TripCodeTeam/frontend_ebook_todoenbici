"use client";

import { ScalarBook } from "@/types/Book";
import { useEffect, useState } from "react";
import BookCard from "@/components/Cards/BookCard";
import styles from "./page.module.css";

export default function Home() {
  const [books, setBooks] = useState<ScalarBook[]>([]);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const response = await fetch("/api/ebook", { method: "GET" });
        const data: ScalarBook[] = await response.json();
        console.log(data);
        setBooks(data);
      } catch (error) {
        console.error(error)
      }
    };

    getAllBooks();
  }, []);

  return (
    <>
      <main className={styles.mainBooks}>
        {/* <h1>Landing Page Ebook</h1> */}

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
