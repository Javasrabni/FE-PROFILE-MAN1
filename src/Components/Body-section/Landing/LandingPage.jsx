import React, { useEffect, useState } from 'react'
import NavigatePage from '../../Navigate/useNavigate'
import { useContext } from 'react'
import { GetTokenContext } from '../../Auth/GetTokenContext'
import { PanelAdminContext } from '../../../Context/ControlPanelAdmin/PanelAdminCtx'
import { CheckIcon, PencilIcon, LoadingEffect } from '../../Icon/ListIcon'
import { motion } from 'framer-motion'


const LandingPage = () => {
    const navigateTo = NavigatePage()
    // CONTEXT TO SAVE / GET TOKEN
    const { token, setToken } = useContext(GetTokenContext)
    // PANEL EDIT CONTEXT (ON)
    const { PanelEditPage, setPanelEditPage } = useContext(PanelAdminContext)

    // API LANDING PAGE TEXT FROM DB (DYNAMIC)
    useEffect(() => {
        const GetLandingPageTXT = async () => {
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/Lptxt`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.ok) {
                const data = await response.json()
                setSloganHeadingLanding(data[0].headline)
                setSubHeadlineLanding(data[0].subHeadline)
                setButtonLanding(data[0].buttonLanding)
            }
        }
        GetLandingPageTXT()
    }, [])

    // API CRUD
    const [onSuccesEdit, setOnSuccesEdit] = useState(null)
    const [onSuccesEditState, setOnSuccesEditState] = useState(false)
    useEffect(() => {
        if (onSuccesEditState) {
            const delay = setTimeout(() => {
                setOnSuccesEditState(false)
            }, 6000)
            return () => clearTimeout(delay)
        }
    }, [onSuccesEditState]) // AUTO CLOSE POPUP SUKSES UPDATE IN 6s
    const [onLoading, setOnLoading] = useState(false) // LOADING STATE

    // HEADLINE LANDING
    const [onEditHeadline, setOnEditHeadline] = useState(false)
    const [sloganHeadingLanding, setSloganHeadingLanding] = useState([])
    async function HandleSaveHeadline() {
        setOnEditHeadline(prev => !prev)
        try {
            setOnLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/Lptxt`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ headline: sloganHeadingLanding })
            })
            if (response.ok) {
                const data = await response.json()
                setOnSuccesEdit(data.msg)
                setOnSuccesEditState(true)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setOnLoading(false)
        }
    }

    // SUBHEADLINE LANDING
    const [onEditSubHeadline, setOnEditSubHeadline] = useState(false)
    const [subheadlineLanding, setSubHeadlineLanding] = useState([])
    async function HandleSaveSubheadline() {
        setOnEditSubHeadline(prev => !prev)
        try {
            setOnLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/Lptxt`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ subHeadline: subheadlineLanding })
            })
            if (response.ok) {
                const data = await response.json()
                setOnSuccesEdit(data.msg)
                setOnSuccesEditState(true)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setOnLoading(false)
        }
    }

    // BUTTON LANDING
    const [onEditButtonLanding, setOnEditButtonLanding] = useState(false)
    const [buttonLanding, setButtonLanding] = useState([])
    async function HandleSaveButtonLanding() {
        setOnEditButtonLanding(prev => !prev)
        try {
            setOnLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/Lptxt`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ buttonLanding: buttonLanding })
            })
            if (response.ok) {
                const data = await response.json()
                setOnSuccesEdit(data.msg)
                setOnSuccesEditState(true)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setOnLoading(false)
        }
    }

    return (
        <>
            {/* POPUP LOADING */}
            {onLoading && (
                <SuccessPopup
                    heading={<LoadingEffect text={'Loading..'} />}
                    subHeading={"Data sedang dikirim ke Database. mohon tunggu, pastikan koneksi internet stabil"}
                />
            )}

            {/* POPUP SUKSES UPDATE */}
            {onSuccesEditState && (
                <SuccessPopup
                    autoClose={true}
                    heading={"Berhasil Update!"}
                    subHeading={onSuccesEdit}
                    button={<button className='bg-[var(--text-primary)] w-fit h-fit py-[6px] px-[16px] rounded-lg text-white text-xs sm:text-sm' onClick={() => setOnSuccesEditState(false)}>Tutup</button>}

                />
            )}


            <style>
                {`
                    .Sec-nav li {
                        position: relative;
                    }

                    // .Sec-nav li::after {
                    //     content: '';
                    //     display: flex;
                    //     margin: 12px auto;
                    //     width: 100%;
                    //     height: 2px;
                    //     position: absolute;
                    //     bottom: -32px;
                    //     background-color: var(--border);
                    //     transform: translateX(-50%);
                    //     left: 50%;
                    //     border-radius: 12px 12px 0px 0px;

                    // }
                `}
            </style>

            <div className='w-full h-full pt-[32px] m-auto'>

                {/* IMAGE / VIDEO LANDING PAGE */}
                <div className='w-full h-[480px] flex items-center relative'>
                    <div className='flex flex-col items-center justify-center absolute bottom-[0px] left-[50%] translate-x-[-50%] z-[3] w-full h-full gap-[32px] p-[40px]'>

                        {/* HEADLINE */}
                        <span className='w-full h-fit flex items-center text-center flex-col  gap-[8px]'>
                            {token && PanelEditPage ? (
                                <span className='flex flex-row items-center gap-[16px] w-full'>
                                    {onEditHeadline ? (
                                        <div className='w-full h-full relative flex flex-row items-center justify-between'>
                                            <input className='bg-transparent outline-none border-none  font-black text-[var(--bg-primary)] font-2xl sm:text-4xl tracking-[-1.5px]' type="text" value={sloganHeadingLanding} onChange={(e) => setSloganHeadingLanding(e.target.value)} style={{
                                                outline: '1px solid var(--warna-aksen)', textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                            }} />

                                            <div className=' w-fit flex flex-row gap-[16px] items-center '>
                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] py-[6px] px-[16px] rounded-lg ' onClick={HandleSaveHeadline}>
                                                    <CheckIcon
                                                        sizeOnPx={20}
                                                        color={"#005eff"} />
                                                    <p className='font-[inter] text-white text-xs sm:text-sm '>Simpan</p>
                                                </span>
                                                <p className='text-xs sm:text-sm text-white cursor-pointer underline' onClick={() => setOnEditHeadline(false)}>Cancle</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='w-full h-full relative flex items-center justify-center'>
                                            <h1 className='font-black text-[var(--bg-primary)] font-2xl sm:text-4xl tracking-[-1.5px]' style={{ outline: '1px solid #005eff' }}>{sloganHeadingLanding}</h1>

                                            <div className='absolute right-0'>
                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] rounded-lg py-[6px] px-[16px]' onClick={() => setOnEditHeadline(prev => !prev)}>
                                                    <PencilIcon
                                                        sizeOnPx={20}
                                                        color={"#005eff"} />
                                                    <p className='font-[inter] text-white text-xs sm:text-sm '>Edit</p>
                                                </span>
                                            </div>
                                        </div>

                                    )}

                                </span>
                            ) : (
                                <>
                                    <h1 className='font-black text-[var(--bg-primary)] font-2xl sm:text-4xl tracking-[-1.5px]'>{sloganHeadingLanding}</h1>

                                </>
                            )}

                            {/* SUBHEADLINE */}
                            {token && PanelEditPage ? (
                                <span className='flex flex-row items-center gap-[16px] w-full'>
                                    {onEditSubHeadline ? (
                                        <div className='w-full h-full relative flex flex-row items-center justify-between'>
                                            <input className='w-full bg-transparent outline-none border-none text-[var(--bg-primary)] opacity-[80%] text-sm sm:text-base max-w-[60%] font-regular resize-none' type="text" value={subheadlineLanding} onChange={(e) => setSubHeadlineLanding(e.target.value)} style={{
                                                outline: '1px solid var(--warna-aksen)', textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                            }} />

                                            <div className=' w-fit flex flex-row gap-[16px] items-center '>
                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] py-[6px] px-[16px] rounded-lg relative' onClick={HandleSaveSubheadline}>
                                                    <CheckIcon
                                                        sizeOnPx={20}
                                                        color={"#005eff"} />
                                                    <p className='font-[inter] text-white text-xs sm:text-sm '>Simpan</p>
                                                </span>
                                                <p className='text-xs sm:text-sm text-white cursor-pointer underline' onClick={() => setOnEditSubHeadline(false)}>Cancle</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='w-full h-full relative flex items-center justify-center'>
                                            <p className='text-[var(--bg-primary)] opacity-[80%] text-sm sm:text-base max-w-[60%] font-regular text-center ' style={{ outline: '1px solid #005eff' }}>{subheadlineLanding}</p>

                                            <div className='absolute right-0'>
                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] rounded-lg py-[6px] px-[16px]' onClick={() => setOnEditSubHeadline(prev => !prev)}>
                                                    <PencilIcon
                                                        sizeOnPx={20}
                                                        color={"#005eff"} />
                                                    <p className='font-[inter] text-white text-xs sm:text-sm '>Edit</p>
                                                </span>
                                            </div>
                                        </div>

                                    )}

                                </span>
                            ) : (
                                <p className='text-[var(--bg-primary)] opacity-[80%] text-sm sm:text-base max-w-[60%] font-regular'>{subheadlineLanding}</p>
                            )}
                        </span>

                        {/* BUTTON LANDING */}
                        {token && PanelEditPage ? (
                            <span className='flex flex-row items-center gap-[16px] w-full'>
                                {onEditButtonLanding ? (
                                    <div className='w-full h-full relative flex flex-row items-center justify-between'>
                                        <span className='py-[6px] px-[16px]' style={{ outline: '1px solid var(--warna-aksen)' }}>
                                            <input className='bg-[var(--warna-aksen)] px-[16px] py-[12px] rounded-xl text-[var(--bg-primary)] hover:bg-[var(--second-aksen)] font-semibold outline-none border-none' autoFocus type="text" value={buttonLanding} onChange={(e) => setButtonLanding(e.target.value)} />
                                        </span>

                                        <div className=' w-fit flex flex-row gap-[16px] items-center '>
                                            <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] py-[6px] px-[16px] rounded-lg relative' onClick={HandleSaveButtonLanding}>
                                                <CheckIcon
                                                    sizeOnPx={20}
                                                    color={"#005eff"} />
                                                <p className='font-[inter] text-white text-xs sm:text-sm '>Simpan</p>
                                            </span>
                                            <p className='text-xs sm:text-sm text-white cursor-pointer underline' onClick={() => setOnEditButtonLanding(false)}>Cancle</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='w-full h-full relative flex flex-row items-center justify-center'>
                                        <span className='px-[16px] py-[6px]' style={{ outline: '1px solid #005eff' }}>
                                            <button className='bg-[var(--warna-aksen)] px-[16px] py-[12px] rounded-xl text-[var(--bg-primary)] hover:bg-[var(--second-aksen)] font-semibold' onClick={() => navigateTo('/userRegister')} >{buttonLanding}</button>

                                        </span>


                                        <div className='absolute right-0'>
                                            <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] rounded-lg py-[6px] px-[16px]' onClick={() => setOnEditButtonLanding(prev => !prev)}>
                                                <PencilIcon
                                                    sizeOnPx={20}
                                                    color={"#005eff"} />
                                                <p className='font-[inter] text-white text-xs sm:text-sm '>Edit</p>
                                            </span>
                                        </div>
                                    </div>
                                )}


                            </span>
                        ) : (
                            <button className='bg-[var(--warna-aksen)] px-[16px] py-[12px] rounded-xl text-[var(--bg-primary)] hover:bg-[var(--second-aksen)] font-semibold' onClick={() => navigateTo('/userRegister')}>{buttonLanding}</button>

                        )}

                    </div>
                    <div className='w-full h-[480px] max-w-[67.5rem]  absolute left-[50%] translate-x-[-50%]  z-[2] bg-[#00000050] rounded-xl' style={{ backdropFilter: 'blur(0px)' }} />
                    <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737952463/header-image_sephfa.webp" alt="Landing Page Man 1 Kota Tangerang" className='w-full h-full object-cover rounded-xl' draggable='false' onContextMenu={(e) => e.preventDefault()} />
                </div>

                {/* SECONDARY NAV */}
                <div className='w-full h-[60px] mt-[8px] overflow-x-auto' style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className='flex flex-row h-full w-full'>
                        <ul className='Sec-nav flex flex-row gap-[16px] sm:gap-[32px] text-sm sm:text-sm font-bold items-center shrink-0 text-[var(--text-secondary)]'>
                            <li>Overview</li>
                            <li>Berita</li>
                            <li>Data MAN 1</li>
                            <li>Fasilitas</li>
                        </ul>
                    </div>

                </div>
            </div >

        </>
    )
}


export default LandingPage


export const SuccessPopup = ({ heading, subHeading, button, autoClose }) => {
    const [time, setTime] = useState(6)
    useEffect(() => {
        const interval = setInterval(() => setTime(prev => prev - 1), 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}  // Muncul dari kanan
            animate={{ x: 0, opacity: 1 }}    // Bergerak ke kiri
            exit={{ x: 100, opacity: 0 }}     // Hilang ke kanan
            transition={{
                duration: 0.4, // Lebih lama supaya halus
                ease: "easeInOut", // Menambahkan kelancaran
                type: "spring", // Menambahkan efek pantulan
                stiffness: 150, // Menentukan kekuatan pantulan
            }} // Efek lebih smooth
            className='fixed bottom-[64px] right-[32px] z-[52] w-[420px] h-fit bg-[var(--card)] rounded-xl p-[16px]'
            style={{ outline: '1.5px solid var(--warna-aksen)' }}
        >
            <span className='flex flex-col gap-[8px]'>
                <p className='font-[inter] text-sm sm:text-base font-medium'>{heading}</p>
                <p className='font-[inter] text-xs sm:text-sm '>{subHeading}</p>
                <span className='flex flex-row gap-[16px] items-center'>
                    <span>{button}</span>
                    {autoClose && (
                        <p className='font-[inter] text-xs sm:text-sm text-[var(--text-secondary)]'>Tertutup dalam {time}</p>
                    )}
                </span>
            </span>
        </motion.div>
    )
}