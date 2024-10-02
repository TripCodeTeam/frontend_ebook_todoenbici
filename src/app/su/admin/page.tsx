"use client";

import AddBook from "@/app/components/admin/AddBook";
import React, { useState } from "react";
import { TbPlaylistAdd, TbSearch } from "react-icons/tb";
import styles from "./page.module.css";
import ListBooks from "@/app/components/admin/ListBooks";
import SalesBooks from "@/app/components/admin/Sales";

type sideProps = "books" | "sales";

function AdminPage() {
  const [openAddBook, setOpenAddBook] = useState<boolean>(false);
  const [side, setSide] = useState<sideProps>("books");

  const handleOpenSide = (side: sideProps) => setSide(side);

  return (
    <>
      <main className={styles.barSearch}>
        <div className="flex flex-wrap gap-2 mt-7 mb-5">
          <div className="grid place-content-center">
            <button
              onClick={() => setOpenAddBook(!openAddBook)}
              type="button"
              className="text-yellow-200 bg-blue-300 hover:bg-blue-500 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 gap-2"
            >
              <TbPlaylistAdd size={25} />
              {!openAddBook ? "Agregar Ebook" : "Cancelar"}
            </button>
          </div>

          {!openAddBook && (
            <div className="flex flex-row flex-1 gap-3">
              <div className="flex flex-row flex-1">
                <div className="grid place-content-center border-t border-b border-l p-2 rounded-md">
                  <TbSearch />
                </div>
                <input
                  className="p-2 rounded-md border-t border-b border-r border-gray-200 outline-none w-full  text-base"
                  type="text"
                  placeholder="Ingresa el nombre del libro"
                />
              </div>
              <button className="text-base font-semibold hover:text-slate-500">
                Buscar
              </button>
            </div>
          )}
        </div>

        {openAddBook && <AddBook />}

        {!openAddBook && (
          <div>
            <div className="flex flex-1 justify-start gap-3 mt-6">
              <h3 onClick={() => handleOpenSide("books")}>Tus Libros</h3>
              <h3 onClick={() => handleOpenSide("sales")}>Ventas</h3>
            </div>

            {side == "books" && <ListBooks />}
            {side == "sales" && <SalesBooks />}
          </div>
        )}
      </main>
    </>
  );
}

export default AdminPage;
