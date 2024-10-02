"use client";

import React from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { PiBooksDuotone } from "react-icons/pi";
import { TbMenu2, TbUserCircle } from "react-icons/tb";
import { useMediaQuery } from "react-responsive";

function NavBar() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <nav className="flex flex-row justify-between p-2">
      <div className="flex flex-row gap-1">
        <div className="grid place-content-center">
          <PiBooksDuotone size={30} />
        </div>
        <h1 className="flex items-center text-2xl font-extrabold dark:text-white">
          Todo en bicicleta
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
            Ebooks
          </span>
        </h1>
      </div>

      <div className={isTabletOrMobile ? "grid place-content-center" : "flex flex-row gap-2"}>
        {!isTabletOrMobile && (
          <>
            <div>
              <button
                type="button"
                className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2 gap-2"
              >
                <TbUserCircle size={20} />
                Iniciar Sesion
              </button>
            </div>

            <div>
              <button
                type="button"
                className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2 gap-2"
              >
                <HiOutlineMenuAlt2 />
                Registrarse
              </button>
            </div>
          </>
        )}

        {isTabletOrMobile && <TbMenu2 size={20} />}
      </div>
    </nav>
  );
}

export default NavBar;
