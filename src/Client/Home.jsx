import React, { useEffect, useState } from 'react'
import Header from '../Components/Navbar/Header'
import LandingPage from '../Components/Body-section/Landing/LandingPage'
import NewsPart from '../Components/Body-section/News/NewsPart'
import DataProfile from '../Components/Body-section/DataProfileMAN1/DataProfile'
import { PrestasiMadrasah } from '../Components/Body-section/Prestasi/PrestasiMadrasah'
import PrestasiSiswa from '../Components/Body-section/Prestasi/PrestasiSiswa'

const Home = () => {

    return (
        <div>
            <Header />
            <main className='w-full h-[200vh] w-full max-w-[67.5rem] m-auto p-[16px] flex flex-col gap-[12px] mb-[60px]'>
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
        </div>
    )
}

export default Home
