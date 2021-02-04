import React from 'react'
import { useHistory as reactUseHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useFormik } from 'formik'
import { Card, CardTitle, CardBody, FormControl, List } from '../styles/ui'
import PrinterList from '../components/PrinterList'
import UserProfile from '../components/UserProfile'
import AuthContext from '../contexts/AuthContext'
import UIContext from '../contexts/UIContext'
import usePrinter from '../hooks/usePrinter'
import useHistory from '../hooks/useHistory'

const MainWrapper = styled.div`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;

  .printerList {
    max-height: 30vh;
    overflow: auto;
  }
`
const MainUserProfile = styled(UserProfile)`
  margin-bottom: 1rem;
  background: #3f62f8;
  color: #fff;

  .info {
    margin-bottom: .25rem;
    font-size: 1rem;
  }
  .number {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .logout, .setting {
    width: 3.5rem;
    height: 3.5rem;
    border: none;
    background: rgba(255, 255, 255, .85);
    border-radius: .5rem;
  }
  .setting {
    margin-right: .5rem;
    background: rgba(255, 255, 255, .65);
  }
`

const TimeWrapper = styled.div`
  display: flex;
  margin: 0 -1rem;
  margin-bottom: 1rem;

  > div {
    width: 50%;
    padding: 0 1rem;
  }
`

const MainList = styled(List)`
  padding-top: 2rem;
  border-top: 1px solid #ededed;
`

export default function Main() {
  const [activePrinter, setActivePrinter] = React.useState(1)
  const { logout, userInfo, modal } = React.useContext(AuthContext)
  const { onShow } = React.useContext(UIContext)
  const { printers, getPrinters, loading } = usePrinter()
  const { createHistory } = useHistory();
  const history = reactUseHistory();

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      outputHour: 0,
      outputMinute: 0,
    },
    onSubmit: async (values) => {
      if (!values.name || !values.phone) {
        onShow("신상 정보를 모두 입력해주세요.", "error");
        return;
      }

      if (Number(values.outputHour) * 60 + Number(values.outputMinute) <= 0) {
        onShow("출력 걸리는 시간을 입력해주세요.", "error");
        return;
      }

      modal.handleOpen("")
      await createHistory({
        ...values,
        printerId: activePrinter
      });
      await getPrinters();
      modal.handleClose("")
      onShow("예약이 완료되었습니다.", "success");
      history.push(`/history?printerId=${activePrinter}`)
    },
  })

  const _printers = printers.map((printer) => ({
    ...printer,
    active: printer.id === activePrinter
  }))

  React.useEffect(() => {
    getPrinters();
  }, [getPrinters])

  React.useEffect(() => {
    formik.setValues({
      name: userInfo.name,
      phone: userInfo.phone,
      outputHour: '',
      outputMinute: '',
    })
  }, [userInfo])

  React.useEffect(() => {
    if (printers.length !== 0) {
      setActivePrinter(printers[0].id)
    }
  }, [printers])

  return (
    <MainWrapper className="rap">
      <MainUserProfile
        left={
        <div>
          <p className="info">로그인 정보</p>
          <p className="number">{userInfo.id}</p>
        </div>
        }
        right={
        <>
          {userInfo.isAdmin && (
            <button className="setting" onClick={() => history.push("/admin")}>
              <span className="material-icons">settings</span>
            </button>
          )}
          <button className="logout" onClick={() => logout()}>
            <span className="material-icons">power_settings_new</span>
          </button>
        </>
        }
      />
      <Card>
        <CardTitle>예약</CardTitle>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <PrinterList
              title="3D 프린터 선택"
              printers={_printers}
              printerEtcProps={{
                onClick: (printer) => { setActivePrinter(printer.id) },
                loading: loading.open,
              }}
            />

            <MainList>
              <h2 className="title">신상정보 입력</h2>
              <div className="list">
              <FormControl>
                  <label>학번</label>
                  <input
                    type="text"
                    disabled
                    defaultValue={userInfo.id}
                  />
                </FormControl>

                <FormControl>
                  <label htmlFor="name">이름</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <FormControl>
                  <label htmlFor="phone">전화번호</label>
                  <input
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </div>
            </MainList>

            <MainList>
            <h2 className="title">출력물 출력 걸리는 시간</h2>
            <div className="list">
              <TimeWrapper>
                <FormControl>
                  <label htmlFor="hour">시간</label>
                  <input
                    type="number"
                    id="hour"
                    name="outputHour"
                    value={formik.values.outputHour}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <FormControl>
                  <label htmlFor="minute">분</label>
                  <input
                    type="number"
                    id="minute"
                    name="outputMinute"
                    value={formik.values.outputMinute}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </TimeWrapper>
              <FormControl>
                <button type="submit" className="submit-button">예약</button>
              </FormControl>
            </div>
          </MainList>
          </form>
        </CardBody>
      </Card>
    </MainWrapper>
  )
}