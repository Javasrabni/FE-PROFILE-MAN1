import React from 'react'
import { useMediaQuery } from 'react-responsive';

const DataProfile = () => {
    const isMobile = useMediaQuery({ maxWidth: 640 })
    const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1079 });
    const isDesktop = useMediaQuery({ minWidth: 1080 });

    return (
        <>
            <style>
                {`
                    .data-sekolah li {
                        display: flex;
                        align-items: center;
                        line-height: 21px;
                        height: 37px;
                    }
                    
                    .fasilitas-sekolah li {
                        display: flex;
                        align-items: center;
                        width: 220px;
                        height: 110px;
                        background-color: var(--card);
                        padding: 24px;
                        border-radius: 12px;
                        font-weight: 600;
                        border: 1px solid var(--bg-primary);
                        font-size: ${isMobile ? '14px' : isDesktop && '16px'}
                    }
                `}
            </style>

            {/* PROFILE SEKOLAH */}
            <div>
                {/* JUDUL */}
                <div className='w-full h-[60px] flex items-center'>
                    <h1 className='text-[18px] sm:text-xl font-bold'>Profile Madrasah</h1>
                </div>

                {/* MOTTO / DESKRIPSI PROFILE SEKOLAH */}
                <span >
                    <p className='max-w-[65%] w-full text-sm sm:text-sm'>MAN 1 Kota Tangerang merupakan madrasah yang visi dalam rangka memiliki generasi yang berkarakter serta unggul dalam IPTEK dan IMTAQ.</p>
                </span>


                <div className='w-full h-full flex flex-row items-center gap-[16px] mt-[32px] ' >

                    {/* AKAN MENGGUNAKAN ITERASI MAPPING! */}
                    <div className='w-full h-full pt-[16px]' style={{ borderTop: '1px solid var(--border)' }}>
                        <ul className='data-sekolah w-full h-full flex flex-col gap-[12px] text-sm sm:text-sm text-[var(--text-secondary)] font-regular'>
                            <li>
                                <span className='w-full flex flex-row items-center justify-between'>
                                    <p>Akreditasi</p>
                                    <p className='text-[var(--text-primary)] font-bold'>A</p>
                                </span>
                            </li>
                            <li>
                                <span className='w-full flex flex-row items-center justify-between'>
                                    <p>Alamat</p>
                                    <p className='text-[var(--text-primary)]'><i class="fa-regular fa-copy" onClick={() => alert('Tersalin!')}></i> Jl. Lamda Raya No. 1 RT. 005 RW. 05 Cimone Permai</p>
                                </span>
                            </li>
                            <li>
                                <span className='w-full flex flex-row items-center justify-between'>
                                    <p>NSM (Nomor Statistik Madrasah)</p>
                                    <p className='text-[var(--text-primary)]'><i class="fa-regular fa-copy" onClick={() => alert('Tersalin!')}></i> 131136710001</p>
                                </span>
                            </li>
                            <li>
                                <span className='w-full flex flex-row items-center justify-between'>
                                    <p>NPSN (Nomor Pokok Sekolah Nasional)</p>
                                    <p className='text-[var(--text-primary)]'><i class="fa-regular fa-copy" onClick={() => alert('Tersalin!')}></i> 20623295</p>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* DATA SEKOLAH */}
            <div className='my-[24px]'>
                {/* JUDUL */}
                <div className='w-full h-[60px] flex items-center'>
                    <h1 className='text-[18px] sm:text-xl font-bold'>Fasilitas Madrasah</h1>
                </div>

                <div>
                    <ul className='fasilitas-sekolah w-full h-full flex flex-row gap-[16px] text-sm sm:text-base text-[var(--text-primary)]'>
                        <li>
                            <span>
                                <p>Perpustakaan</p>
                                <p className='text-[var(--text-secondary)] font-[400] text-xs sm:text-sm'>Adzikra Library</p>
                            </span>
                        </li>
                        <li>Lab Komputer</li>
                        <li>Lab IPA</li>
                        <li>UKS</li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default DataProfile
