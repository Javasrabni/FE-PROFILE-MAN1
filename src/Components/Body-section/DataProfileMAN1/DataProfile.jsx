import React from 'react'

const DataProfile = () => {
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
                `}
            </style>

            <div>
                {/* JUDUL */}
                <div className='w-full h-[65px] flex items-center'>
                    <h1 className='text-[18px] sm:text-2xl font-bold'>Profile Sekolah</h1>
                </div>

                {/* MOTTO / DESKRIPSI PROFILE SEKOLAH */}
                <span >
                    <p className='max-w-[65%] w-full'>MAN 1 Kota Tangerang merupakan madrasah yang visi dalam rangka memiliki generasi yang berkarakter serta unggul dalam IPTEK dan IMTAQ.</p>
                </span>


                <div className='w-full h-full flex flex-row items-center gap-[16px] mt-[32px] ' >

                    {/* AKAN MENGGUNAKAN ITERASI MAPPING! */}
                    <div className='w-full h-full pt-[16px]' style={{borderTop: '1px solid var(--border)'}}>
                        <ul className='data-sekolah w-full h-full flex flex-col gap-[12px] text-sm sm:text-base text-[var(--text-secondary)] font-regular'>
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
                                    <p>Kabupaten/Kota</p>
                                    <p className='text-[var(--text-primary)]'>Kota Tangerang</p>
                                </span>
                            </li>
                            <li>
                                <span className='w-full flex flex-row items-center justify-between'>
                                    <p>Provinsi</p>
                                    <p className='text-[var(--text-primary)]'>Banten</p>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataProfile
