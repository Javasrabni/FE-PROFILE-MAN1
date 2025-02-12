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
import { useNavigate } from 'react-router-dom'

// ICON
import { CheckIcon, EditIcon } from '../Components/Icon/ListIcon'
import { PanelAdminContext } from '../Context/ControlPanelAdmin/PanelAdminCtx'

const Home = () => {
    const navigate = useNavigate()
    // CONTEXT TO SAVE / GET TOKEN
    const { token, setToken } = useContext(GetTokenContext)

    // Popup muncul ketika admin login <StatusAdminLogged />
    const [onLogged, setOnLogged] = useState(() => {
        const saveModal = localStorage.getItem('saveModeAdminStatus')
        return saveModal ? JSON.parse(saveModal) : true
    })
    useEffect(() => {
        localStorage.setItem('saveModeAdminStatus', JSON.stringify(onLogged))
    }, [onLogged])

    const { PanelEditPage, setPanelEditPage } = useContext(PanelAdminContext)



    return (
        <>
            {/* INFO ADMIN VIEW / ADMIN MODE / MODAL */}
            {token && onLogged && (
                <div className='w-full h-full flex items-center justify-center left-0 top-0 fixed z-50'>
                    <div class="w-full p-4 h-fit flex items-center justify-center z-[10]">
                        <div class="relative w-full max-w-md max-h-full">
                            {/* <!-- Modal content --> */}
                            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 w-full">
                                {/* <!-- Modal header --> */}
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 class="text-base font-medium text-gray-900 dark:text-white">
                                        Mode Admin
                                    </h3>
                                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal" onClick={() => setOnLogged(false)}>
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}
                                <div class="p-4 md:p-5 space-y-4 overflow-y-scroll h-full max-h-[340px]">
                                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                        Dalam mode Admin, Admin dapat melakukan dan mengatur beberapa hal, diantaranya:
                                    </p>
                                    <ul className="text-sm leading-relaxed text-gray-500 dark:text-gray-400" style={{ listStyleType: 'decimal', paddingLeft: "16px" }}>
                                        <li>Dapat melakukan perubahan atau update pada tampilan halaman (Text, Tabel, Gambar, dll)</li>
                                        <li>Pemantauan data terkait peserta SNPDB, serta mendownload semua data peserta (Terkolektif dalam bentuk 1 file Excel atau PDF)</li>
                                        <li>Membuka maupun menutup pendaftaran SNPDB, Serta dapat menetapkan kuota peserta (Jika kuota sudah terpenuhi, maka secara otomatis sistem akan menutup pendaftaran)</li>
                                        <li>Menetapkan <b>Diterima</b> dan <b>Tidak Diterimanya</b> Peserta (Akan ada halaman Dashboard, Tombol untuk menetapkannya)</li>
                                        <li>Dan Fitur lainnya</li>
                                    </ul>
                                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                        Setiap perubahan atau update diperbarui secara realtime di Database, koneksi internet yang stabil sangat dibutuhkan.<br /> <br />
                                        Jika ada kendala atau masalah teknis, hubungi ke no 0878-8852-3299 atau 0851-3541-8852 (Javas Anggaraksa Rabbani)
                                    </p>
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button data-modal-hide="small-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setOnLogged(false)}>Tutup</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full bg-[#00000080] absolute' />
                </div >
            )}

            {/* CONTROL PANEL ADMIN */}
            {token && (
                <ControlPanelAdmin />
            )}

            {/* SAVE BUTTON JIKA EDIT PAGE DI ADMIN PANEL AKTIF (TRUE) */}
            {/* {token && PanelEditPage && (
                <SaveEditPage
                    Comp1={
                        <div className='w-[50px] h-[50px] bg-[var(--warna-aksen)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--second-aksen)]'>
                            <CheckIcon sizeOnPx={16} />
                        </div>
                    }
                />
            )} */}

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

                <footer className='w-full h-full py-[32px] px-[65px] flex flex-col gap-[12px] bg-[var(--card)] gap-[32px]'>
                    <div className='flex flex-row items-center justify-around gap-[32px]'>

                        {/* LOGO MAN */}
                        {/* <div className="w-[30px] h-[30px] sm:w-[150px] sm:h-[150px]">
                            <img
                                className="w-full object-cover"
                                src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737950352/logo_1_sfgywb.png"
                                alt="Kemenag logo"
                                loading='lazy'
                            />
                        </div> */}

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
        </>

    )
}

export default Home

// Popup muncul ketika admin login <StatusAdminLogged />
export const StatusAdminLogged = ({ button }) => {
    return (
        <div className='fixed bottom-[32px] right-[32px] z-[5] w-[420px] h-fit bg-[var(--card)] rounded-xl p-[16px]' style={{ outline: '1.5px solid var(--warna-aksen)' }}>
            <span className='flex flex-col gap-[8px]'>
                <p className='font-[inter] text-sm sm:text-base font-medium'>Mode Admin</p>
                <p className='font-[inter] text-xs sm:text-sm '>Dalam mode Admin, dapat melakukan perubahan atau update pada tampilan halaman, setiap perubahan yang disimpan, akan terlihat oleh pengunjung halaman web MAN 1 Kota Tangerang.</p>
                <span>
                    {button}
                </span>
            </span>
        </div>
    )
}

// KOMPONEN ADMIN PANEL
export const ControlPanelAdmin = () => {
    // ON ACTIVE PANEL ON EDIT
    const { PanelEditPage, setPanelEditPage } = useContext(PanelAdminContext)
    const [onEditActive, setOnEditActive] = useState(() => {
        const saveState = localStorage.getItem('saveSatetOnEdit')
        return saveState ? JSON.parse(saveState) : true
    })
    useEffect(() => {
        localStorage.setItem('saveSatetOnEdit', JSON.stringify(PanelEditPage))
    }, [PanelEditPage])

    return (
        <div className='fixed z-[6] bottom-[32px] left-[50%] translate-x-[-50%] w-[420px] h-[60px] bg-[var(--bg-secondary)] p-[16px] rounded-full' style={{ border: '1px solid var(--warna-aksen)' }}>
            <div className='flex flex-row gap-[32px] justify-center items-center w-full h-full'>
                <span className={`flex flex-row gap-[16px] cursor-pointer hover:bg-[var(--border)] hover:rounded-full p-[12px] ${onEditActive && 'bg-[var(--warna-aksen)] rounded-full hover:bg-[var(--warna-aksen)]'}`} title='Edit Halaman' onClick={() => { setPanelEditPage(prev => !prev); setOnEditActive(prev => !prev) }}>
                    <EditIcon sizeOnPx={20} />
                    {/* <p>Edit Halaman</p> */}
                </span>
            </div>
        </div>
    )
}

// KOMPONEN EDIT PAGE ADMIN (ON)
export const SaveEditPage = ({ Comp1 }) => {
    return (
        <div className='fixed z-[5] bottom-[32px] right-[32px] flex flex-col items-center justify-center gap-[8px]'>
            {Comp1}
            <span>
                <p className='font-[inter] font-medium text-xs sm:text-sm select-none'>Simpan</p>
            </span>
        </div>
    )
}