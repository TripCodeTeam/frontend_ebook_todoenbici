"use client";

import { useGlobalContext } from "@/app/context/Auth";
import Rating from "@/components/books/Rating";
import PdfViewer from "@/components/books/Viewer";
import { ScalarBook } from "@/types/Book";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiSecretBook } from "react-icons/gi";
import { TbInfoCircle } from "react-icons/tb";
import { ResizableBox, ResizableProps } from "react-resizable";
import "react-resizable/css/styles.css"; // Asegúrate de importar los estilos

function OnlyBook({ params }: { params: { bookId: string } }) {
  const [bookInfo, setBookInfo] = useState<ScalarBook | null>(null);
  const [isResizable, setIsResizable] = useState(true);
  const [hasPurchased, setHasPurchased] = useState(false);

  const { user } = useGlobalContext();

  useEffect(() => {
    const getInfoBook = async () => {
      const response = await axios.post("/api/ebook/id", {
        bookId: params.bookId,
      });

      if (response.data.success) {
        const data: ScalarBook = response.data.data;
        setBookInfo(data);
      }
    };

    getInfoBook();
  }, [params.bookId]);

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
    minConstraints: [300, Infinity],
    maxConstraints: [400, Infinity],
    className: "bg-gray-200 dark:bg-gray-700 relative group shadow-lg",
    handle: (
      <span className="w-2 h-full cursor-col-resize dark:bg-gray-700 dark:group-hover:bg-gray-700 absolute right-0 top-0" />
    ),
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen w-[90%] ml-[5%] relative">
      {/* Columna izquierda - Imagen con tamaño ajustable */}
      {isResizable ? (
        <ResizableBox {...resizableProps}>
          <div className="relative h-full p-3">
            <div className="flex flex-row">
              {user ? (
                <div className="flex flex-row flex-1">
                  {bookInfo?.isVirtual && (
                    <button
                      type="button"
                      className="cursor-pointer text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                      onClick={() => setHasPurchased(true)} // Simular compra
                    >
                      Comprar Ebook
                    </button>
                  )}
                  {bookInfo?.isPhysical && (
                    <button
                      type="button"
                      className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Comprar físico
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-row gap-1 mb-2">
                  <div className="grid place-content-center">
                    <TbInfoCircle className="dark:text-gray-100" />
                  </div>
                  <p className="dark:text-white">Inicia sesión para comprar</p>
                </div>
              )}
            </div>

            <div className="mb-3">
              <img
                src={bookInfo?.cover_page as string}
                alt="cover"
                className="w-full h-auto"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-2xl text-gray-700 font-extrabold dark:text-white">
                {bookInfo?.nameBook}
              </h2>
            </div>

            <Rating
              rating={bookInfo?.rating as number}
              bookId={bookInfo?.id as string}
            />
          </div>
        </ResizableBox>
      ) : (
        <div className="flex flex-col w-full md:w-[200px] p-3">
          <div className="flex flex-row">
            {user ? (
              <div className="flex flex-row flex-1">
                {bookInfo?.isVirtual && (
                  <button
                    type="button"
                    className="cursor-pointer text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                    onClick={() => setHasPurchased(true)} // Simular compra
                  >
                    Comprar Ebook
                  </button>
                )}
                {bookInfo?.isPhysical && (
                  <button
                    type="button"
                    className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Comprar físico
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-row gap-1 mb-2">
                <div className="grid place-content-center">
                  <TbInfoCircle className="dark:text-gray-100" />
                </div>
                <p className="dark:text-white">Inicia sesión para comprar</p>
              </div>
            )}
          </div>

          <div className="mb-2">
            <img
              src={bookInfo?.cover_page}
              alt="cover"
              className="w-full h-auto"
            />
          </div>

          <div className="mb-4">
            <h2 className="text-4xl font-extrabold dark:text-white">
              {bookInfo?.nameBook}
            </h2>
          </div>

          <Rating
            rating={bookInfo?.rating as number}
            bookId={bookInfo?.id as string}
          />
        </div>
      )}

      {/* Columna derecha - Contenido */}
      <div
        className="flex-1 md:ml-4 w-full md:w-auto h-[700px] md:h-auto shadow-lg"
        id="rightPane"
      >
        {hasPurchased ? (
          <PdfViewer
            pdfUrl={
              "https://ffb5d2c867490dc0997532175fc1851e2806cde30ce1be950a8decf-apidata.googleusercontent.com/download/storage/v1/b/e_books_todo_en_bici/o/13451345135251351345-VerPul.pdf?jk=AdvOr8u10O84FJLfZ3C5toy-LyeZsdthihdz_GQqn6cbyEnnQtDuTYtqwAQRDe3PO19J9FMbgE2_NDVM21zYmZOa8oPcN2guxkeO-L7hXT5vT5JXPt2Ok7xO1T-jkl4obidLkFl8qbZ3UmgsPxgEco1gsigHTiiNzvN6Kw9YIm1IWD-SYIfn6RAJIhqV9CHGrxPgoa-5aOfLbyGKKjoOLuZ_AR_VV6akN2V44HgqTOrjzfLt-uffJwp7zT-0lKfGKcNwXkKQ_BWp7kY0-7_9W6W-gS5uWbFcSg14ncukZvBnQRF3LEQG9BT_g_jiDF5yBrkhvz4HRqEoWiZhYV2wOcPiodOSxb97lrFlxk7B6dslTR9RfwdzYi0eZiPVH5MY28DwfTfLvtNfUeknY4YKr1uCgMIC81HKTGVN5IdaXoqEbjzOrjO5YxnMjXmzwuAyDxQ0NuKLmtQoNZijfs_JitryNE6OW4reWe--UyAc2OQ9xIQXjiH7Q9FSHTShIY-1QOsv4D1MdBOBjTZtLYW9Ki-_7F5hF_cm6m1JJZgkxW3y67QmGjWO0yrwykPH9Prc8XobTFXar93454TSzA64r8z0CM4KlwtrEyYY1HuUAeXkuahrY9YIFMxVZ8FOUQxq8lxCvZKkVfmt2-t94skhW3icK2SdIhUNB4wEBllUQwOu1YF6bEpS3gWbT9v2YVAGblCsvUxKuaatCaaz_pdHERqCgo48QkBiDoFxXvB22AZxNw5Lew9rU2Rr2g0gdd-QHhJky1rKCD9hzasQ3D6eqLEvPZ3iA1XutabXFcuL7G1DoUy19X1HOMcYeiJW2-aAcEFiCVQXDqlSIrTZdtaKE6KMciA27YK0ZcTeWEbuH-MGwuZ8Xs8IfNHueHOlGgzqd9zG9AUwxxiLc_n48-N0CcciI0gYrtu3HmEa3aWkqMI3ZCMrBUDfNiw8746RmQzTE_PljcdGlZ-mw_4Xs7h_3tq2y5t1kR2-dCDPgWU0CwSbCMTOk2R6gJdrWmrIjJ_AI5hwSxb_1HsiDHDgZ8l7czbanCtZSbrNS8nj6PlhFQaK27MsU380SnExhqdthBXQaAWxs4tft3EDnJUXArM5IktAuRedvpNujncNN7sQbwTZ61YJdJHaIjdhhOKPEv9YKUD8MOmlmMsM3zWhN6U24g&isca=1"
            }
          />
        ) : (
          <div className="grid place-content-center h-full bg-gray-100 dark:bg-gray-600 text-gray-700 p-3 rounded-md">
            <div className="flex flex-col">
              <div className="grid place-content-center">
                <GiSecretBook size={100} className="dark:text-gray-300" />
              </div>
              <p className="text-center dark:text-gray-100">
                Compra este ebook para poder ver su contenido.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default OnlyBook;
