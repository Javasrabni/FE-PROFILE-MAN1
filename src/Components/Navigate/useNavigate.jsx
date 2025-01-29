import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NavigatePage = () => {
    const navigate = useNavigate()
    
    const HandleNavigate = (navigateTo) => {
        navigate(navigateTo)
    }

    return HandleNavigate
}

export default NavigatePage
