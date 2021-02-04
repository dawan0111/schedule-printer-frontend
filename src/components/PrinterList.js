import styled from 'styled-components'
import { List } from "../styles/ui";
import Printer from './Printer'

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;

  .column {
    width: 48.5%;
    margin-bottom: .75rem;
  }
`

export default function PrinterList({ title, printers, printerEtcProps, ...props }) {
  return (
    <List {...props}>
      <h2 className="title">{title}</h2>
      <ListWrapper className="list printerList">
        {printers.map(printer => (
          <div key={printer.id} className="column">
            <Printer
              printer={printer}
              {...printerEtcProps}
            />
          </div>
        ))}
      </ListWrapper>
    </List>
  )
}