"use client";

import React from "react";
import { useGlobalContext } from "./context/Auth";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter, usePathname } from "next/navigation";

export function Content({ children }: { children: React.ReactNode }) {
  const { user, loadingUser } = useGlobalContext();
  const router = useRouter();
  const pathname = usePathname(); // Obtiene la ruta actual

  // Si estamos verificando el usuario, mostramos la pantalla de carga
  if (loadingUser) {
    return <LoadingScreen />;
  }

  // Si el usuario no está autenticado y no estamos en la página de inicio
  if (!user && pathname !== "/") {
    router.push("/"); // Redirigimos al home
    return null; // Evitamos renderizar el contenido
  }

  // Si todo está bien, mostramos el contenido
  return <>{children}</>;
}
