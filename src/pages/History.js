import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import HistoryItem from '../components/History'
import Tabs from '../components/Tabs'
import usePrinter from '../hooks/usePrinter'
import useHistory from '../hooks/useHistory'
import useTabs from '../hooks/useTabs'
import { List, Card, CardTitle } from '../styles/ui'
import AuthContext from '../contexts/AuthContext'

const ItemWrapper = styled.div`
  margin-bottom: 1rem;
`

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Header = styled.div`
  position: relative;
  z-index: 3;
  background: #fff;
  padding-top: 1rem;
  padding-bottom: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, .25);
`
const Body = styled.div`
  flex: 1;
  overflow: auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  color: #999;

  .material-icons {
    font-size: 6rem;
  }

  div {
    margin-top: 1rem;
    font-size: 1.5rem;
  }
`

export default function History() {
  const { history, getHistory } = useHistory();
  const { printers, getPrinters, loading } = usePrinter()
  const { active, setActive, handleTabClick } = useTabs(null)
  const { modal } = React.useContext(AuthContext)
  const location = useLocation();

  const printerTabs = printers.map(printer => ({
    id: printer.id,
    name: printer.name,
  }))

  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const printerId = query.get("printerId");

    if (printerId) {
      setActive(Number(printerId));
    }
    getPrinters();
  }, [getPrinters])

  React.useEffect(() => {
    if (active) getHistory(active)
  }, [active, getHistory])

  React.useEffect(() => {
    if (printers.length !== 0 && active === null) {
      setActive(printers[0].id)
    }
  }, [printers, handleTabClick])

  React.useEffect(() => {
    if (loading.open || history.fetching) {
      modal.handleOpen()
    } else if (!(loading.open && history.fetching)) {
      modal.handleClose()
    }
  }, [loading.open, history.fetching])

  return (
    <Wrapper>
      <Header className="rap">
        <CardTitle>사용내역</CardTitle>
        <Tabs
          tabs={printerTabs}
          onActive={handleTabClick}
          active={active}
        />
      </Header>
      <Body>
        <List className="rap">
          <div className="list">
            {history.data.map((data) => (
              <ItemWrapper key={data.id}>
                <HistoryItem history={data} />
              </ItemWrapper>
            ))}

            {history.data.length === 0 && (
              <Empty>
                <span className="material-icons">notifications_none</span>
                <div>사용 내역이 없습니다.</div>
              </Empty>
            )}
          </div>
        </List>
      </Body>
    </Wrapper>
  )
}