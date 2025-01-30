import React from 'react'
import Header from '../Navbar/Header'

export const AuthForm = () => {
    return (
        <>
            <Header />
            <div className='flex items-center justify-center w-full h-full p-[32px]'>
                <div className='w-full'>
                    <span className='w-full flex items-center justify-center'>
                        <h1 className='text-lg sm:text-xl font-bold'>Peserta</h1>
                    </span>
                </div>
                <div className='w-full'>
                    <span className='w-full flex items-center justify-center'>
                        <h1 className='text-lg sm:text-xl font-bold'>Admin/Guru</h1>
                    </span>
                </div>
            </div>

        </>
    )
}
