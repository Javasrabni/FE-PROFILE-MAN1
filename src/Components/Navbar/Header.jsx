import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { HamburgerMenu } from '../Icon/ListIcon'
import NavigatePage from '../Navigate/useNavigate'

const Header = () => {
    const navigateTo = NavigatePage()

    // RESPONSIVE HEADER & HEADER FUNC
    const HeaderRef = useRef(null)
    const [HeaderWidth, setHeaderWidth] = useState(0)
    const [HeaderHeight, setHeaderHeight] = useState(0)
    useEffect(() => {
        const updateHeaderWidth = () => {
            if (HeaderRef.current) {
                setHeaderWidth(HeaderRef.current.clientWidth)
                setHeaderHeight(HeaderRef.current.clientHeight)
            }
        }
        window.addEventListener('resize', updateHeaderWidth)
        updateHeaderWidth()
        return () => {
            window.removeEventListener('resize', updateHeaderWidth)
        }
    }, [])
    {/* JIKA CLIENT WIDTH < 800 MAKA ICON, WIDTH > 800 MAKA NAV TEXT */ }
    const [opsiNavigasi, setOpsiNavigasi] = useState(false)
    useEffect(() => {
        if (HeaderWidth <= 800) {
            setOpsiNavigasi(true)
        } else {
            setOpsiNavigasi(false)
        }
    }, [HeaderWidth])
    const [openNav, setOpenNav] = useState(false)

    return (
        <>
            {/* STYLE */}
            <style>
                {`
                    .navigasi li {
                        cursor: pointer;
                        font-size: '
                    }
                `}
            </style>

            {/* HEADER */}
            <div className={`w-full h-[65px] py-[12px] ${HeaderWidth <= 640 ? 'px-[16px]' : 'px-[40px]'}  bg-[var(--bg-primary)] flex flex-row items-center justify-between sticky top-0 z-[4]`} ref={HeaderRef} style={{ borderBottom: '1px solid var(--border)' }}>

                {/* LOGO */}
                <div className="w-full h-full flex flex-row items-center gap-[16px] sm:gap-[16px]">
                    <div className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]">
                        <img
                            className="w-full object-cover"
                            src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737950352/logo_1_sfgywb.png"
                            alt="Kemenag logo"
                            loading='lazy'
                        />
                    </div>
                    <span className="flex flex-col gap-[2px] sm:gap-0 leading-none sm:leading-none">
                        <p className="text-sm sm:text-sm font-bold font-[lexend] m-0 p-0 leading-[1]">
                            MAN 1 KOTA TANGERANG
                        </p>
                        {HeaderWidth <= 640 && (
                            <p className="text-[12px] sm:text-sm font-medium font-[lexend] text-[var(--text-secondary)] m-0 p-0 leading-[1]">
                                Kota Tangerang
                            </p>
                        )}

                    </span>
                </div>


                {/* Navigasi */}
                <div className='w-fit flex items-center justify-end '>
                    {/* JIKA CLIENT WIDTH < 800 MAKA ICON, WIDTH > 800 MAKA NAV TEXT */}
                    {opsiNavigasi ? (
                        // ICON MOBILE MENU
                        <div onClick={() => setOpenNav(prev => !prev)} className='cursor-pointer'>
                            <HamburgerMenu size={'6'} />
                        </div>
                    ) : (
                        <ul className='navigasi flex flex-row items-center gap-[36px] text-sm sm:text-sm font-medium shrink-0'>
                            <li onClick={() => navigateTo('/')}>Beranda</li>
                            <li>Tentang</li>
                            <li>Kontak</li>
                            <li>Lokasi</li>
                            <li onClick={() => navigateTo('/AdminAuth')}><span className='bg-[var(--card)] px-[16px] py-[12px] rounded-xl text-[var(--text-primary)] hover:bg-[var(--second-aksen)] font-bold'>Log In</span></li>
                        </ul>
                    )}
                </div>
            </div>

            {/* SIDE PANEL NAVIGATION */}
            <div className={`w-[240px] bg-[--bg-secondary] fixed ${openNav ? 'right-[0px]' : 'right-[-260px]'} z-[3] p-[16px] flex flex-col justify-between`} style={{ transition: 'right 0.3s', display: HeaderWidth >= 800 && 'none', top: HeaderHeight, height: `calc(100% - ${HeaderHeight}px)` }}>

                <span>
                    <ul className='navigasi flex flex-col items-center gap-[36px] text-sm sm:text-base font-medium shrink-0'>
                        <li onClick={() => navigateTo('/')}>Beranda</li>
                        <li>Tentang</li>
                        <li>Kontak</li>
                        <li>Lokasi</li>
                        <li onClick={() => navigateTo('/Pendaftaran-SNPDB')}><span className='bg-[var(--warna-aksen)] px-[16px] py-[12px] rounded-lg text-white hover:bg-[green] font-semibold'>Pendaftaran SNPDB</span></li>
                    </ul>
                </span>

                <span>
                    <span className='text-sm flex flex-row items-center gap-[12px]'>
                        <i class="fa-regular fa-copyright"></i>
                        <p> MAN 1 Kota Tangerang </p>
                    </span>
                </span>
            </div>

        </>
    )
}

export default Header
