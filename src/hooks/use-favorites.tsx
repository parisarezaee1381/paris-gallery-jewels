import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "paris-gallery:favorites";

interface FavoritesContextValue {
  ids: string[];
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => boolean;
  remove: (id: string) => void;
  clear: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Read storage after hydration so server and client first render match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setIds(parsed.filter((x) => typeof x === "string"));
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* storage full or blocked */
    }
  }, [ids, loaded]);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      const next = !ids.includes(id);
      setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
      return next;
    },
    [ids],
  );

  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(
    () => ({ ids, isFavorite, toggle, remove, clear }),
    [ids, isFavorite, toggle, remove, clear],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
