import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Card, CardBody } from '../styles/ui'

const Wrapper = styled.div`
  width: 100%;

  .name {
    margin-bottom: .75rem;
    font-size: 1.1rem;
    font-weight: bold;
  }
  
  .phone {
    margin-bottom: .25rem;
  }

  .phone, .date {
    display: flex;
    align-items: center;
  }

  .material-icons {
    margin-right: .5rem;
    font-size: 1.2rem;
  }
`

export default function History({ history }) {
  return (
    <Card>
      <CardBody>
        <Wrapper>
          <p className="name">{history.userId} ({history.userName})</p>
          <p className="phone">
            <span className="material-icons">call</span>
            {history.userPhone.replace( /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3" )}
          </p>
          <p className="date">
            <span className="material-icons">schedule</span>
            {moment(history.startDate).format("MM-DD HH:mm")} ~ {moment(history.endDate).format("MM-DD HH:mm")}
          </p>
        </Wrapper>
      </CardBody>
    </Card>
  )
}
