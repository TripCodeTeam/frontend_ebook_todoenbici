import { ScalarBook } from "@/types/Book";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { bookId } = await req.json();

    console.log(bookId);

    const response = await axios.get(
      `${process.env.BACKEND_ENDPOINT}/ebook/${bookId}`,
      {}
    );

    console.log(response);

    if (response.data.success == true) {
      const book: ScalarBook = await response.data.data;

      return NextResponse.json({ success: true, data: book }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Error al obtener el libro" },
        { status: response.status }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      // Manejamos los errores
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }
  }
}
