import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { sellerId } = await req.json();
  try {
    const books = await fetch(`${process.env.BACKEND_ENDPOINT}/ebook/all/${sellerId}`, {
      method: "GET",
    });

    const res = await books.json();

    if (res.success == true) {
      return NextResponse.json(res);
    } else if (res.success == false) {
      throw new Error(res.error);
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
