import React from 'react'

export const HamburgerMenu = ({ size }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-${size}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    )
}

export const EditIcon = ({ sizeOnPx, color }) => {
    return (
        <i class="fa-regular fa-pen-to-square" style={{ fontSize: `${sizeOnPx}px`, color: `${color}` }}></i>
    )
}

export const CheckIcon = ({ sizeOnPx, color }) => {
    return (
        <i class="fa-solid fa-check" style={{ fontSize: `${sizeOnPx}px`, color: `${color}` }}></i>
    )
}

export const PencilIcon = ({ sizeOnPx, color }) => {
    return (
        <div className='relative flex items-center justify-center'>
            <div className='w-[14px] h-[14px] bg-white absolute z-[1]' />
            <i className="fa-solid fa-square-pen z-[2] relative" style={{ fontSize: `${sizeOnPx}px`, color: `${color}` }}></i>
        </div>
    )
}