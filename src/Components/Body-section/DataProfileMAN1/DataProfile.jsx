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
                    
                    // .fasilitas-sekolah li {
                    //     display: flex;
                    //     align-items: center;
                    //     width: 220px;
                    //     height: 110px;
                    //     background-color: var(--card);
                    //     padding: 24px;
                    //     border-radius: 12px;
                    //     font-weight: 600;
                    //     border: 1px solid var(--bg-primary);
                    //     font-size: ${isMobile ? '14px' : isDesktop && '16px'}
                    // }
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
                    <p className=' w-full text-sm sm:text-sm text-[var(--text-secondary)]'>MAN 1 Kota Tangerang
                        Madrasah Aliyah Negeri (MAN) 1 Kota Tangerang adalah lembaga pendidikan Islam formal di bawah naungan Kementerian Agama Republik Indonesia yang berkomitmen untuk berkontribusi secara signifikan bagi masyarakat sebagai penerus perjuangan dalam menyebarkan syiar Islam. Dengan memahami kebutuhan tersebut, kami berupaya memberikan pelayanan terbaik bagi siswa-siswi yang pendidikannya telah dipercayakan kepada MAN 1 Kota Tangerang.</p>
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
                    <h1 className='text-[18px] sm:text-xl font-bold'>Sarana dan Prasarana</h1>
                </div>

                <div className='fasilitas-sekolah w-full h-full flex flex-row gap-[16px] text-sm sm:text-base text-[var(--text-primary)] overflow-x-auto pb-[16px]'>
                    {/* PERPUSTAKAAN */}
                    <div className='w-fit h-fit flex flex-col gap-[12px] shrink-0'>
                        <div class="flex items-center w-[220px] h-[110px] bg-card rounded-[12px] font-semibold border border-bg-primary text-[14px] sm:text-[16px] relative">
                            <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1738244880/Perpus_byxisp.jpg" alt="Lab IPA" className='w-full h-full object-cover rounded-lg' />
                        </div>
                        <span className='flex flex-col w-full h-full font-regular text-[var(--text-primary)]'>
                            <p className='text-sm sm:text-sm font-semibold'>Perpustakaan</p>
                            {/* <p className='text-[var(--text-secondary)] font-[400] text-xs sm:text-sm'>Adzikra Library</p> */}
                        </span>
                    </div>

                    {/* LAB KOMPUTER */}
                    <div className='w-fit h-fit flex flex-col gap-[12px] shrink-0'>
                        <div class="flex items-center w-[220px] h-[110px] bg-card rounded-[12px] font-semibold border border-bg-primary text-[14px] sm:text-[16px] relative">
                            <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1738246127/LabKomputer_tadflw.jpg" alt="Lab IPA" className='w-full h-full object-cover rounded-xl' />
                        </div>
                        <span className='flex w-full h-full font-regular text-[var(--text-primary)]'>
                            <p className='text-sm sm:text-sm font-semibold'>Lab Komputer</p>
                        </span>
                    </div>

                    {/* LAB IPA */}
                    <div className='w-fit h-fit flex flex-col gap-[12px] shrink-0'>
                        <div class="flex items-center w-[220px] h-[110px] bg-card rounded-[12px] font-semibold border border-bg-primary text-[14px] sm:text-[16px] relative">
                            <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1738244881/LabIPA_k0mzbd.jpg" alt="Lab IPA" className='w-full h-full object-cover rounded-xl' />
                        </div>
                        <span className='flex w-full h-full font-regular text-[var(--text-primary)]'>
                            <p className='text-sm sm:text-sm font-semibold'>Lab IPA</p>
                        </span>
                    </div>

                    

                    {/* UKS */}
                    <div class="flex items-center justify-center w-[220px] h-[110px] bg-[var(--card)] rounded-[12px] font-semibold border border-bg-primary text-[14px] sm:text-[16px] shrink-0">
                        <span className='w-full h-full flex items-center justify-center'>
                            <p className='font-semibold text-[var(--text-primary)] text-sm'>UKS</p>
                        </span>
                    </div>

                </div>

            </div>
        </>
    )
}

export default DataProfile
