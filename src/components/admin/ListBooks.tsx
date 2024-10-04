import { ScalarBook } from "@/types/Book";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../Cards/BookCard";

function ListBooks() {
  const [books, setBooks] = useState<ScalarBook[] | null>(null);

  useEffect(() => {
    const getBooksClient = async () => {
      const response = await axios.post("/api/user/ebooks", {
        sellerId: "c2302dfc-5307-4697-b742-934032a72074",
      });

      if (response.data.success == true) {
        const books: ScalarBook[] = response.data.data;
        setBooks(books);
      }
    };

    getBooksClient();
  }, []);
  return (
    <>
      {books?.map((book) => (
        <BookCard book={book} />
      ))}
    </>
  );
}

export default ListBooks;
