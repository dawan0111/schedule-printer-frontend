import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initState = {
  onShow () {}
}

const UIContext = React.createContext(initState);

export default UIContext;

export function UIContextProvider({ children }) {
  const onShow = React.useCallback((message, type = "info", option) => {
    if (typeof toast[type] === "function") {
      toast[type](message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        ...option
      })
    } else {
      console.log('undefined toast type');
    }
  }, [])

  return (
    <UIContext.Provider value={{
      onShow
    }}>
      {children}
      <ToastContainer />
    </UIContext.Provider>
  )
}
