import { useGlobalContext } from "@/app/context/Auth";
import { CreateUserDto } from "@/types/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function Signup() {
  const [newUser, setNewUser] = useState<CreateUserDto | null>();
  const { handleLogin } = useGlobalContext();
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof CreateUserDto
  ) => {
    const { value } = e.target;

    setNewUser((prevUserData) => ({
      ...(prevUserData as CreateUserDto),
      [key]: value,
    }));
  };

  const handleNewUser = async () => {
    const errors: string[] = [];
    try {
      if (!newUser?.completeName || newUser.completeName.length === 0) {
        errors.push("Ingresa tu nombre");
        throw new Error("completeName is required!");
      }

      if (!newUser?.email || newUser.email.length === 0) {
        errors.push("Ingresa tu correo electronico");
        throw new Error("email is required!");
      }

      if (!newUser?.password || newUser.password.length === 0) {
        errors.push("Ingresa tu correo electronico");
        throw new Error("password is required!");
      }

      const response = await axios.post("/api/auth/signup", newUser);

      if (response.data.success == true) {
        const signin = await handleLogin(newUser.email, newUser.password);

        if (signin.success == true) {
          if (signin.rol == "SELLER") router.push("/su/admin");
          if (signin.rol == "READER") window.location.href = "/discover";
        }
      }
    } catch (error) {
      errors.forEach((error) => toast.error(error));
    }
  };

  return (
    <div className="mt-3">
      <div className="mt-3">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nombre completo
        </label>
        <input
          onChange={(e) => handleInputChange(e, "completeName")}
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nombre de usuario
        </label>
        <input
          onChange={(e) => handleInputChange(e, "username")}
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Correo electronico
        </label>
        <input
          type="text"
          onChange={(e) => handleInputChange(e, "email")}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Contraseña
        </label>
        <input
          onChange={(e) => handleInputChange(e, "password")}
          type="password"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>

      <div className="mt-5">
        <button
          onClick={handleNewUser}
          type="button"
          className="w-full grid place-content-center text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-500 me-2 mb-2"
        >
          <div className="flex flex-row">
            {/* <div className="grid place-content-center">
              <svg
                className="w-4 h-4 me-2 -ms-1 text-[#626890]"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="ethereum"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
                ></path>
              </svg>
            </div> */}
            <h5>Registrarse</h5>
          </div>
        </button>
      </div>

      <div className="grid place-content-center mt-5">
        <p className="dark:text-white">-- Tambien --</p>
      </div>

      <div className="grid place-content-center mt-5">
        <button
          onClick={() => toast.warning("No disponible por el momento")}
          type="button"
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 gap-3"
        >
          <svg
            width="26"
            height="32"
            viewBox="0 0 256 262"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
          >
            <path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="#4285F4"
            />
            <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="#34A853"
            />
            <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="#FBBC05"
            />
            <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="#EB4335"
            />
          </svg>
          Registrarse con Google
        </button>
      </div>
    </div>
  );
}

export default Signup;
