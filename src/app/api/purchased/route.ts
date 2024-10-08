import { ScalarPurchased } from "@/types/Book";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { clientId, bookId } = await req.json();

    const response = await axios.post(`${process.env.BACKEND_ENDPOINT}/ebook/purchase`, {
      clientId,
      bookId,
    });

    console.log(response.data)

    if (response.data.success) {
      const purchased: ScalarPurchased = response.data.data;

      return NextResponse.json(purchased, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Error al obtener los libros" },
        { status: response.status }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      // Manejamos los errores
      return NextResponse.json(
        { message: "Error en la solicitud", error: error.message },
        { status: 500 }
      );
    }
  }
}
