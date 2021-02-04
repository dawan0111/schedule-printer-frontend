import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { List, Card, CardTitle, CardBody, CardHeader, FormActionControl, FormControl } from '../styles/ui'
import AuthContext from '../contexts/AuthContext'
import UIContext from '../contexts/UIContext'
import usePrinter from '../hooks/usePrinter'


const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
`
const Body = styled.div`
  flex: 1;
  overflow: auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const HomeLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const BetWeen = styled.div`
  margin-top: .5rem;
  margin-bottom: .5rem;
`

const AddPrinterButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  width: 100%;
  padding: 1rem 0;
  border: 2px dotted #ccc;
  border-radius: .5rem;
`

export default function Admin() {
  const {
    printers,
    loading,

    getPrinters,
    createPrinter,
    deletePrinter,
    updatePrinter
  } = usePrinter()
  const {
    modal,
    admins,
    userInfo,

    getAdmins,
    createAdmin,
    deleteAdmin
  } = React.useContext(AuthContext)
  const { onShow } = React.useContext(UIContext)

  const [inputId, setInputId] = React.useState('')

  React.useEffect(() => {
    if (loading.open) {
      modal.handleOpen(loading.message)
    } else {
      modal.handleClose()
    }
  }, [loading.open])

  React.useEffect(() => {
    getPrinters();
    getAdmins();
  }, [])

  const handleAddClick = async () => {
    const response = await createPrinter();

    if (response && response.code === 200) {
      onShow("생성이 완료되었습니다", "success");
    }
  }

  const handleDeleteClick = async (printerId) => {
    await deletePrinter(printerId);
  }

  const handleUpdateClick = async (printerId) => {
    const input = document.getElementById(`printerName${printerId}`);

    if (input) {
      const printerName = input.value;
      const response = await updatePrinter(printerId, {
        name: printerName
      })

      if (response && response.code === 200) {
        onShow("수정이 완료되었습니다", "success");
      }
    }
  }

  return (
    <Wrapper className="rap">
      <CardHeader>
        <CardTitle>
          <span>관리자 페이지</span>
        </CardTitle>
        <HomeLink to="/">
          <span className="material-icons">keyboard_return</span>
        </HomeLink>
      </CardHeader>
      <CardBody>
        <List>
          <h2 className="title">프린터 관리</h2>
          {printers.map(printer => (
            <div key={printer.id}>
              <FormActionControl>
                <input
                  id={`printerName${printer.id}`}
                  type="text"
                  placeholder="이름을 입력해주세요."
                  defaultValue={printer.name}
                />
                <div className="action">
                  <button
                    className="update"
                    onClick={() => handleUpdateClick(printer.id)}
                  >
                    수정
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDeleteClick(printer.id)}
                  >
                    삭제
                  </button>
                </div>
              </FormActionControl>
            </div>
          ))}
          <AddPrinterButton onClick={() => handleAddClick()}>
            <span className="material-icons">add</span>
            프린터 추가
          </AddPrinterButton>
        </List>
      </CardBody>
      <BetWeen />
      <CardBody>
        <List>
          <h2 className="title">관리자 설정</h2>
          {admins.map(admin => (
            admin.userId !== userInfo.userId && (
              <FormActionControl key={admin.userId}>
              <input
                type="text"
                placeholder="이름을 입력해주세요."
                defaultValue={admin.userId}
                readOnly
              />
              <div className="action">
                  <button
                    className="delete"
                    onClick={() => deleteAdmin(admin.userId)}
                  >
                    삭제
                  </button>
                </div>  
              
            </FormActionControl>  
            )
          ))}

          <FormControl>
            <input
              type="text"
              placeholder="학번을 입력해주세요"
              value={inputId}
              onChange={e => setInputId(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <button className="submit-button" onClick={() => {
              if (inputId) createAdmin(inputId);
            }}>추가</button>
          </FormControl>
        </List>
      </CardBody>
    </Wrapper>
  )
}
