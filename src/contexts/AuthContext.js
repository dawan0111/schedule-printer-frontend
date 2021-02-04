import React from 'react'
import { BoxLoading } from 'react-loadingg'
import useAuth from '../hooks/useAuth'
import OverlayModal from '../components/OverlayModal'

const initState = {
  token: localStorage.getItem('auth_token') || null,
  fetching: false,
  userInfo: null,

  login (id, password) {},
  logout () {}
}


const AuthContext = React.createContext(initState)

export default AuthContext;

export function AuthContextProvider({ children }) {
  const state = useAuth(initState);

  return (
    <AuthContext.Provider value={state}>
      {children}

      <OverlayModal
        open={state.modal.open}
        onClose={() => {}}
      >
        <BoxLoading color="#7093e8" />
        <p className="message">{state.modal.message}</p>
      </OverlayModal>
    </AuthContext.Provider>
  )
}
