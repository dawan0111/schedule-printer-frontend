import React from 'react'

export default function useTabs(initActive = null) {
  const [active, setActive] = React.useState(initActive)

  const handleTabClick = React.useCallback((data) => {
    setActive(data.id)
  }, [setActive])

  return {
    active,

    setActive,
    handleTabClick
  }
}