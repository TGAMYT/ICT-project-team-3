"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context's value type
interface MatricContextType {
  matricNumber: string;
  setMatricNumber: (matric: string) => void;
}

// Create the context with default values
const MatricContext = createContext<MatricContextType | undefined>(undefined);

// Custom hook to use the context
export const useMatric = () => {
  const context = useContext(MatricContext);
  if (!context) {
    throw new Error("useMatric must be used within a MatricProvider");
  }
  return context;
};

// Context provider component
export const MatricProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [matricNumber, setMatricNumber] = useState<string>("");

  return (
    <MatricContext.Provider value={{ matricNumber, setMatricNumber }}>
      {children}
    </MatricContext.Provider>
  );
};
