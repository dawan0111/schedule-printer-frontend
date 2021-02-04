import styled from 'styled-components'
import moment from 'moment'

const PrinterWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: .5rem;
  border-radius: .5rem;
  border: 1px solid #ddd;

  .title {
    margin-bottom: .5rem;
    font-size: 1.2rem;
    font-weight: normal;
  }

  .lastest {
    font-size: .8rem;
    color: #333;
  }

  ${props => props.active && (`
    background: #3f62f8;
    border: none;
    color: #00cf91;
    box-shadow: 0 0 1rem lightgray;

    .title {
      font-weight: bold;
    }

    .lastest {
      color: #fff;
    }
  `)}
`

export default function Printer({ printer, onClick, loading, ...props }) {
  return (
    <PrinterWrapper
      active={printer.active}
      onClick={(e) => onClick(printer)}
      {...props}
    >
      <h2 className="title">{printer.name}</h2>
      <div className="lastest">
        {
          printer.latest ? (
            <>
              <p>최근사용자: {printer.latest.userName}</p>
              <p>
                {moment(printer.latest.startDate).format("MM-DD HH:mm")} ~
                {moment(printer.latest.endDate).format("MM-DD HH:mm")}
              </p>
            </>
          ) : (
            <>
              <p>최근사용자: 없음</p>
              <p>없음</p>
            </>
          )
        }
      </div>
    </PrinterWrapper>
  )
}