import cloudinary from "@/lib/cloudinary-conf";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, img, cover } = await req.json();

    if (!img) throw new Error("img is required");

    const randomUpId = Math.floor(100000 + Math.random() * 900000);

    const response = await cloudinary.v2.uploader.upload(img, {
      folder: "book_covers",
      public_id: cover
        ? `cover_page-${userId}.${randomUpId}`
        : `back_cover-${userId}.${randomUpId}`,
    });

    return NextResponse.json({ success: true, data: response.secure_url });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
