import React, { useEffect, useState } from 'react'
import Header from '../Components/Navbar/Header'
import LandingPage from '../Components/Body-section/Landing/LandingPage'
import NewsPart from '../Components/Body-section/News/NewsPart'
import DataProfile from '../Components/Body-section/DataProfileMAN1/DataProfile'
import { PrestasiMadrasah } from '../Components/Body-section/Prestasi/PrestasiMadrasah'
import PrestasiSiswa from '../Components/Body-section/Prestasi/PrestasiSiswa'
import FieldPertanyaan from '../Components/Body-section/Question/fieldPertanyaan'
import { useContext } from 'react'

// CONTEXT
import { GetTokenContext } from '../Components/Auth/GetTokenContext'

const Home = () => {
    const { token, setToken } = useContext(GetTokenContext) // CONTEXT TO SAVE / GET TOKEN
    console.log(token)

    return (
        <div>


            <Header />
            <main className='w-full h-full w-full max-w-[67.5rem] m-auto p-[16px] flex flex-col gap-[12px] pb-[60px]'>
                {token && (
                    <p>ADMIN PAGE</p>
                )}
                <div>
                    <LandingPage />
                </div>
                <div>
                    <NewsPart />
                </div>
                <div>
                    <DataProfile />
                </div>
                <div>
                    <PrestasiMadrasah />
                </div>
                <div>
                    <PrestasiSiswa />
                </div>
            </main>

            <footer className='w-full h-full py-[32px] px-[65px] flex flex-col gap-[12px] bg-[var(--card)] gap-[32px]'>
                <div className='flex flex-row items-center justify-around gap-[32px]'>
                    <div className="w-[30px] h-[30px] sm:w-[150px] sm:h-[150px]">
                        <img
                            className="w-full object-cover"
                            src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737950352/logo_1_sfgywb.png"
                            alt="Kemenag logo"
                            loading='lazy'
                        />
                    </div>
                    {/* FIELD PERTANYAAN */}
                    <div className='max-w-[40%] w-full sm:w-full h-full'>
                        <FieldPertanyaan />
                    </div>

                    {/* GOOGLE MAPS */}
                    <div className='flex h-full flex-col gap-[16px] shrink-0'>
                        <span>
                            <p>Google Maps</p>
                        </span>
                        <div className='rounded-xl'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1113.0576001949441!2d106.61144709356927!3d-6.199391899053491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fec6bb43f8e7%3A0x9e7c63c924f60d6d!2sMadrasah%20Aliyah%20Negeri%201%20Kota%20Tangerang!5e0!3m2!1sid!2sid!4v1738755034344!5m2!1sid!2sid" width="100%" height="100%" style={{ border: 0, borderRadius: '12px' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full flex items-center justify-center'>
                    <p className='font-[inter] font-regular text-sm sm:text-sm text-[var(--text-secondary)]'>© MAN 1 Kota Tangerang, All Rights Reserved</p>
                </div>


            </footer >
        </div >
    )
}

export default Home
