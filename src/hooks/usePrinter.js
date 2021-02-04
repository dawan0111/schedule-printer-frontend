import React from 'react'
import API from '../api'
import useModal from './useModal'

export default function usePrinter() {
  const [printers, setPrinters] = React.useState([])
  const loading = useModal()
  const { handleOpen, handleClose } = loading;

  const getPrinters = React.useCallback(async () => {
    handleOpen("");
    const printers = await API.getPrinters();
    setPrinters(printers.data.printers)
    handleClose();
  }, [])

  const createPrinter = React.useCallback(async (printer = {}) => {
    handleOpen();
    const response = await API.createPrinter(printer);

    if (response.code === 200) {
      await getPrinters()
    }
    handleClose()

    return response;
  }, [])

  const updatePrinter = React.useCallback(async (printerId, printer) => {
    handleOpen();
    const response = await API.updatePrinter(printerId, printer);
    if (response.code === 200) {
      await getPrinters()
    }
    handleClose()

    return response;
  }, [])

  const deletePrinter = React.useCallback(async (printerId, printer) => {
    handleOpen();
    const response = await API.deletePrinter(printerId, printer);
    if (response.code === 200) {
      await getPrinters()
    }
    handleClose()

    return response;
  }, [])

  return {
    printers,
    loading,

    getPrinters,
    createPrinter,
    updatePrinter,
    deletePrinter
  }
}
