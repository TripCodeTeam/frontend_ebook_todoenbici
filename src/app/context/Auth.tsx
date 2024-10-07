// Auth.tsx
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
import { CreateUserDto, rolUser } from "@/types/user";

interface GlobalContextType {
  user: CreateUserDto | null;
  loadingUser: boolean; // Estado para saber si se está verificando el usuario
  setUserData: (userData: CreateUserDto) => void;
  handleLogin: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; rol?: rolUser }>;
  handleLogout: () => void;
  changeDarkMode: () => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CreateUserDto | null>(null);
  const [loadingUser, setLoadingUser] = useState(true); // Inicia en true, porque estamos verificando
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      // Si hay un token, obtenemos la información del usuario
      axios
        .get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data.data);
        })
        .catch(() => {
          handleLogout(); // Si el token es inválido, cerramos sesión
        })
        .finally(() => {
          setLoadingUser(false); // Termina la verificación
        });
    } else {
      setLoadingUser(false); // No hay token, termina la verificación
    }
  }, []);

  const setUserData = (userData: CreateUserDto) => {
    setUser(userData);
    Cookies.set("userData", JSON.stringify(userData), { expires: 1 });
  };

  // Método para iniciar sesión y guardar el token
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post("api/auth/signin", {
        email,
        password,
      });

      const access_token = response.data.data;

      // Guardar el token en cookies
      Cookies.set("accessToken", access_token, { expires: 1 });

      // Obtener la información del usuario
      const userResponse = await axios.get("api/auth/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const data: CreateUserDto = userResponse.data.data;
      setUser(data);
      Cookies.set("userData", JSON.stringify(data), { expires: 1 });

      return { success: true, rol: data.rol };
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

  useEffect(() => {
    // Obtener el tema guardado en localStorage cuando se carga la app
    const savedTheme = localStorage.getItem("theme") || "light";
    setDarkmode(savedTheme === "dark");
    applyTheme(savedTheme);
  }, []);

  // Manejador para cambiar el tema
  const changeDarkMode = () => {
    setDarkmode(!darkmode);
    // Guardar la preferencia en localStorage
    localStorage.setItem("theme", !darkmode ? "dark" : "light");
    applyTheme(!darkmode ? "dark" : "light");
  };

  // Función para aplicar el tema basado en el estado
  const applyTheme = (theme: string) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <GlobalContext.Provider
      value={{ user, loadingUser, setUserData, handleLogin, changeDarkMode , handleLogout }}
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
