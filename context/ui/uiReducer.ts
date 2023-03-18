import { UIState } from "./";

type UIActionType =
  | { type: "UI - Toggle Menu Sidebar"; }
  | { type: "UI - Toggle Search Sidebar"; };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Toggle Menu Sidebar":
      return {
        ...state,
        isMenuSidebarOpen: !state.isMenuSidebarOpen,
      };

    case "UI - Toggle Search Sidebar":
      return {
        ...state,
        isSearchSidebarOpen: !state.isSearchSidebarOpen,
      };

    default:
      return state;
  }
};
