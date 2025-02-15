import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { GetTokenContext } from '../../Auth/GetTokenContext'
import { PanelAdminContext } from '../../../Context/ControlPanelAdmin/PanelAdminCtx'

import { PencilIcon } from '../../Icon/ListIcon'


const FieldPertanyaan = () => {
    const navigate = useNavigate()
    // CONTEXT TO SAVE / GET TOKEN
    const { token, setToken } = useContext(GetTokenContext)
    const { PanelEditPage, setPanelEditPage } = useContext(PanelAdminContext)


    const [valuePertanyaan, setValuePertanyaan] = useState(null)
    const [noWa, setNoWa] = useState(6287888523299)
    async function HandlePertanyaan() {
        const pertanyaan = valuePertanyaan
        window.open(`https://wa.me/${noWa}?text=${valuePertanyaan}`)
    }

    const [onEditNoWa, setOnEditNoWa] = useState(false)
    const [popupEditNo, setPopupEditNo] = useState(false)
    return (
        <>
            {popupEditNo && (
                <>
                    <div className='fixed top-0 left-0 z-[50] w-full h-full flex items-center justify-center'>

                        <div id="authentication-modal" className=" overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div class="relative p-4 w-full max-w-md max-h-full">
                                <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                            Ganti Nomor WhatsApp
                                        </h3>
                                        <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={() => { setPopupEditNo(false); setOnEditNoWa(false)} }>
                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div class="p-4 md:p-5 gap-[16px] flex flex-col">
                                        <div>
                                            <input type="text" class="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Nomor yang dapat dihubungi" />
                                        </div>
                                        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ganti No Baru</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-full bg-[#00000080] absolute' />

                    </div>
                </>
            )}


            <div className='w-full h-full flex flex-col flex-wrap justify-between  mt-[24px] bg-[var(--card)] rounded-xl'>
                {token && PanelEditPage ? (
                    <>
                        {onEditNoWa ? (
                            <>
                                <div id="toast-warning" className="mb-[16px] flex items-center w-full p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
                                    <div class="text-sm font-normal w-full">Pesan akan terkirim ke No +{noWa} (WhatsApp)</div>
                                </div>

                                <div style={{ outline: '1px solid var(--aksen-biru)' }} className='p-[16px]'>
                                    <div className='w-full h-fit flex flex-col gap-[2px] mb-[16px] '>
                                        <h1 className='text-[18px] sm:text-lg font-bold leading-[1]'>Ada Pertanyaan?</h1>
                                        <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular font-['inter']"></p>
                                    </div>

                                    <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                            <label for="comment" class="sr-only">Your comment</label>
                                            <textarea id="comment" rows="4" class=" resize-none outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Tulis Pertanyaan disini" required onChange={(e) => setValuePertanyaan(e.target.value)}></textarea>
                                        </div>
                                        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
                                            <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[var(--text-primary)] rounded-lg dark:focus:ring-blue-900 hover:bg-blue-800" onClick={HandlePertanyaan}>
                                                Kirim Pesan
                                            </button>
                                        </div>
                                    </div>
                                    <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">Masukkan pertanyaan, seputar sekolah atau informasi seputar SNPDB MAN 1 Kota Tangerang.</p>
                                </div>
                                <div id="toast-warning" className="mt-[16px] flex items-center w-full p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
                                    <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                                        </svg>
                                        <span class="sr-only">Warning icon</span>
                                    </div>
                                    <div class="ms-3 text-sm font-normal w-full">Ketika pengunjung klik tombol "Kirim Pesan" maka akan secara otomatis diarahkan ke WhatsApp</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ outline: '1px solid var(--aksen-biru)' }} className='p-[16px]'>

                                    <div className='w-full flex flex-row gap-[16px] items-center'>
                                        <div id="toast-warning" className="mb-[16px] flex items-center w-fit p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
                                            <div class="text-sm font-normal w-full">Pesan akan terkirim ke No +{noWa} (WhatsApp)</div>
                                        </div>
                                        <div>
                                            <span className='w-full h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] rounded-lg py-[6px] px-[16px]' onClick={() => { setOnEditNoWa(prev => !prev); setPopupEditNo(true) }}>
                                                <PencilIcon
                                                    sizeOnPx={20}
                                                    color={"#005eff"} />
                                                <p className='font-[inter] text-white text-xs sm:text-sm '>Edit</p>
                                            </span>
                                        </div>
                                    </div>

                                    <div className='w-full h-fit flex flex-col gap-[2px] mb-[16px] '>
                                        <h1 className='text-[18px] sm:text-lg font-bold leading-[1]'>Ada Pertanyaan?</h1>
                                        <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular font-['inter']"></p>
                                    </div>

                                    <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                            <label for="comment" class="sr-only">Your comment</label>
                                            <textarea id="comment" rows="4" class=" resize-none outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Tulis Pertanyaan disini" required onChange={(e) => setValuePertanyaan(e.target.value)}></textarea>
                                        </div>
                                        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
                                            <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[var(--text-primary)] rounded-lg dark:focus:ring-blue-900 hover:bg-blue-800" onClick={HandlePertanyaan}>
                                                Kirim Pesan
                                            </button>
                                        </div>
                                    </div>
                                    <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">Masukkan pertanyaan, seputar sekolah atau informasi seputar SNPDB MAN 1 Kota Tangerang.</p>
                                </div>
                                <div id="toast-warning" className="mt-[16px] flex items-center w-full p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
                                    <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                                        </svg>
                                        <span class="sr-only">Warning icon</span>
                                    </div>
                                    <div class="ms-3 text-sm font-normal w-full">Ketika pengunjung klik tombol "Kirim Pesan" maka akan secara otomatis diarahkan ke WhatsApp</div>
                                </div>
                            </>
                        )}

                    </>
                ) : (
                    <>
                        <div className='w-full h-fit flex flex-col gap-[2px] mb-[16px] '>
                            <h1 className='text-[18px] sm:text-lg font-bold leading-[1]'>Ada Pertanyaan?</h1>
                            <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular font-['inter']"></p>
                        </div>
                        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label for="comment" class="sr-only">Your comment</label>
                                <textarea id="comment" rows="4" class=" resize-none outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Tulis Pertanyaan disini" required onChange={(e) => setValuePertanyaan(e.target.value)}></textarea>
                            </div>
                            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
                                <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[var(--text-primary)] rounded-lg dark:focus:ring-blue-900 hover:bg-blue-800" onClick={HandlePertanyaan}>
                                    Kirim Pesan
                                </button>
                            </div>
                        </div>
                        <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">Masukkan pertanyaan, seputar sekolah atau informasi seputar SNPDB MAN 1 Kota Tangerang.</p>
                    </>
                )}

            </div>
        </>

    )
}

export default FieldPertanyaan  
