import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas que quieres proteger según el rol
const protectedRoutes = {
  READER: [""],
  SELLER: ["/su/admin"],
};

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // Permitir acceso sin autenticación a cualquier ruta que comience con '/books/'
  if (currentPath.startsWith("/books/")) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;

  // Si no hay token, redirigimos al login
  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const userData = request.cookies.get("userData")?.value;
  if (!userData) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { rol } = JSON.parse(userData);

  if (rol === "READER" && protectedRoutes.READER.includes(currentPath)) {
    return NextResponse.next();
  }

  if (rol === "SELLER" && protectedRoutes.SELLER.includes(currentPath)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/access-denied", request.url));
}

export const config = {
  matcher: [
    "/su/admin", // Protege esta ruta
    "/dashboard", // Protege esta ruta
    // Excluye dinámicamente las rutas que empiezan con '/books/' pero que tienen parámetros dinámicos (como bookId)
    "/books/:path((?!\\d+).*)",
  ],
};
