import { ScalarBook } from "@/types/Book";
import Image from "next/image";
import React from "react";
import {
  TbBookmark,
  TbPencilStar,
  TbShoppingCartPlus,
  TbWorld,
} from "react-icons/tb";
// import { toast } from "sonner";
import Avatar from "react-avatar";

function BookCard({ book }: { book: ScalarBook }) {
  // const handleSaveBook = () => {
  //   toast.warning("Opcion no disponible");
  // };

  return (
    <>
      <div className="relative bg-gray-200 p-3 group shadow-sm">
        {/* Iconos que aparecen sobre la imagen */}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div className="bg-white rounded-full p-1 shadow-md">
            <TbBookmark size={20} className="cursor-pointer text-gray-600" />
          </div>
          <div className="bg-white rounded-full p-1 shadow-md">
            <TbShoppingCartPlus
              size={20}
              className="cursor-pointer text-gray-600"
            />
          </div>
        </div>

        {/* Contenedor de la imagen con height de 300px */}
        <div className="flex justify-start relative h-[400px] overflow-hidden rounded-md">
          <Image
            src={book?.cover_page || "/fallback-image.jpg"}
            // fill
            style={{ objectFit: "cover" }}
            width={500}
            height={300}
            className="rounded-md"
            alt="cover"
            priority
          />
        </div>

        <div className="flex flex-row gap-1 mt-2 p-2 w-full overflow-x-scroll scrollbar-hide">
          {book.language.map((len, index) => (
            <div
              key={index}
              className="flex flex-row gap-2 rounded-lg p-1 bg-blue-200 min-w-max"
            >
              <div className="grid place-content-center">
                <TbWorld className="text-white" />
              </div>
              <h5 className="text-white font-bold">{len}</h5>
            </div>
          ))}
        </div>

        <div className="p-2 flex flex-row justify-between">
          <div>
            <h3 className="text-xl font-semibold">{book.nameBook}</h3>
            <div className="flex flex-row gap-1">
              <div className="grid place-content-center">
                <TbPencilStar />
              </div>
              <p>{book.author}</p>
            </div>
          </div>
          <div className="grid place-content-center">
            <Avatar src={""} round={true} size={"35"} />
          </div>
        </div>

        <div className="p-3">
          <h5>Precio</h5>
          <div className="flex flex-row justify-between">
            <h1 className="grid place-content-center text-2xl">
              $ {book.price} USD
            </h1>
            <div
              className="hover:bg-white p-1 rounded-md cursor-pointer"
              onClick={() => (window.location.href = `/${book.id}`)}
            >
              Saber mas
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookCard;
