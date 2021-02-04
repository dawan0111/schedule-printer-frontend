import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import routes from '../data/bottomMenu.json'


const Wrapper = styled.div`
  display: flex;
  background: #fff;
  padding-left: 1rem;
  padding-right: 1rem;
  border-top: 1px solid #ededed;
`
const Item = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: .5rem 1rem;
  text-align: center;
  text-decoration: none;
  color: inherit;

  .material-icons {
    font-size: 1.5rem;
    margin-bottom: .5rem;
  }
`

export default function BottomMenu() {
  
  return (
    <Wrapper className="rap">
      {routes.map(route => (
        <Item exact to={route.link} key={route.id} activeStyle={{
          color: "#3f62f8"
        }}>
          <span className="material-icons">{route.icon}</span>
          {route.name}
        </Item>
      ))}
    </Wrapper>
  )
}
