import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/** Global open/close state for the search dialog and favorites drawer. */
interface UiState {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  favoritesOpen: boolean;
  setFavoritesOpen: (open: boolean) => void;
}

const UiContext = createContext<UiState | null>(null);

export function UiStateProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const value = useMemo(
    () => ({ searchOpen, setSearchOpen, favoritesOpen, setFavoritesOpen }),
    [searchOpen, favoritesOpen],
  );
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUiState() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUiState must be used inside UiStateProvider");
  return ctx;
}
