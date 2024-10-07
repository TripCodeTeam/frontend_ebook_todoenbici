import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que quieres proteger según el rol
const protectedRoutes = {
  READER: [""],
  SELLER: ["/su/admin"],
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  // Si no hay token, redirigimos al login
  if (!accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Obtenemos el valor de la cookie 'userData'
  const userData = request.cookies.get('userData')?.value;
  if (!userData) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const { rol } = JSON.parse(userData);  // Ahora accedes al valor correctamente

  // Verificar si el usuario tiene acceso a la ruta actual
  const currentPath = request.nextUrl.pathname;

  if (rol === 'READER' && protectedRoutes.READER.includes(currentPath)) {
    return NextResponse.next(); // Permitido para lectores
  }

  if (rol === 'SELLER' && protectedRoutes.SELLER.includes(currentPath)) {
    return NextResponse.next(); // Permitido para vendedores
  }

  // Si el usuario no tiene permisos, redirigimos a una página de acceso denegado
  return NextResponse.redirect(new URL('/access-denied', request.url));
}

// Aplica el middleware solo a rutas específicas
export const config = {
  matcher: ['/reader-only', '/seller-only', '/books', '/dashboard'],
};
