"use client";

import { ScalarBook } from "@/types/Book";
import { useEffect, useRef, useState } from "react";
import BookCard from "@/components/Cards/BookCard";
import { BsFire } from "react-icons/bs";
import { TbChevronRight } from "react-icons/tb";

export default function Home() {
  const [books, setBooks] = useState<ScalarBook[]>([]);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0); // Declarar tipo explícito como número
  const [scrollLeft, setScrollLeft] = useState(0); // Declarar tipo explícito como número

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return; // Verificación de null

    setIsDown(true);
    scrollContainerRef.current.classList.add("active");
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    scrollContainerRef.current?.classList.remove("active");
  };

  const handleMouseUp = () => {
    setIsDown(false);
    scrollContainerRef.current?.classList.remove("active");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplica por 2 para que el desplazamiento sea más rápido
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

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
      <main className="w-[90%] ml-[5%] mt-4 bg-white min-h-dvh dark:bg-gray-700 mb-4">
        <div className="mt-5">
          <div className="flex justify-start mb-5">
            <div className="flex flex-row p-3 gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 rounded-lg cursor-pointer">
              <div className="grid place-content-center">
                <BsFire size={20} className="text-yellow-400" />
              </div>
              <h3 className="font-bold text-clip mr-5 dark:text-gray-300 text-gray-500">
                Libros Populares
              </h3>
              <div className="grid place-content-center">
                <TbChevronRight className="text-gray-300" size={20} />
              </div>
            </div>
          </div>
          {books.length > 0 ? (
            <div
              className="flex overflow-x-scroll space-x-4 scrollbar-hide"
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {books.map((book) => (
                <div
                  key={book.id}
                  className="min-w-[100%] md:min-w-[350px] md:max-w-[350px]"
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          ) : (
            <p>No books available</p>
          )}
        </div>

        <div className="mt-5">
          <div className="flex justify-start mb-5">
            <div className="flex flex-row p-3 gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 rounded-lg cursor-pointer">
              <div className="grid place-content-center">
                <BsFire size={20} className="text-yellow-400" />
              </div>
              <h3 className="font-bold text-clip mr-5 dark:text-gray-300 text-gray-500">
                Libros Populares
              </h3>
              <div className="grid place-content-center">
                <TbChevronRight className="text-gray-300" size={20} />
              </div>
            </div>
          </div>
          {books.length > 0 ? (
            <div
              className="flex overflow-x-scroll space-x-4 scrollbar-hide"
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {books.map((book) => (
                <div
                  key={book.id}
                  className="min-w-[100%] md:min-w-[350px] md:max-w-[350px]"
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          ) : (
            <p>No books available</p>
          )}
        </div>
      </main>
    </>
  );
}
