"use client";

import React, { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { PiBooksDuotone } from "react-icons/pi";
import { SiGitbook } from "react-icons/si";
import {
  TbBookmarkFilled,
  TbMenu2,
  TbSquareRoundedArrowRightFilled,
  TbUserCircle,
  TbXboxXFilled,
} from "react-icons/tb";
import { useMediaQuery } from "react-responsive";
import Signin from "../auth/Signin";
import Signup from "../auth/signup";
import { useGlobalContext } from "@/app/context/Auth";
import Avatar from "react-avatar";
import { useRouter } from "next/navigation";

function NavBar() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para el drawer
  const [isOpen, setIsOpen] = useState(false);

  const { user, handleLogout } = useGlobalContext();
  const router = useRouter()

  const handleOpenModal = (content: React.SetStateAction<string>) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen); // Alterna el estado del drawer
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="flex flex-row justify-between p-2">
        <div className="flex flex-row gap-1">
          <div className="grid place-content-center">
            <PiBooksDuotone size={30} />
          </div>
          <h1
            className="flex items-center text-2xl font-extrabold dark:text-gray-300"
            onClick={() => router.push("/")}
          >
            Todo en bicicleta
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
              Ebooks
            </span>
          </h1>
        </div>

        <div
          className={
            isTabletOrMobile
              ? "grid place-content-center"
              : "flex flex-row gap-2"
          }
        >
          {!isTabletOrMobile && (
            <>
              {user === null ? (
                <>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleOpenModal("Iniciar Sesion")}
                      className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2 gap-2"
                    >
                      <TbUserCircle size={20} />
                      Iniciar Sesion
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => handleOpenModal("Registrarse")}
                      className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2 gap-2"
                    >
                      <HiOutlineMenuAlt2 />
                      Registrarse
                    </button>
                  </div>
                </>
              ) : (
                <div className="relative">
                  {/* Div envolvente del avatar */}
                  <div
                    className="grid place-content-center p-2 cursor-pointer"
                    onClick={toggleMenu}
                  >
                    <Avatar
                      src={user?.avatar}
                      alt={"avatar"}
                      size={"40px"}
                      round={true}
                    />
                  </div>

                  {/* Menú flotante */}
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-50 flex flex-col gap-2">
                      <div
                        onClick={() =>
                          (window.location.href = `/${user.username.toLowerCase()}`)
                        }
                        className="flex flex-row justify-between p-4 bg-green-500 rounded-md cursor-pointer hover:bg-green-400"
                      >
                        <h3 className="font-bold text-yellow-200">
                          {user.username}
                        </h3>
                        <div className="grid place-content-center">
                          <TbSquareRoundedArrowRightFilled className="text-yellow-200" />
                        </div>
                      </div>

                      <button
                        className="flex flex-row w-full  gap-1 text-left px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200"
                        onClick={() => window.location.href = "/discover"}
                      >
                        <div className="grid place-content-center">
                          <SiGitbook size={20} />
                        </div>
                        <p className="grid place-content-center">Descubirir</p>
                      </button>

                      <button
                        className="flex flex-row w-full  gap-1 text-left px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200"
                        onClick={handleLogout}
                      >
                        <div className="grid place-content-center">
                          <TbBookmarkFilled size={20} />
                        </div>
                        <p className="grid place-content-center">
                          Libros guardados
                        </p>
                      </button>

                      <button
                        className="flex flex-row w-full  gap-1 text-left px-4 py-2 text-sm text-gray-700 rounded-md hover:text-white hover:bg-red-300"
                        onClick={handleLogout}
                      >
                        <div className="grid place-content-center">
                          <TbXboxXFilled size={20} />
                        </div>
                        <p className="grid place-content-center">
                          Cerrar sesion
                        </p>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {isTabletOrMobile && (
            <button onClick={toggleDrawer}>
              <TbMenu2 size={20} />
            </button>
          )}
        </div>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-80 md:w-96 lg:w-1/2">
            <div className="flex flex-row justify-between">
              <h2 className="text-xl font-semibold grid place-content-center">
                {modalContent}
              </h2>
              <button
                onClick={handleCloseModal}
                className="mt-4 text-white bg-red-500 hover:bg-red-700 rounded-lg px-4 py-2"
              >
                Cerrar
              </button>
            </div>

            <div>
              <p>
                {modalContent === "Iniciar Sesion" ? <Signin /> : <Signup />}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Drawer component */}
      <div
        className={`fixed top-0 right-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } bg-white dark:bg-gray-800`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <div className="justify-between h-full">
          <h5
            id="drawer-navigation-label"
            className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
          >
            Menu
          </h5>
          <button
            type="button"
            onClick={toggleDrawer}
            aria-controls="drawer-navigation"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>

          <div className="py-4 overflow-y-auto justify-between h-max">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <SiGitbook />
                  <span className="ms-3">Descubrir</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <TbBookmarkFilled />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Guardados
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              type="button"
              onClick={() => handleOpenModal("Iniciar Sesion")}
              className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 gap-2"
            >
              <TbUserCircle size={20} />
              Iniciar Sesion
            </button>

            <button
              type="button"
              onClick={() => handleOpenModal("Registrarse")}
              className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 gap-2"
            >
              <HiOutlineMenuAlt2 />
              Registrarse
            </button>
          </div>
        </div>

        {/* Botones de Iniciar Sesión y Registrarse
        <div className="flex flex-col gap-2 mt-4">
          <button
            type="button"
            onClick={() => handleOpenModal("Iniciar Sesion")}
            className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 gap-2"
          >
            <TbUserCircle size={20} />
            Iniciar Sesion
          </button>

          <button
            type="button"
            onClick={() => handleOpenModal("Registrarse")}
            className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 gap-2"
          >
            <HiOutlineMenuAlt2 />
            Registrarse
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default NavBar;
