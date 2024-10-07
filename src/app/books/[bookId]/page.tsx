"use client";

import { ScalarBook } from "@/types/Book";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableProps } from "react-resizable";
import "react-resizable/css/styles.css"; // Asegúrate de importar los estilos

function OnlyBook({ params }: { params: { book: string } }) {
  const [bookInfo, setBookInfo] = useState<ScalarBook | null>(null);
  const [isResizable, setIsResizable] = useState(true);

  useEffect(() => {
    const getInfoBook = async () => {
      const response = await axios.post("/api/ebook/id", {
        bookId: params.book,
      });

      if (response.data.success) {
        const data: ScalarBook = response.data.data;
        setBookInfo(data);
      }
    };

    getInfoBook();
  }, [params.book]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsResizable(false); // Deshabilita en pantallas móviles
      } else {
        setIsResizable(true); // Habilita en pantallas grandes
      }
    };

    handleResize(); // Chequea el tamaño al cargar el componente
    window.addEventListener("resize", handleResize); // Chequea el tamaño al cambiar el tamaño de la ventana

    return () => {
      window.removeEventListener("resize", handleResize); // Limpia el event listener
    };
  }, []);

  const resizableProps: ResizableProps = {
    width: 200,
    height: Infinity,
    axis: "x",
    minConstraints: [100, Infinity],
    maxConstraints: [500, Infinity],
    className: "bg-gray-200",
    handle: (
      <span className="w-full h-full cursor-col-resize bg-transparent absolute right-0 top-0" />
    ),
  };

  return (
    <main className="flex min-h-screen w-[90%] ml-[5%] relative">
      {/* Columna izquierda - Imagen con tamaño ajustable */}
      {isResizable ? (
        <ResizableBox {...resizableProps}>
          <div className="relative h-full">
            {bookInfo?.cover_page && (
              <img
                src={bookInfo.cover_page}
                alt="cover"
                className="w-full h-auto"
              />
            )}
          </div>
        </ResizableBox>
      ) : (
        <div className="w-full md:w-[200px] bg-gray-200">
          {bookInfo?.cover_page && (
            <img
              src={bookInfo.cover_page}
              alt="cover"
              className="w-full h-auto"
            />
          )}
        </div>
      )}

      {/* Columna derecha - Contenido */}
      <div className="flex-1 bg-white ml-4" id="rightPane"></div>
    </main>
  );
}

export default OnlyBook;
