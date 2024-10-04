import { ScalarBook } from "@/types/Book";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data: ScalarBook = await req.json();

    const response = await axios.post("http://localhost:3000/ebook", data);

    if (response.data.success == false) {
      throw new Error(response.data.error);
    }

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: error, error: error.message });
    }
  }
}

export async function GET() {
  try {
    const response = await axios.get("http://localhost:3000/ebook/all");

    if (response.data.success == true) {
      const books: ScalarBook[] = await response.data.data;

      return NextResponse.json(books, { status: 200 });
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
