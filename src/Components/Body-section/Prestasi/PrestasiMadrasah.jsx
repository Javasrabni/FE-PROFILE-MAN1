import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { GetTokenContext } from '../../Auth/GetTokenContext'
import { FormTambahBerita } from '../News/NewsPart'
import { TambahIcon } from '../../Icon/ListIcon'
import { PanelAdminContext } from '../../../Context/ControlPanelAdmin/PanelAdminCtx'

import { SuccessPopup } from '../Landing/LandingPage'
import { LoadingEffect } from '../../Icon/ListIcon'

export const PrestasiMadrasah = () => {
    // CONTEXT TO SAVE / GET TOKEN
    const { token, setToken } = useContext(GetTokenContext)
    const { PanelEditPage, setPanelEditPage } = useContext(PanelAdminContext)


    const [refreshData, setRefreshData] = useState(false) //REFRESH STATE AGAR TIDAK PERLU REFRESHUNTUK MENAMPILKAN DATA BARU
    const [onTambahPrestasi, setOnTambahPrestasi] = useState(false) // STATE UNTUK POPUP FORM TAMBAH BERITA
    const [onPreviewFilePendukung, setonPreviewFilePendukung] = useState(false)// GETFILE PENDUKUNG
    const [IndexTabelPrestasi, setIndexTabelPrestasi] = useState(null)


    // SAVE EDITING NEWS
    const [onSuccesEdit, setOnSuccesEdit] = useState(null)
    const [onSuccesEditState, setOnSuccesEditState] = useState(false)
    useEffect(() => {
        if (onSuccesEditState) {
            const delay = setTimeout(() => {
                setOnSuccesEditState(false)
            }, 6000)
            return () => clearTimeout(delay)
        }
    }, [onSuccesEditState]) // AUTO CLOSE SUKSES UPDATE IN 6s

    const [onLoading, setOnLoading] = useState(false)


    const [judulPrestasi, setJudulPrestasi] = useState(null)
    const [tingkatPrestasi, setTingkatPrestasi] = useState(null)
    const [tahunPrestasi, setTahunPrestasi] = useState(null)
    const [deskripsiPrestasi, setDeskripsiPrestasi] = useState(null)
    const [filePendukungPrestasi, setFilePendukungPrestasi] = useState(null)

    const [previewFilePendukung, setPreviewFilePendukung] = useState({})

    // POST PRESTASI MAN
    async function AddPrestasiMan() {
        try {
            setOnLoading(true)
            const newData = new FormData()
            if (judulPrestasi) { newData.append('prestasi', judulPrestasi) }
            if (tingkatPrestasi) { newData.append('tingkat', tingkatPrestasi) }
            if (tahunPrestasi) { newData.append('tahun', tahunPrestasi) }
            if (deskripsiPrestasi) { newData.append('deskripsi', deskripsiPrestasi) }
            if (filePendukungPrestasi) { newData.append('file', filePendukungPrestasi) }

            const response = await fetch(`${process.env.REACT_APP_BE_URL}/post/adm/prestasiman`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                }, body: newData
            })
            if (response.ok) {
                const data = await response.json()
                setOnTambahPrestasi(false)
                setOnSuccesEdit(data.msg)
                setOnSuccesEditState(true)
                setRefreshData(prev => !prev)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setOnLoading(false)
        }

    }

    // GET OUTPUT PRESTASI FROM ADMIN
    const [outputPrestasi, setOutputPrestasi] = useState([])
    useEffect(() => {
        const getPrestasiMan = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BE_URL}/get/adm/prestasiman`, {
                    method: 'GET'
                })
                if (response.ok) {
                    const data = await response.json()
                    setOutputPrestasi(data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getPrestasiMan()
    }, [refreshData])

    // GET DATA FROM ID TABLE
    useEffect(() => {
        const getData = outputPrestasi.find(item => item.id === IndexTabelPrestasi)
        if (getData) {
            setPreviewFilePendukung({
                filePendukung: getData.filePendukung,
                judulPrestasi: getData.prestasi
            })
        }
    }, [IndexTabelPrestasi, outputPrestasi])


    async function HandleDeletePrestasi(IdPrestasi) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/user/${IdPrestasi}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                // outputDataPeserta((prev => prev.filter(item => item.id !== IdPeserta)))
                const updatedData = await fetch(`${process.env.REACT_APP_BE_URL}/user`);
                const newData = await updatedData.json();
                setOutputPrestasi(newData); // Update state dengan data terbaru
            }
        } catch (error) {
            console.error(error)
        }
    }

    function HandleCancleAddPrestasi() {
        const confirm = window.confirm('Yakin ingin membatalkan?')
        if (!confirm) {
            return
        } else {
            setOnTambahPrestasi(false)
        }
    }
    return (
        <>
            {/* POPUP LOADING */}
            {onLoading && (
                <SuccessPopup
                    heading={<LoadingEffect text={'Loading..'} />}
                    subHeading={"Data sedang dikirim ke Database. mohon tunggu, pastikan koneksi internet stabil"}
                />
            )}

            {/* POPUP SUKSES UPDATE */}
            {onSuccesEditState && (
                <SuccessPopup
                    heading={"Berhasil Update!"}
                    subHeading={onSuccesEdit}
                    button={<button className='bg-[var(--text-primary)] w-fit h-fit py-[6px] px-[16px] rounded-lg text-white text-xs sm:text-sm' onClick={() => setOnSuccesEditState(false)}>Tutup</button>}

                />
            )}
            {onTambahPrestasi && (
                <div className='fixed top-0 left-0 z-[50] w-full h-full flex items-center justify-center'>
                    <div className='z-[4] w-full h-full flex items-center justify-center' >
                        <FormTambahBerita
                            InputField={<>
                                <div className='mb-6'>
                                    <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prestasi</label>
                                    <input type="text" id="small-input" className="outline-none block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setJudulPrestasi(e.target.value)} />
                                </div>

                                {/* DESKRIPSI INPUT */}
                                <div class="mb-6">
                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tingkat</label>
                                    <input type="text" id="large-input" className="outline-none block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setTingkatPrestasi(e.target.value)} />
                                </div>
                                <div class="mb-6">
                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tahun</label>
                                    <input type='text' id="large-input" className="outline-none block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setTahunPrestasi(e.target.value)} />
                                </div>
                                <div class="mb-6">
                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
                                    <textarea type="text" id="large-input" className="outline-none block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setDeskripsiPrestasi(e.target.value)} />
                                </div>
                                <div class="mb-6">
                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File Pendukung</label>
                                    <input type="file" id="large-input" className="outline-none block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setFilePendukungPrestasi(e.target.files[0])} />
                                </div>
                            </>}
                            button={
                                <>
                                    <button className='text-black bg-[var(--card)] hover:bg-[var(--bg-secondary)] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={HandleCancleAddPrestasi}>Cancle</button>
                                    <button type="submit" class="text-white bg-[var(--aksen-biru)] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={AddPrestasiMan}>Publish</button>
                                </>
                            }
                        />
                    </div>
                    <div className='w-full h-full bg-[#00000080] absolute' />
                </div>
            )}

            {/* ON PREVIEW FILE PENDUKUNG */}
            {onPreviewFilePendukung && (
                <div className='fixed top-0 right-0 w-full h-full z-[50] w-[420px] flex flex-col gap-[16px] items-center justify-center p-[16px]'>

                    <figure class="max-w-lg z-[6] bg-white rounded-lg w-full max-w-[420px] h-fit flex items-center justify-center flex-col p-[16px]">
                        <img class="h-full max-w-full rounded-lg object-cover" src={previewFilePendukung.filePendukung} alt="image description" />
                        <figcaption class="mt-[16px] text-sm text-center text-gray-500 dark:text-gray-400">{previewFilePendukung.judulPrestasi}</figcaption>
                    </figure>

                    <div className='z-[6]'>
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" ><a href={`${previewFilePendukung.filePendukung}?fl_attachment=${previewFilePendukung.judulPrestasi}`} download={previewFilePendukung.judulPrestasi} target='_blank'>Download</a></button>
                        <button type="button" class="text-black bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setonPreviewFilePendukung(false)}>Tututp</button>
                    </div>

                    <div className='w-full h-full bg-[#00000080] absolute z-[5]' />


                </div>
            )}


            <div className='mt-[24px]'>
                {/* JUDUL */}
                <div className='w-full h-[60px] flex flex-row items-center justify-between gap-[2px] mb-[16px]'>
                    {token && PanelEditPage ? (
                        <>
                            <div>
                                <h1 className='text-[18px] sm:text-xl font-bold leading-[1]'>Prestasi Siswa</h1>
                                <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular">Pencapaian prestasi yang didapat oleh siswa MAN 1 Kota Tangerang</p>
                            </div>
                            <div className=' w-fit flex flex-row gap-[16px] items-center'>
                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] py-[6px] px-[16px] rounded-lg relative' onClick={() => setOnTambahPrestasi(true)}>
                                    <TambahIcon
                                        sizeOnPx={20}
                                        color={"#005eff"} />
                                    <p className='font-[inter] text-white text-xs sm:text-sm '>Tambah</p>
                                </span>
                            </div>
                        </>
                    ) : (
                        <div>
                            <h1 className='text-[18px] sm:text-xl font-bold leading-[1]'>Prestasi Siswa</h1>
                            <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular">Pencapaian prestasi yang didapat oleh siswa MAN 1 Kota Tangerang</p>
                        </div>
                    )}
                </div>

                <div className='overflow-x-auto pb-[16px] rounded-lg'>
                    <div class="hidden-scroll relative overflow-x-auto rounded-lg border-r border-l border-b border-[var(--warna-aksen)]" >
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                            <thead class="text-sm text-black uppercase bg-[var(--warna-aksen)] dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Prestasi
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Tingkat
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Tahun
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Deskripsi
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        File Pendukung
                                    </th>
                                    {token && PanelEditPage && (
                                        <th scope="col" class="px-6 py-3">

                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {outputPrestasi.map((item, index) =>
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-50" onClick={() => console.log(item.id)}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.prestasi === '' || null ? '-' : item.prestasi}</th>
                                        <td className="px-6 py-4">{item.tingkat === '' || null ? '-' : item.tingkat}</td>
                                        <td className="px-6 py-4">{item.tahun === '' || null ? '-' : item.tahun}</td>
                                        <td className="px-6 py-4">{item.deskripsi === '' || null ? '-' : item.deskripsi}</td>
                                        <td className="px-6 py-4">{item.filePendukung === '' || null ? '-' : <button className='text-[var(--aksen-biru)] font-semibold' onClick={() => { setonPreviewFilePendukung(true); setIndexTabelPrestasi(item.id) }}>Lihat File</button>}</td>
                                        {token && PanelEditPage && (
                                            <td class="px-6 py-4 flex flex-row gap-[16px]">
                                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                                <a href="#" class="font-medium text-red-600 dark:text-blue-500 hover:underline">Hapus</a>
                                            </td>
                                        )}
                                        {/* <td className="border border-gray-300 px-4 py-2">
                                <div className='flex flex-row items-center'>
                                    <button className='bg-[green] w-full h-full text-white p-[4px]'>Edit</button>
                                    <button className='bg-[tomato] w-full h-full text-white p-[4px]' onClick={() => HandleDeletePrestasi(item.id)}>Delete</button>
                                </div>
                            </td> */}

                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
