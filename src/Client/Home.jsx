import React, { useEffect, useState } from 'react'
import Header from '../Components/Navbar/Header'
import LandingPage from '../Components/Body-section/Landing/LandingPage'
import NewsPart from '../Components/Body-section/News/NewsPart'
import DataProfile from '../Components/Body-section/DataProfileMAN1/DataProfile'
import { PrestasiMadrasah } from '../Components/Body-section/Prestasi/PrestasiMadrasah'
import PrestasiSiswa from '../Components/Body-section/Prestasi/PrestasiSiswa'
import FieldPertanyaan from '../Components/Body-section/Question/fieldPertanyaan'

const Home = () => {

    return (
        <div>
            <Header />
            <main className='w-full h-full w-full max-w-[67.5rem] m-auto p-[16px] flex flex-col gap-[12px] pb-[60px]'>
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

            <footer className='w-full h-full py-[32px] px-[65px] flex flex-row gap-[12px] bg-[var(--card)] flex-wrap'>
                <div className='max-w-[40%] w-full sm:w-full h-full'>
                    <FieldPertanyaan />
                </div>
            </footer>
        </div>
    )
}

export default Home
