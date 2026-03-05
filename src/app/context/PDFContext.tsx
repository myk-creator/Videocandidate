import React, { createContext, useContext, useState, useEffect } from "react";

interface PDF {
  id: string;
  title: string;
  url: string;
}

interface PDFContextType {
  pushedPDFs: PDF[];
  pushPDF: (pdf: PDF) => void;
  removePDF: (id: string) => void;
}

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export const PDFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pushedPDFs, setPushedPDFs] = useState<PDF[]>([]);

  // Sync with localStorage for cross-tab simulation
  useEffect(() => {
    const stored = localStorage.getItem("runway_pushed_pdfs");
    if (stored) setPushedPDFs(JSON.parse(stored));

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "runway_pushed_pdfs") {
        setPushedPDFs(JSON.parse(e.newValue || "[]"));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const pushPDF = (pdf: PDF) => {
    setPushedPDFs((prev) => {
      const exists = prev.find((p) => p.id === pdf.id);
      if (exists) return prev;
      const newList = [...prev, pdf];
      localStorage.setItem("runway_pushed_pdfs", JSON.stringify(newList));
      return newList;
    });
  };

  const removePDF = (id: string) => {
    setPushedPDFs((prev) => {
      const newList = prev.filter((p) => p.id !== id);
      localStorage.setItem("runway_pushed_pdfs", JSON.stringify(newList));
      return newList;
    });
  };

  return (
    <PDFContext.Provider value={{ pushedPDFs, pushPDF, removePDF }}>
      {children}
    </PDFContext.Provider>
  );
};

export const usePDFs = () => {
  const context = useContext(PDFContext);
  if (!context) throw new Error("usePDFs must be used within a PDFProvider");
  return context;
};
