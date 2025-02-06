import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const PanelAdminContext = createContext()
export const PanelAdminProvider = ({ children }) => {
    // STATE UNTUK EDIT PAGE (CONTROL PANEL ADMIN)
    const [PanelEditPage, setPanelEditPage] = useState(() => {
        const saveStatus = localStorage.getItem('savePanelEditPageStatus')
        return saveStatus ? JSON.parse(saveStatus) : false
    })
    useEffect(() => {
        localStorage.setItem('savePanelEditPageStatus', JSON.stringify(PanelEditPage))
    }, [PanelEditPage])
    
    return (
        <PanelAdminContext.Provider value={{ PanelEditPage, setPanelEditPage }}>
            {children}
        </PanelAdminContext.Provider>
    )
}

