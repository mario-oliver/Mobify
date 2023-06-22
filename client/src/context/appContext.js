import { React, useReducer, useContext, createContext, useState } from 'react';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

//must start with use to utilize useContext
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
