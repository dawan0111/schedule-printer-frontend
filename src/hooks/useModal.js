import React from 'react'

export default function useModal(initOpen = false) {
  const [state, setState] = React.useState({
    open: initOpen,
    message: '',
  })

  const handleOpen = React.useCallback((message) => {
    setState({
      open: true,
      message
    })
  }, [])

  const handleClose = React.useCallback(() => {
    setState({
      open: false,
      message: ''
    })
  }, [])

  return {
    open: state.open,
    message: state.message,
    
    handleOpen,
    handleClose
  }
}
