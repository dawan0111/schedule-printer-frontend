import styled from 'styled-components'

export const FormControl = styled.div`
  width: 100%;
  margin-bottom: 1em;

  label {
    display: inline-block;
    margin-bottom: .5em;
    font-weight: bold;
  }

  input {
    width: 100%;
    background: #ededed;
    border-radius: 5px;
    padding: 1em .5em;
  }

  input:disabled {
    background: #ccc;
  }

  .submit-button {
    width: 100%;
    padding: 1em 0;
    border-radius: 5px;
    color: #fff;
    background: #3f62f8;
    font-weight: bold;
  }
`

export const FormActionControl = styled(FormControl)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    flex: 1;
  }

  .action {
    display: flex;
    height: 100%;
    margin-left: .5rem;

    button {
      height: 100%;
      padding: .75rem;
      border-radius: .25rem;
    }
    button span {
      font-size: 1rem;
    }
    button + button {
      margin-left: .25rem;
    }
    button.delete {
      background: red;
      color: #fff;
    }
  }
`

export const List = styled.div`
  > .title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: .5em;
  }
`

export const Card = styled.div`
  width: 100%;
`
export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
export const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: .5em;
`

export const CardBody = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background: #fff;
`

export const Tabs = styled.div`
  display: flex;
  overflow: auto;

  + div {
    margin-top: 1rem;
  }
`
export const TabItem = styled.button`
  display: inline-block;
  border: none;
  border-radius: 300px;
  padding: .5em 1em;
  font-size: 1rem;
  margin-right: .3rem;
  background: #ededed;
  white-space: nowrap;

  ${props => props.active && (`
    background: #3f62f8;
    color: #fff;
  `)}
`
