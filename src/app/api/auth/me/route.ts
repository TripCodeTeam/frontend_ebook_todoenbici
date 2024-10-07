import TokenService from "@/classes/TokenService";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Verificar la autenticación JWT
    const authorizationHeader = req.headers.get("Authorization");

    if (!authorizationHeader) {
      return NextResponse.json(
        { message: "Token de autorización no proporcionado" },
        { status: 401 }
      );
    }

    const token = authorizationHeader.split(" ")[1];

    console.log("retoken_back: ", token)

    const decodedToken = TokenService.verifyToken(
      token,
      process.env.JWT_SECRET as string
    ); // Reemplaza "tu-clave-secreta" con tu clave secreta

    if (!decodedToken) {
      return NextResponse.json({ message: "Token no válido" }, { status: 401 });
    }

    console.log("data received: ", token);

    const response = await axios.get(
      "http://localhost:3000/auth/me",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Session", response.data);

    if (response.data.success == false) {
      throw new Error(response.data.error);
    }

    return NextResponse.json({
      success: response.data,
      data: response.data.data,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: error, error: error.message });
    }
  }
}
