"use client"
import { createContext } from "react";

interface ContextProps {
  isMenuSidebarOpen: boolean;
  isSearchSidebarOpen: boolean;

  // methods

  onToggleMenu: () => void;
  onToggleSearch: () => void;
}

export const UIContext = createContext({} as ContextProps);
