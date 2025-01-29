import React from 'react'

const LandingPage = () => {
    return (
        <>
            <style>
                {`
                    .Sec-nav li {
                        position: relative;
                    }

                    .Sec-nav li::after {
                        content: '';
                        display: flex;
                        margin: 12px auto;
                        width: 100%;
                        height: 2px;
                        position: absolute;
                        bottom: -32px;
                        background-color: var(--border);
                        transform: translateX(-50%);
                        left: 50%;
                        border-radius: 12px 12px 0px 0px;

                    }
                `}
            </style>

            <div className='w-full h-full pt-[32px] m-auto'>

                {/* IMAGE / VIDEO LANDING PAGE */}
                <div className='w-full h-[480px]'>
                    {/* <div className='w-full h-[480px] max-w-[67.5rem]  absolute left-[50%] translate-x-[-50%]  z-[2] bg-[#00000070] rounded-xl' /> */}
                    <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737952463/header-image_sephfa.webp" alt="Landing Page Man 1 Kota Tangerang" className='w-full h-full object-cover rounded-xl' draggable='false' onContextMenu={(e) => e.preventDefault()} />
                </div>

                {/* SECONDARY NAV */}
                <div className='w-full h-[65px] mt-[16px]' style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className='flex flex-row h-full w-full py-[16px]'>
                        <ul className='Sec-nav flex flex-row gap-[16px] sm:gap-[32px] text-sm sm:text-base font-bold items-center shrink-0'>
                            <li>Overview</li>
                            <li>Berita</li>
                            <li>Data Sekolah</li>
                        </ul>
                    </div>

                </div>
            </div>

        </>
    )
}


export default LandingPage
