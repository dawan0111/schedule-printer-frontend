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
    setTimeout(() => {
      setState({
        open: false,
        message: ''
      })
    }, 500)
  }, [])

  return {
    open: state.open,
    message: state.message,
    
    handleOpen,
    handleClose
  }
}
