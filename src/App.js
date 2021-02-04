import React from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import AuthContext from './contexts/AuthContext'

import BottomMenu from './components/BottomMenu';

import Login from './pages/Login';
import Main from './pages/Main'
import History from './pages/History'
import Ranking from './pages/Ranking'
import Admin from './pages/Admin';

import './App.css';


const BottomMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  background: #ededed;
  overflow: auto;
  overflow-x: hidden;
`

function UserAuth({ children, isAdmin }) {
  const history = useHistory()
  const { setUserAuth, userInfo } = React.useContext(AuthContext)

  React.useEffect(() => {
    (async () => {
      const userInfo = await setUserAuth();
      
      if (!userInfo || userInfo.userId === null) {
        history.push("/login")
        return;
      }
      
      if (userInfo.isAdmin === false && isAdmin === true) {
        history.push("/")
        return;
      }
    })();
  }, [])

  if (!userInfo.id) return null;

  return (
    <>{children}</>
  )
}

function App() {
  const location = useLocation()

  return (
    <Switch>
      <Route path={["/", "/ranking", "/history"]} exact>
        <UserAuth>
          <BottomMenuWrapper>
            <ContentWrapper>
              <Route path="/" exact><Main /></Route>
              <Route path="/ranking" exact><Ranking /></Route>
              <Route path="/history" exact><History /></Route>
            </ContentWrapper>
            <BottomMenu />
          </BottomMenuWrapper>
        </UserAuth>
      </Route>
      <Route path="/login" exact><Login /></Route>

      <UserAuth isAdmin>
        <Route path="/admin" exact><Admin /></Route>
      </UserAuth>
    </Switch>
  );
}

export default App;
