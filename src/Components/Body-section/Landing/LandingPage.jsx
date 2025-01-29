import React from 'react'

const LandingPage = () => {
    return (
        <>
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
                    <div className='flex flex-col items-center justify-center absolute left-[50%] translate-x-[-50%] z-[3] w-full h-full gap-[32px] p-[64px]'>
                        <span className='w-full h-fit flex items-center justify-center flex flex-col  gap-[8px]'>
                            <h1 className='font-black text-[var(--bg-primary)] font-2xl sm:text-4xl tracking-[-1.5px]'>Madrasah hebat, Madrasah lebih baik</h1>
                            <p className='text-center text-[var(--bg-primary)] opacity-[80%] text-sm sm:text-base max-w-[60%] font-regular'>Halaman Madrasah Aliyah Negri 1 Kota Tangerang, Informasi tentang madrasah dan penerimaan peserta didik baru.</p>
                        </span>
                        <span className='absolute bottom-[40px]'>
                            <button className='bg-[var(--warna-aksen)] px-[16px] py-[12px] rounded-xl text-[var(--bg-primary)] hover:bg-[var(--second-aksen)] font-semibold'>Pendaftaran SNPDB</button>
                        </span>

                    </div>
                    <div className='w-full h-[480px] max-w-[67.5rem]  absolute left-[50%] translate-x-[-50%]  z-[2] bg-[#00000060] rounded-xl' style={{backdropFilter: 'blur(1px)'}}/>
                    <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737952463/header-image_sephfa.webp" alt="Landing Page Man 1 Kota Tangerang" className='w-full h-full object-cover rounded-xl' draggable='false' onContextMenu={(e) => e.preventDefault()} />
                </div>

                {/* SECONDARY NAV */}
                <div className='w-full h-[60px] mt-[8px]' style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className='flex flex-row h-full w-full'>
                        <ul className='Sec-nav flex flex-row gap-[16px] sm:gap-[32px] text-sm sm:text-sm font-bold items-center shrink-0 text-[var(--text-secondary)]'>
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
