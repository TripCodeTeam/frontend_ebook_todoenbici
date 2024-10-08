import { CommentsBook } from "@/types/Book";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const Rating = ({ rating, bookId }: { rating: number; bookId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<CommentsBook[] | null>(null);

  // Aseguramos que el rating esté dentro del rango 0-5
  const normalizedRating = Math.min(Math.max(rating, 0), 5);
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const totalStars = 5;

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <div className="flex flex-row justify-between ">
        <div className="flex items-center">
          {/* Renderizamos las estrellas */}
          {[...Array(totalStars)].map((_, index) => {
            if (index < fullStars) {
              return <FaStar key={index} className="h-5 w-5 text-yellow-500" />;
            }
            if (index === fullStars && hasHalfStar) {
              return (
                <FaStar
                  key={index}
                  className="h-5 w-5 text-yellow-500 opacity-50"
                />
              );
            }
            return (
              <FaStar
                key={index}
                className="h-5 w-5 text-gray-400 opacity-20"
              />
            );
          })}

          {/* Mostrar el rating numérico */}
          {/* <span className="ml-2 text-gray-600">{rating}</span> */}
        </div>

        {/* Chevron para desplegar comentarios */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 flex items-center text-gray-600 hover:text-gray-800"
        >
          <FaChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Lista de comentarios */}
      {isOpen && comments && comments.length > 0 && (
        <div className="mt-2 p-2 border-t border-gray-200">
          <h3 className="font-semibold">Comentarios:</h3>
          <ul className="list-disc pl-5">
            {comments.map((comment, index) => (
              <li key={index} className="text-gray-700">
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Rating;
