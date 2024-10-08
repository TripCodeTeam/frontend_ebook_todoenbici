import { CreateUserDto } from "@/types/user";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data: CreateUserDto = await req.json();

    const response = await axios.post(`${process.env.BACKEND_ENDPOINT}/users`, data);

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
