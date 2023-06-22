import { React, useContext, createContext, useReducer } from 'react';
import reducer from './reducer';
import { CLEAR_ALERT, DISPLAY_ALERT } from './actions';

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
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  return (
    //value prop to set up any global values we want
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
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
