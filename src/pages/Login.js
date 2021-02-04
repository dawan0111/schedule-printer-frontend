import React from 'react'
import { useFormik } from 'formik'

import { FormControl } from '../styles/ui'
import styled from 'styled-components'
import AuthContext from '../contexts/AuthContext'

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #ededed;
  overflow: hidden;
`

const LoginCard = styled.div`
  width: 100%;
  padding: 5%;
  background: #fff;
  border-radius: 5px;
`

const Header = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`

const SubTitle = styled.h1`
  font-size: 1rem;
  font-weight: bold;
`

export default function Login() {
  const { login } = React.useContext(AuthContext)
  const formik = useFormik({
    initialValues: {
      number: '',
      password: '',
    },
    onSubmit: values => {
      login(values.number, values.password)
    },
  })

  return (
    <LoginWrapper className="rap">
      <LoginCard>
        <Header>
          <Title>한양대학교ERCIA</Title>
          <SubTitle>3D 프린터 예약</SubTitle>
        </Header>

        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <label htmlFor="id">학번</label>
            <input
              type="number"
              id="id"
              placeholder="학번을 입력해주세요."
              name="number"
              onChange={formik.handleChange}
              value={formik.values.number}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호을 입력해주세요."
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </FormControl>
          <FormControl>
            <button className="submit-button" type="submit">로그인</button>
          </FormControl>
        </form>
      </LoginCard>
    </LoginWrapper>
  )
}