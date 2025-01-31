"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface NameContextType {
  name: string;
  setUserName: (name: string) => void;
}

// Create the context
const NameContext = createContext<NameContextType | undefined>(undefined);

// Create a provider component
interface NameProviderProps {
  children: ReactNode;
}

export const NameProvider: React.FC<NameProviderProps> = ({ children }) => {
  const [name, setUserName] = useState("");

  return (
    <NameContext.Provider value={{ name, setUserName }}>
      {children}
    </NameContext.Provider>
  );
};

// Create a custom hook to use the NameContext
export const useName = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("useName must be used within a NameProvider");
  }
  return context;
};
