import React from 'react'
import API from '../api'

export default function useHistory() {
  const [history, setHistory] = React.useState({
    fetching: false,
    data: []
  })
  const [ranking, setRanking] = React.useState({
    fetching: false,
    data: []
  })
  
  const getRanking = React.useCallback(async () => {
    setRanking({
      ...ranking,
      fetch: true,
    })

    const response = await API.getRanking();
    setRanking({
      data: response.data.historys,
      fetching: false,
    })
  }, [])

  const getHistory = React.useCallback(async (printerId) => {
    setHistory(history => ({
      ...history,
      fetching: true,
    }))

    const response = await API.getHistory(printerId);
    
    setHistory({
      data: response.data.historys,
      fetching: false,
    })
  }, [])

  const createHistory = React.useCallback(async (resInfo) => {
    const response = await API.printerReservation(resInfo);
    return response;
  }, [])

  return {
    history,
    ranking,

    setHistory,
    getRanking,
    getHistory,
    createHistory,
  }
}
