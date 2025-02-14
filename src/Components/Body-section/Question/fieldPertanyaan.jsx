import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { GetTokenContext } from '../../Auth/GetTokenContext'
import { PanelAdminContext } from '../../../Context/ControlPanelAdmin/PanelAdminCtx'



const FieldPertanyaan = () => {
    const navigate = useNavigate()
    // CONTEXT TO SAVE / GET TOKEN
    const { token, setToken } = useContext(GetTokenContext)
    const { PanelEditPage, setPanelEditPage } = useContext(PanelAdminContext)
    const [onEditQuestion, setOnEditQuestion] = useState(false)


    const [valuePertanyaan, setValuePertanyaan] = useState(null)
    const [noWa, setNoWa] = useState(6287888523299)
    async function HandlePertanyaan() {
        const pertanyaan = valuePertanyaan
        window.open(`https://wa.me/${noWa}?text=${valuePertanyaan}`)
    }
    return (
        <div className='w-full h-full flex flex-col flex-wrap justify-between  mt-[24px] bg-[var(--card)] rounded-xl'>
            {token && PanelEditPage ? (
                <>
                    {onEditQuestion ? (
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
                    ) : (
                        <>
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
                                <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                                    <span class="sr-only">Close</span>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                </button>
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
    )
}

export default FieldPertanyaan  
