import React from 'react'
import Header from '../../Navbar/Header'
const SnpdbLanding = () => {
    return (
        <div>
            <Header />
            <div className='w-full h-full w-full max-w-[76rem] m-auto p-[16px] flex flex-col gap-[12px] pb-[60px]'>

                {/* JUMBOTRON */}
                <section class="bg-white dark:bg-gray-900 h-[90vh] flex items-center justify-center">
                    <div class="w-full h-full py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 flex flex-col justify-around items-center">
                        <div>
                            <h1 class="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-4xl dark:text-white">Selamat datang di SNPDB
                                MAN 1 Kota Tangerang</h1>
                            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Informasi SNPDB</p>
                            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                                <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                    Get started
                                    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                                <a href="#" class="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    Learn more
                                </a>
                            </div>
                        </div>

                        {/* DAFTAR JADWAL */}
                        <div>
                            <ol class="items-center sm:flex">
                                <li class="relative mb-6 sm:mb-0 w-full">
                                    <div class="flex items-center">
                                        <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                            <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                    </div>
                                    <div class="mt-3 sm:pe-8">
                                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Pengumuman Hasil Kelulusan</h3>
                                        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">5 Februari 2025</time>
                                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Pengumuman hasil kelulusan akan tersedia pada Jam 15.00 WIB</p>
                                    </div>
                                </li>
                                <li class="relative mb-6 sm:mb-0 w-full">
                                    <div class="flex items-center">
                                        <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                            <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                    </div>
                                    <div class="mt-3 sm:pe-8">
                                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Rapat Orang Tua / Wali</h3>
                                        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">7 Februari 2025</time>
                                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Rapat orang tua / wali peserta didik akan dilakukan pada Jam 09.00 WIB</p>
                                    </div>
                                </li>
                                <li class="relative mb-6 sm:mb-0 w-full">
                                    <div class="flex items-center">
                                        <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                            <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                    </div>
                                    <div class="mt-3 sm:pe-8">
                                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Daftar Ulang</h3>
                                        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">12 Februari 2025</time>
                                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">No. Kelulusan 1-144 Jam 08.00 - 11.00 WIB
                                            No. Kelulusan 145-288 Jam 13.00 - 16.00 WIB</p>
                                    </div>
                                </li>
                            </ol>
                        </div>





                    </div>
                </section>
            </div>


        </div>
    )
}

export default SnpdbLanding
