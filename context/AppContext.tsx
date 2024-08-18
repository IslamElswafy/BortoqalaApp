import React, { createContext, useReducer, ReactNode } from "react";

// Define types for your state
type AppState = {
  posts: any[];
  language: "en" | "ar";
};

// Initial state
const initialState: AppState = {
  posts: [],
  language: "en",
};

// Define action types
type Action =
  | { type: "SET_POSTS"; payload: any[] }
  | { type: "SET_LANGUAGE"; payload: "en" | "ar" };

// Create a reducer function
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

// Create the context
export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
