"use client";

import { ScalarBook } from "@/types/Book";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function OnlyBook({ params }: { params: { book: string } }) {
  const [bookInfo, setBookInfo] = useState<ScalarBook | null>(null);

  useEffect(() => {
    // console.log(params.book_id);

    const getInfoBook = async () => {
      const response = await axios.post("/api/ebook/id", {
        bookId: params.book,
      });

      // console.log("Only book info", response.data);

      if (response.data.success == true) {
        const data: ScalarBook = response.data.data;
        setBookInfo(data);
      }
    };

    getInfoBook();
  }, [params.book]);

  return (
    <>
      <main>
        <div>
          <Image src={bookInfo?.cover_page as string} alt="cover" />
        </div>
      </main>
    </>
  );
}

export default OnlyBook;
