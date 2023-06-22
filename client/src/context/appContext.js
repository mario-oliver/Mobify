import { React, useContext, createContext, useState } from 'react';
// import reducer from './reducer';

const initialState = {
  isLoading: false,
  showAlert: true,
  alertText: '',
  alertType: '',
};

const AppContext = createContext();

//use the context's provider
//pass children so we can render the rest of the app when wrapping the app in global context component
const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    //value prop to set up any global values we want
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

//set up the hook - otherwise, you'll have to import useContext and get AppContext
//only then you'll have access to global context
//with the hook, we don't need to do that by running --> const {isLoading, showAlert} = useAppContext()
//must start with use to utilize useContext
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
