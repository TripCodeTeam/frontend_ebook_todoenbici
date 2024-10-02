import React, { useState } from "react";
import { TbBookUpload } from "react-icons/tb";

const AddBook: React.FC = () => {
  const [coverPage, setCoverPage] = useState<string | null>(null);
  const [backCover, setBackCover] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("");
  const [isPhysical, setIsPhysical] = useState<boolean>(false);
  const [isVirtual, setIsVirtual] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genres, setGenres] = useState<string>("");

  const handleDrop = (index: number, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (index === 0) {
          setCoverPage(event.target?.result as string); // Guardar la imagen en el estado de la primera
        } else {
          setBackCover(event.target?.result as string); // Guardar la imagen en el estado de la segunda
        }
      };
      reader.readAsDataURL(files[0]); // Leer la imagen como URL
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto para permitir el drop
  };

  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (index === 0) {
          setCoverPage(event.target?.result as string); // Guardar la imagen en el estado de la primera
        } else {
          setBackCover(event.target?.result as string); // Guardar la imagen en el estado de la segunda
        }
      };
      reader.readAsDataURL(files[0]); // Leer la imagen como URL
    }
  };

  const clearImage = (index: number) => {
    if (index === 0) setCoverPage(null); // Eliminar imagen de portada
    else setBackCover(null); // Eliminar imagen de contraportada
  };

  const addLanguage = () => {
    if (language && !selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
    setLanguage(""); // Limpiar el select después de agregar
  };

  const removeLanguage = (index: number) => {
    setSelectedLanguages((prev) => prev.filter((_, i) => i !== index));
  };

  const addGenre = () => {
    if (genres && !selectedGenres.includes(genres)) {
      setSelectedGenres([...selectedGenres, genres]);
    }
    setGenres(""); // Limpiar el select después de agregar
  };

  const removeGenre = (index: number) => {
    setSelectedGenres((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileBook = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      // Verifica si el archivo supera los 10 MB
      const sizeLimitMB = 10;
      const sizeLimitBytes = sizeLimitMB * 1024 * 1024;

      if (selectedFile.size > sizeLimitBytes) {
        setError(`El archivo excede el límite de ${sizeLimitMB} MB.`);
        setFile(null);
      } else {
        setFile(selectedFile);
        setError("");
      }
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-5 mt-5 mb-6">
        <div className="flex basis-72 flex-1 flex-col">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-500">
              Nombre del libro
            </h3>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
              required
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-500">Autor</h3>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
              required
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-500">Descripcion</h3>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-500">Precio</h3>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
              required
            />
          </div>

          <div className="mt-5">
            <h3 className="text-lg font-semibold text-gray-500">
              Portada y Contraportada
            </h3>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              {/* Recuadro 1 */}
              <div
                className="relative w-full h-72 md:w-64 md:h-96 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                onDrop={(e) => handleDrop(0, e)}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("coverInput")?.click()} // Click para abrir el input
              >
                <input
                  type="file"
                  id="coverInput"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(0, e)}
                />

                {coverPage ? (
                  <>
                    <img
                      src={coverPage}
                      alt="Cargada"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearImage(0);
                      }}
                    >
                      X
                    </button>
                  </>
                ) : (
                  <h5 className="text-center text-gray-500">
                    Arrastra y suelta tu portada
                  </h5>
                )}
              </div>

              {/* Recuadro 2 */}
              <div
                className="relative w-full h-72 md:w-64 md:h-96 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                onDrop={(e) => handleDrop(1, e)}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("backInput")?.click()} // Click para abrir el input
              >
                <input
                  type="file"
                  id="backInput"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(1, e)}
                />
                {backCover ? (
                  <>
                    <img
                      src={backCover}
                      alt="Cargada"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearImage(1);
                      }}
                    >
                      X
                    </button>
                  </>
                ) : (
                  <h5 className="text-center text-gray-500">
                    Arrastra y suelta tu contra portada
                  </h5>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-lg font-semibold text-gray-500">
              Selecciona Idioma
            </h3>
            <div className="flex items-center space-x-3">
              <select
                className="border rounded-sm p-2 flex flex-1"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">Seleccionar idioma</option>
                <option value="Español">Español</option>
                <option value="Inglés">Inglés</option>
                <option value="Francés">Francés</option>
                <option value="Alemán">Alemán</option>
                {/* Puedes agregar más opciones aquí */}
              </select>
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={addLanguage}
              >
                Agregar idioma
              </button>
            </div>

            {/* Lista de idiomas seleccionados */}
            <div className="mt-4">
              {selectedLanguages.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-gray-600">
                    Idiomas seleccionados:
                  </h4>
                  <ul className="list-disc pl-5 flex flex-col gap-2">
                    {selectedLanguages.map((lang, index) => (
                      <li
                        key={index}
                        className="flex flex-1 justify-between p-1 bg-slate-100"
                      >
                        {lang}
                        <button
                          className="ml-3 bg-red-500 text-white p-1 rounded"
                          onClick={() => removeLanguage(index)}
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-lg font-semibold text-gray-500">
              Selecciona Generos
            </h3>
            <div className="flex items-center space-x-3">
              <select
                className="border rounded-sm p-2 flex flex-1"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
              >
                <option value="">Seleccionar género</option>
                <option value="Novela">Novela</option>
                <option value="Ficción">Ficción</option>
                <option value="Ciencia Ficción">Ciencia Ficción</option>
                <option value="Fantasía">Fantasía</option>
                <option value="Misterio">Misterio</option>
                <option value="Biografía">Biografía</option>
                <option value="Historia">Historia</option>
                <option value="Autobiografía">Autobiografía</option>
                <option value="Autoayuda">Autoayuda</option>
                <option value="Romance">Romance</option>
                <option value="Terror">Terror</option>
              </select>
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={addGenre}
              >
                Agregar Genero
              </button>
            </div>

            {/* Lista de idiomas seleccionados */}
            <div className="mt-4">
              {selectedGenres.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-gray-600">
                    Generos seleccionados:
                  </h4>
                  <ul className="list-disc pl-5 flex flex-col gap-2">
                    {selectedGenres.map((genre, index) => (
                      <li
                        key={index}
                        className="flex flex-1 justify-between p-1 bg-slate-100"
                      >
                        {genre}
                        <button
                          className="ml-3 bg-red-500 text-white p-1 rounded"
                          onClick={() => removeGenre(index)}
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-500">
              Cantidad inicial de libros en bodega
            </h3>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
              required
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-500">
              Cantidad inicial de libros en bodega
            </h3>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
              required
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-500 flex-1 mb-1">
              Cantidad inicial de libros en bodega
            </h3>
            <div className="flex flex-row gap-3">
              <div className="flex items-center">
                <label className="text-lg font-semibold text-gray-500 mr-2">
                  Físico
                </label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isPhysical}
                    onChange={() => setIsPhysical(!isPhysical)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="flex items-center">
                <label className="text-lg font-semibold text-gray-500 mr-2">
                  Virtual
                </label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isVirtual}
                    onChange={() => setIsVirtual(!isVirtual)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          {isVirtual == true && (
            <div className="mt-3">
              <h3 className="text-lg font-semibold text-gray-500 flex-1 mb-1">
                Carga tu libro ebook
              </h3>
              <div className="flex items-center">
                <input
                  type="file"
                  className="border p-2 rounded w-full"
                  onChange={handleFileBook}
                  accept="*/*" // Puedes ajustar el tipo de archivo permitido
                />
              </div>
            </div>
          )}

          <div className="flex justify-start">
            {isCreating && (
              <button
                disabled
                type="button"
                className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center mt-5"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Posteando libro ...
              </button>
            )}

            {!isCreating && (
              <button
                type="button"
                onClick={() => setIsCreating(true)}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-5"
              >
                Hecho
              </button>
            )}
          </div>
        </div>

        {isVirtual && (
          <div className="flex basis-72 flex-1 bg-gray-200 shadow-xl rounded-md">
            {!file && (
              <>
                <div className="w-full h-full grid place-content-center">
                  <div className="grid place-content-center">
                    <TbBookUpload className="text-gray-400" size={200} />
                  </div>
                  <h4 className="font-bold text-base text-gray-500">
                    Carga tu ebook primero para previsualizarlo
                  </h4>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AddBook;
