import { CreateUserDto } from "@/types/user";
import axios from "axios";
import { NextResponse } from "next/server";

interface signinProps {
  email: string;
  password: string;
}

interface responseBackProps {
  data: {
    success: boolean;
    access_token: string;
    error?: string;
  };
}

export async function POST(req: Request) {
  try {
    const data: signinProps = await req.json();

    console.log("data received: ", data);

    const response: responseBackProps = await axios.post(
      `${process.env.BACKEND_ENDPOINT}/auth/login`,
      data
    );

    console.log("Session", response);

    if (response.data.success == false) {
      throw new Error(response.data.error);
    }

    return NextResponse.json({
      success: response.data.success,
      data: response.data.access_token,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: error, error: error.message });
    }
  }
}
