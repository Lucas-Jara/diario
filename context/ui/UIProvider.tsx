"use client"
import React, { useReducer } from "react";

import { UIContext, uiReducer } from "./";

export interface UIState {
  isMenuSidebarOpen: boolean;
  isSearchSidebarOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isMenuSidebarOpen: false,
  isSearchSidebarOpen: false,
};

type Props = {
  children: React.ReactNode;
};

export const UIProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const onToggleMenu = () => {
    dispatch({
      type: "UI - Toggle Menu Sidebar",
    });
  };

  const onToggleSearch = () => {
    dispatch({
      type: "UI - Toggle Search Sidebar",
    });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        onToggleMenu,
        onToggleSearch,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
