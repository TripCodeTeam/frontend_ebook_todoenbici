"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <main className="flex items-center justify-center p-96 pt-32">
      <div>
        <h1 className="text-center font-bold text-slate-900 dark:text-cyan-500 text-5xl leading-tight mb-3">
          Tailwind CSS: Dark Mode Tutorial
        </h1>
        <p className="text-lg font-medium text-slate-700 dark:text-cyan-700 text-center mb-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
          corporis officia illum saepe voluptates, assumenda molestiae
          exercitationem quisquam illo omnis? Fuga, voluptates? Eum dolor ipsam
          expedita perspiciatis doloremque, ad illo!
        </p>
        <button
          onClick={toggleTheme}
          className="flex justify-center items-center m-auto text-lg w-fit dark:bg-sky-500/50 bg-cyan-700 hover:bg-cyan-800 transition-color duration-200 ease-in-out py-3 px-10 rounded-lg text-gray-50 font-semibold py-[10px] px-4"
        >
          Toggle Theme
        </button>
      </div>
    </main>
  );
}
