import React, { useContext, useEffect, useState } from 'react'
import Header from '../Navbar/Header'
import { GetTokenContext } from './GetTokenContext'
import NavigatePage from '../Navigate/useNavigate'
import { useLocation } from 'react-router-dom'

import { LoadingEffect } from '../Icon/ListIcon'
import { SuccessPopup } from '../Body-section/Landing/LandingPage'

export const AuthForm = () => {
    const location = useLocation()
    const navigateTo = NavigatePage()

    const { token, setToken } = useContext(GetTokenContext) // CONTEXT TO SAVE / GET TOKEN
    const [onLoading, setOnLoading] = useState(false)
    const [onTextStatusLogin, setOnTextStatusLogin] = useState("Mohon tunggu, proses autentikasi")
    const [authStatus, setAuthStatus] = useState(false)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    // Jika sudah login, maka hidden path
    const hiddenPaths = ["/AdminAuth"];
    useEffect(() => {
        if (token && hiddenPaths.includes(location.pathname)) {
            navigateTo('/')
        }
    }, [token])

    // POST LOGIN
    async function HandleLoginAdmin() {
        setOnLoading(true)
        setAuthStatus(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/AdminAuth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({ username: username, password: password })
            })
            if (response.ok) {
                const { msg, token } = await response.json()
                setAuthStatus(false)
                setOnTextStatusLogin(msg)
                setTimeout(() => {
                    setToken(token)
                    navigateTo('/')
                }, 3000)
            } else {
                console.log('Password salah')
            }
        } catch (err) {
            console.error("Error pada sisi Server", err)
        } finally {
            setTimeout(() => {
                setOnLoading(false)
                setAuthStatus(false)
            }, 3000)
            // clearTimeout(delay)
        }
    }


    return (
        <>

            {/* POPUP LOADING */}
            {onLoading && (
                <SuccessPopup
                    heading={authStatus && <LoadingEffect text={'Loading..'} />}
                    subHeading={onTextStatusLogin}
                />
            )}

            <style>
                {`
                    .input-class input {
                        padding: 16px;
                        border-radius: 12px;
                        background-color: var(--bg-secondary);
                        border: 1px solid var(--warna-aksen);
                    }
                
                `}
            </style>
            <Header />
            <div className='flex items-center justify-center items-center w-full max-w-[80rem] m-auto h-full p-[32px]'>
                <div className='w-full h-[80svh] bg-[var(--bg-primary)] relative flex-row justify-between gap-[32px] flex items-center rounded-xl'>
                    <div className='w-full h-full flex flex-col items-center justify-center gap-[32px] p-[16px]'>
                        <span>
                            <h1 className='text-sm sm:text-xl font-bold'>LogIn Admin</h1>
                        </span>
                        {/* <div className='flex w-full flex-row justify-between items-center'>
                            <span className='w-full flex items-center justify-center'>
                                <h1 className='text-lg sm:text-xl font-bold'>Peserta</h1>
                            </span>
                            <span className='w-full flex items-center justify-center'>
                                <h1 className='text-lg sm:text-xl font-bold'>Admin/Guru</h1>
                            </span>
                        </div> */}
                        <div className='input-class flex flex-col w-full h-fit gap-[16px]'>
                            <span className='flex flex-col gap-[4px] text-sm sm:text-base'>
                                <label id='username'>Username</label>
                                <input type="text" onChange={(e) => setUsername(e.target.value)} />
                            </span>
                            <span className='flex flex-col gap-[4px] text-sm sm:text-base'>
                                <label id='password' >Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                            </span>
                            <span>
                                <button onClick={HandleLoginAdmin}>Masuk</button>
                            </span>
                        </div>
                    </div>

                    <div className='w-full h-full flex items-center justify-center' style={{ borderLeft: '1px solid var(--border)' }}>
                        <div className='w-[400px] h-[400px]'>
                            <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1738212160/Working_in_a_laboratory--5ec7b8ba01d0360014d4e576_nclftn.svg" alt="Cover" className='w-full h-full object-cover' />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
