import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const GetTokenContext = createContext()

export const GetTokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const saveToken = localStorage.getItem('saveToken')
    return saveToken ? JSON.parse(saveToken) : null
  })

  useEffect(() => {
    localStorage.setItem('saveToken', JSON.stringify(token))
  }, [token])

  return (
    <GetTokenContext.Provider value={{ token, setToken }}>
      {children}
    </GetTokenContext.Provider>
  )
}

