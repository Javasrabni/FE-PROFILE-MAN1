import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { GetTokenContext } from '../../Auth/GetTokenContext'
import { FormTambahBerita } from '../News/NewsPart'
import { TambahIcon } from '../../Icon/ListIcon'
import { PanelAdminContext } from '../../../Context/ControlPanelAdmin/PanelAdminCtx'

import { SuccessPopup } from '../Landing/LandingPage'
import { LoadingEffect } from '../../Icon/ListIcon'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
    const [onError, setOnError] = useState(null)
    const [onErrorState, setOnErrorState] = useState(false)

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
    const [namaFilePendukungPrestasi, setNamaFilePendukungPrestasi] = useState(null)

    const [previewFilePendukung, setPreviewFilePendukung] = useState({})

    const [onEditPrestasi, setOnEditPrestasi] = useState(false)

    // POST PRESTASI MAN
    async function AddPrestasiMan() {
        try {
            setOnLoading(true)
            const newData = new FormData()
            if (judulPrestasi) { newData.append('prestasi', judulPrestasi) }
            if (tingkatPrestasi) { newData.append('tingkat', tingkatPrestasi) }
            if (tahunPrestasi) { newData.append('tahun', tahunPrestasi) }
            if (deskripsiPrestasi) { newData.append('deskripsi', deskripsiPrestasi) }
            if (filePendukungPrestasi) { newData.append('file', filePendukungPrestasi); newData.append('namaFilePendukung', namaFilePendukungPrestasi) }

            const response = await fetch(`${process.env.REACT_APP_BE_URL}/post/adm/prestasi_siswa_man`, {
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
            } else {
                const data = await response.json()
                setOnError(data.msg)
                setOnErrorState(true)
            }
        } catch (err) {
            console.error(err)
            setOnError(err.message)
            setOnErrorState(true)
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
        const getData = outputPrestasi?.find(item => item.id === IndexTabelPrestasi)
        if (getData) {
            setPreviewFilePendukung({
                filePendukung: getData.filePendukung,
                judulPrestasi: getData.prestasi
            })
        }
    }, [IndexTabelPrestasi, outputPrestasi])


    async function HandleDeletePrestasi(IdPrestasi) {
        const confirm = window.confirm('Yakin ingin menghapus?')
        try {
            if (!confirm) {
                return
            } else {
                const response = await fetch(`${process.env.REACT_APP_BE_URL}/del/adm/prestasiman`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }, body: JSON.stringify({ Id: IdPrestasi })
                })
                if (response.ok) {
                    const data = await response.json()
                    setOnEditPrestasi(false)
                    setOnSuccesEdit(data.msg)
                    setOnSuccesEditState(true)
                    setRefreshData(prev => !prev)
                    setIndexTabelPrestasi(null)
                } else {
                    const data = await response.json()
                    setOnError(data.msg)
                    setOnErrorState(true)
                }
            }
        } catch (error) {
            console.error(error)
            setOnError(error.message)
            setOnErrorState(true)
        } finally {
            setOnErrorState(false)
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

    // HANDLE PATCH PRESTASI SISWA
    const [PatchJudulPrestasi, setPatchJudulPrestasi] = useState(null)
    const [PatchTingkatPrestasi, setPatchTingkatPrestasi] = useState(null)
    const [PatchTahunPrestasi, setPatchTahunPrestasi] = useState(null)
    const [PatchDeskripsiPrestasi, setPatchDeskripsiPrestasi] = useState(null)
    const [PatchFilePendukungPrestasi, setPatchFilePendukungPrestasi] = useState(null)
    const [PatchNamaFilePendukungPrestasi, setPatchNamaFilePendukungPrestasi] = useState(null)

    useEffect(() => {
        const GetIndex = outputPrestasi?.find(item => item.id === IndexTabelPrestasi)
        if (GetIndex) {
            setPatchJudulPrestasi(GetIndex.prestasi)
            setPatchTingkatPrestasi(GetIndex.tingkat)
            setPatchTahunPrestasi(GetIndex.tahun)
            setPatchDeskripsiPrestasi(GetIndex.deskripsi)
            setPatchFilePendukungPrestasi(GetIndex.filePendukung)
            setPatchNamaFilePendukungPrestasi(GetIndex.namaFilePendukung)
        }
    }, [IndexTabelPrestasi, outputPrestasi])

    async function UpdatePrestasiMan() {
        setOnLoading(true)
        try {
            const newForm = new FormData()
            if (PatchJudulPrestasi) { newForm.append('prestasi', PatchJudulPrestasi) }
            if (PatchTingkatPrestasi) { newForm.append('tingkat', PatchTingkatPrestasi) }
            if (PatchTahunPrestasi) { newForm.append('tahun', PatchTahunPrestasi) }
            if (PatchDeskripsiPrestasi) { newForm.append('deskripsi', PatchDeskripsiPrestasi) }
            if (PatchFilePendukungPrestasi) { newForm.append('file', PatchFilePendukungPrestasi) }
            if (PatchNamaFilePendukungPrestasi) { newForm.append('namaFilePendukung', PatchNamaFilePendukungPrestasi) }
            newForm.append('Id', IndexTabelPrestasi)

            const response = await fetch(`${process.env.REACT_APP_BE_URL}/patch/adm/prestasiman`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`
                }, body: newForm
            })
            if (response.ok) {
                const data = await response.json()
                setOnEditPrestasi(false)
                setOnSuccesEdit(data.msg)
                setOnSuccesEditState(true)
                setRefreshData(prev => !prev)
                setIndexTabelPrestasi(null)
            } else {
                const data = await response.json()
                console.log(data)
                setOnError(data.msg)
                setOnErrorState(true)
            }
        } catch (err) {
            console.error(err)
            setOnError(`Terjadi Kesalahan:` + err.message)
            setOnErrorState(true)
        } finally {
            setOnLoading(false)
            setTimeout(() => setOnErrorState(false), 6000)
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
                    autoClose={true}
                    button={<button className='bg-[var(--text-primary)] w-fit h-fit py-[6px] px-[16px] rounded-lg text-white text-xs sm:text-sm' onClick={() => setOnSuccesEditState(false)}>Tutup</button>}

                />
            )}

            {onErrorState && (
                <SuccessPopup
                    heading={"Terjadi Kesalahan Sistem"}
                    subHeading={onError}
                    autoClose={true}
                    button={<button className='bg-[var(--text-primary)] w-fit h-fit py-[6px] px-[16px] rounded-lg text-white text-xs sm:text-sm' onClick={() => setOnErrorState(false)}>Tutup</button>}

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
                                    <input type="file" id="large-input" className="outline-none block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { setFilePendukungPrestasi(e.target.files[0]); setNamaFilePendukungPrestasi(e.target.files[0].name) }} />
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

            {onEditPrestasi && (
                <div className='fixed top-0 left-0 z-[50] w-full h-full flex items-center justify-center'>
                    <div className='z-[4] w-full h-full flex items-center justify-center' >
                        <FormTambahBerita
                            InputField={<>
                                <div className='mb-6'>
                                    <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prestasi</label>
                                    <input type="text" id="small-input" className="outline-none block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={PatchJudulPrestasi} onChange={(e) => setPatchJudulPrestasi(e.target.value)} />
                                </div>

                                {/* DESKRIPSI INPUT */}
                                <div class="mb-6">
                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tingkat</label>
                                    <input type="text" id="large-input" className="outline-none block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={PatchTingkatPrestasi} onChange={(e) => setPatchTingkatPrestasi(e.target.value)} />
                                </div>
                                <div class="mb-6">
                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tahun</label>
                                    <input type='text' id="large-input" className="outline-none block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={PatchTahunPrestasi} onChange={(e) => setPatchTahunPrestasi(e.target.value)} />
                                </div>
                                <div class="mb-6">
                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
                                    <textarea type="text" id="large-input" className="outline-none block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={PatchDeskripsiPrestasi} onChange={(e) => setPatchDeskripsiPrestasi(e.target.value)} />
                                </div>
                                <div class="mb-6">
                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File Pendukung</label>
                                    <input type="file" id="large-input" className="outline-none block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { setPatchFilePendukungPrestasi(e.target.files[0]); setPatchNamaFilePendukungPrestasi(e.target.files[0].name) }} />
                                    {PatchFilePendukungPrestasi && (
                                        <label for="large-input" className='block mt-2 text-sm font-medium text-gray-900 dark:text-white'>File saat ini: {PatchNamaFilePendukungPrestasi}</label>
                                    )}
                                </div>
                            </>}
                            button={
                                <>
                                    <button className='text-black bg-[var(--card)] hover:bg-[var(--bg-secondary)] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={() => { HandleCancleAddPrestasi(); setOnEditPrestasi(false); setIndexTabelPrestasi(null) }}>Cancle</button>
                                    <button type="submit" class="text-white bg-[var(--aksen-biru)] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={UpdatePrestasiMan}>Update</button>
                                </>
                            }
                        />

                    </div>
                    <div className='w-full h-full bg-[#00000080] absolute' />

                </div>
            )}

            {/* ON PREVIEW FILE PENDUKUNG */}
            {onPreviewFilePendukung && (
                <div className="fixed top-0 right-0 w-full h-full z-[50] flex flex-col gap-[16px] items-center justify-center p-[16px]">
                    <div className='w-full max-w-lg rounded-lg h-full max-h-[360px] bg-white z-[6] p-[16px]'>
                        <figure className="w-full rounded-lg h-full flex items-center justify-center flex-col p-[16px] gap-[8px]">
                            <img
                                className="h-full w-full rounded-lg object-contain"
                                src={previewFilePendukung.filePendukung}
                                alt="image description"
                            />
                            <figcaption className=" text-sm text-center text-gray-500 dark:text-gray-400">
                                {previewFilePendukung.judulPrestasi}
                            </figcaption>
                        </figure>

                    </div>

                    <div className="z-[6]">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            <a
                                href={`${previewFilePendukung.filePendukung}?fl_attachment=${previewFilePendukung.judulPrestasi}`}
                                download={previewFilePendukung.judulPrestasi}
                                target="_blank"
                            >
                                Download
                            </a>
                        </button>
                        <button
                            type="button"
                            className="text-black bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={() => {
                                setonPreviewFilePendukung(false);
                                setIndexTabelPrestasi(null);
                            }}
                        >
                            Tutup
                        </button>
                    </div>

                    <div className="w-full h-full bg-[#00000080] absolute z-[5]" />
                </div>

            )}


            <div className='mt-[24px]'>
                {/* JUDUL */}
                <div className='w-full h-[60px] flex flex-row items-center justify-between gap-[2px] mb-[16px]'>
                    {token && PanelEditPage ? (
                        <>
                            <div>
                                <h1 className='text-[18px] sm:text-xl font-bold leading-[1]'>Prestasi Madrasah</h1>
                                <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular">Pencapaian prestasi yang didapat oleh MAN 1 Kota Tangerang</p>
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
                            <h1 className='text-[18px] sm:text-xl font-bold leading-[1]'>Prestasi Madrasah</h1>
                            <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular">Pencapaian prestasi yang didapat oleh MAN 1 Kota Tangerang</p>
                        </div>
                    )}
                </div>

                <div className='overflow-x-auto pb-[16px] rounded-lg'>
                    <div class="hidden-scroll relative overflow-x-auto rounded-lg border-r border-l border-b border-[var(--warna-aksen)]" >
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                            <thead class="text-sm text-black uppercase bg-[var(--warna-aksen)]">
                                {outputPrestasi && outputPrestasi.length > 0 ? (
                                    <>
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
                                    </>
                                ) : (
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center">Prestasi Siswa</th>
                                    </tr>
                                )}
                            </thead>
                            <tbody>
                                {outputPrestasi && outputPrestasi.length > 0 ? (
                                    <>
                                        {outputPrestasi.map((item, index) =>
                                            <tr key={index} className="odd:bg-white text-black  even:bg-gray-50  border-b border-gray-50" onClick={() => console.log(item.id)}>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.prestasi === '' || null ? '-' : item.prestasi}</th>
                                                <td className="px-6 py-4">{item.tingkat ? item.tingkat : '-'}</td>
                                                <td className="px-6 py-4">{item.tahun ? item.tahun : '-'}</td>
                                                <td className="px-6 py-4">{item.deskripsi ? item.deskripsi : '-'}</td>
                                                <td className="px-6 py-4">{item.filePendukung ? <button className='text-[var(--aksen-biru)] font-semibold' onClick={() => { setonPreviewFilePendukung(true); setIndexTabelPrestasi(item.id) }}>Lihat File</button> : '-'}</td>
                                                {token && PanelEditPage && (
                                                    <td class="px-6 py-4 flex flex-row gap-[16px]">
                                                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { setOnEditPrestasi(true); setIndexTabelPrestasi(item.id) }}>Edit</button>
                                                        <button className="font-medium text-red-600 dark:text-blue-500 hover:underline" onClick={() => HandleDeletePrestasi(item.id)}>Hapus</button>
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
                                    </>
                                ) : (
                                    <>
                                        <td><Skeleton count={outputPrestasi?.length || 2} height={40} width={'100%'} /></td>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}