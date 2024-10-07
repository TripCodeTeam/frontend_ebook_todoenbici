"use client";

import React from "react";
import { useGlobalContext } from "./context/Auth";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter, usePathname } from "next/navigation";

export function Content({ children }: { children: React.ReactNode }) {
  const { user, loadingUser } = useGlobalContext();
  const router = useRouter();
  const pathname = usePathname();

  if (loadingUser) {
    return <LoadingScreen />;
  }

  // Si el usuario no está autenticado y no estamos en la página de inicio ni en una ruta de libros
  if (!user && pathname !== "/" && !pathname.startsWith("/books/")) {
    router.push("/");
    return null;
  }

  return <>{children}</>;
}
