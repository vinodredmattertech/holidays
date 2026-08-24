"use client";

import { createContext, useContext, useMemo, useState } from "react";

type EnquiryContextValue = {
  destination: string;
  setDestination: (value: string) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [destination, setDestination] = useState("");
  const value = useMemo(() => ({ destination, setDestination }), [destination]);

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within EnquiryProvider");
  }
  return context;
}
