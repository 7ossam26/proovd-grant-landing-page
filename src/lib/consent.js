"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ConsentContext = createContext(null);
const KEY = "proovd_consent_v1";

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "accepted" || v === "declined") setConsent(v);
    } catch {}
  }, []);

  const update = (v) => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    setConsent(v);
  };

  const value = {
    consent,
    accept: () => update("accepted"),
    decline: () => update("declined"),
    reset: () => {
      try {
        localStorage.removeItem(KEY);
      } catch {}
      setConsent(null);
    },
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  return useContext(ConsentContext);
}
