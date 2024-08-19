import React, { createContext, useReducer } from "react";

const initialState = {
  posts: [],
  language: "en",
};

// Create a reducer function
const appReducer = (state, action) => {
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
export const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
});

// Create a provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
