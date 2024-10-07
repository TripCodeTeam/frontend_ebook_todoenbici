"use client";

import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-2xl font-semibold">Cargando...</div>
    </div>
  );
};

export default LoadingScreen;
