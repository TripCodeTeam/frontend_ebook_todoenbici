"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthUser } from "@/types/user"; // Importa el tipo de usuario autenticado (lo definiremos abajo)

interface GlobalContextType {
  user: AuthUser | null;
  setUserData: (userData: AuthUser) => void;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Verificar si hay una sesión activa al cargar la aplicación
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      // Si hay un token, obtenemos la información del usuario
      axios
        .get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          handleLogout(); // Si el token es inválido, cerramos sesión
        });
    }
  }, []);

  const setUserData = (userData: AuthUser) => {
    setUser(userData);
    Cookies.set("userData", JSON.stringify(userData), { expires: 1 });
  };

  // Método para iniciar sesión y guardar el token
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { access_token } = response.data;

      // Guardar el token en cookies
      Cookies.set("accessToken", access_token, { expires: 1 });

      // Obtener la información del usuario
      const userResponse = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      setUser(userResponse.data.user);
      Cookies.set("userData", JSON.stringify(userResponse.data.user), {
        expires: 1,
      });
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Invalid credentials");
    }
  };

  // Método para cerrar sesión
  const handleLogout = () => {
    setUser(null);
    Cookies.remove("accessToken");
    Cookies.remove("userData");
  };

  return (
    <GlobalContext.Provider
      value={{ user, setUserData, handleLogin, handleLogout }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}
