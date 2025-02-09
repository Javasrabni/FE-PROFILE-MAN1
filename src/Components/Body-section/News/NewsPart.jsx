import React, { useEffect, useState, useContext, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'

import { PanelAdminContext } from '../../../Context/ControlPanelAdmin/PanelAdminCtx'
import { GetTokenContext } from '../../Auth/GetTokenContext'
import { PencilIcon, CheckIcon, ImageIcon, LoadingEffect } from '../../Icon/ListIcon'
import { SuccessPopup } from '../Landing/LandingPage'

const NewsPart = () => {
    // CONTEXT TO SAVE / GET TOKEN
    const { token, setToken } = useContext(GetTokenContext)

    // GET DATA BERITA DARI API
    const [newsLanding, setNewsLanding] = useState([])
    const [refreshDataNews, setRefreshDataNews] = useState(false)
    useEffect(() => {
        const GetNewsLanding = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BE_URL}/get/adm/newslanding`)
                if (response.ok) {
                    const data = await response.json()
                    setNewsLanding(data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        GetNewsLanding()
    }, [refreshDataNews])

    // PANEL EDIT CONTEXT (ON)
    const { PanelEditPage, setPanelEditPage } = useContext(PanelAdminContext)
    const [onEditNewsLanding, setOnEditNewsLanding] = useState(false)
    const [onEditingNewsLanding, setOnEditingNewsLanding] = useState(null)

    // VALUE EDIT NEWS
    const [judulBeritaNews, setJudulBeritaNews] = useState(null) //JUDUL NEWS
    const [deskripsiBeritaNews, setDeskripsiBeritaNews] = useState(null) //DESKRIPSI NEWS
    const inputFileRefTrigger = useRef(null) // IMG NEWS
    const [gambarBeritaNews, setGambarBeritaNews] = useState(null) // PREVIEW THUMBNAIL NEWS
    const [saveGambarUploadBeritaNews, setSaveGambarUploadBeritaNews] = useState(null)

    // HANDLE UPLOAD IMAGE (PREVIEW)
    function HandleUploadImage(event) {
        const getSelectedImg = event.target.files[0]
        if (getSelectedImg) {
            setSaveGambarUploadBeritaNews(getSelectedImg)
            setGambarBeritaNews(URL.createObjectURL(getSelectedImg))
        }
        if (!onEditNewsLanding) {
            URL.revokeObjectURL(getSelectedImg)
        }
    }

    // SET VALUE INDEX NEWS YANG TERPILIH
    useEffect(() => {
        const findIndexNewsSelected = newsLanding.find(item => item.id === onEditingNewsLanding)
        setJudulBeritaNews(findIndexNewsSelected?.judulBerita)
        setDeskripsiBeritaNews(findIndexNewsSelected?.deskripsi)
        setGambarBeritaNews(findIndexNewsSelected?.thumbnail)
    }, [onEditingNewsLanding])

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

    async function HandleSaveNewsLanding() {
        setOnEditNewsLanding(false)
        try {
            setOnLoading(true)
            const formData = new FormData()

            formData.append('Id', onEditingNewsLanding)
            if (saveGambarUploadBeritaNews) formData.append('file', saveGambarUploadBeritaNews)
            if (judulBeritaNews) formData.append('judulBerita', judulBeritaNews)
            if (deskripsiBeritaNews) formData.append('deskripsiBerita', deskripsiBeritaNews)

            const response = await fetch(`${process.env.REACT_APP_BE_URL}/patch/adm/newslanding`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`
                }, body: formData
            })
            if (response.ok) {
                const data = await response.json()
                setOnSuccesEdit(data.msg)
                setOnSuccesEditState(true)
                console.log(data)
                setRefreshDataNews(prev => !prev)
            } else (
                console.log('Loadingg')
            )
        } catch (error) {
            console.error(error)
        } finally {
            setOnLoading(false)
        }
    }


    const isMobile = useMediaQuery({ maxWidth: 640 })
    const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1079 });
    const isDesktop = useMediaQuery({ minWidth: 1080 });

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
            <div className='w-full h-fit flex flex-col'>

                {/* JUDUL */}
                <div className='w-full h-[60px] flex items-center'>
                    <h1 className='text-[18px] sm:text-xl font-bold'>Berita Terbaru</h1>
                </div>

                {/* AKAN MENGGUNAKAN ITERASI MAPPING! */}

                {/* PART BERITA */}
                <div>
                    {isMobile && (
                        <div className='flex flex-col gap-[32px]'>
                            {newsLanding && newsLanding.map(item =>
                                <div className='flex flex-col gap-[32px]' key={item.id}>
                                    <section className='h-fit w-full flex flex-col justify-between gap-[16px]'>
                                        {/* GAMBAR / THUMBNAIL BERITA */}
                                        <div className='bg-[var(--bg-secondary)] w-full max-w-[464px] h-[256px] rounded-xl' style={{ border: "1px solid var(--border)" }}>
                                            <img src={item.thumbnail} alt={`Gambar ${item.judulBerita}`} className=' h-full w-full object-cover rounded-xl' loading='lazy' />
                                        </div>

                                        {/* CONTENT */}
                                        <div className='flex flex-col gap-[16px]'>
                                            <span className='flex flex-col gap-[4px]'>
                                                <h1 className='text-base sm:text-lg font-bold line-clamp-2'>{item.judulBerita}</h1>
                                                <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular line-clamp-4">
                                                    {item.deskripsi}
                                                </p>

                                            </span>
                                            <span>
                                                <p className='text-sm sm:text-base text-[var(--text-secondary)] font-regular'>Terakhir diupdate: {item.updatedAt.slice(0, 10)}</p>
                                            </span>
                                        </div>

                                        {/* CTA BUTTON */}
                                        <div className='w-fit h-full flex items-center justify-end'>
                                            <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-[var(--warna-aksen)] px-[16px] py-[6px]'>Selengkapnya</button>
                                        </div>
                                    </section>
                                </div>
                            )}
                        </div>
                    )}



                    {isTablet && (
                        <>
                            {token && PanelEditPage ? (
                                <>
                                    {onEditNewsLanding ? (
                                        <div className='flex flex-col gap-[16px] p-[16px]' style={{ outline: '1px solid var(--warna-aksen)' }} >
                                            {newsLanding && newsLanding.map(item =>
                                                <div className='flex flex-col gap-[32px]'>
                                                    <section className='h-[256px] w-full flex flex-row justify-between'>
                                                        {/* GAMBAR / THUMBNAIL BERITA */}
                                                        <div className='bg-[var(--bg-secondary)] w-full min-w-[232px] max-w-[464px] h-[256px] rounded-xl' style={{ border: "1px solid var(--border)" }}>
                                                            <img src={item.thumbnail} alt={`Gambar ${item.judulBerita}`} className=' h-full w-full object-cover rounded-xl' loading='lazy' />
                                                        </div>

                                                        {/* CONTENT */}
                                                        <div className='p-[16px] flex flex-col gap-[16px]'>
                                                            <span className='flex flex-col gap-[4px]'>
                                                                {/* BUTTON EDIT BERITA */}
                                                                {onEditingNewsLanding === item.id && (
                                                                    <div className=' w-fit flex flex-row gap-[16px] items-center'>
                                                                        <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] py-[6px] px-[16px] rounded-lg relative' onClick={HandleSaveNewsLanding}>
                                                                            <CheckIcon
                                                                                sizeOnPx={20}
                                                                                color={"#005eff"} />
                                                                            <p className='font-[inter] text-white text-xs sm:text-sm '>Simpan</p>
                                                                        </span>
                                                                        <p className='text-xs sm:text-sm text-[var(--text-primary)] cursor-pointer underline' onClick={() => setOnEditNewsLanding(false)}>Cancle</p>
                                                                    </div>
                                                                )}
                                                                <h1 className='text-base sm:text-lg font-bold line-clamp-2'>{item.judulBerita}</h1>
                                                                <p className="text-sm sm:text-base text-[var(--text-secondary)] font-regular line-clamp-4">
                                                                    {item.deskripsi}
                                                                </p>

                                                            </span>
                                                            <span>
                                                                <p className='text-sm sm:text-base text-[var(--text-secondary)] font-regular'>Terakhir diupdate: {item.updatedAt.slice(0, 10)}</p>
                                                            </span>
                                                        </div>

                                                        {/* CTA BUTTON */}
                                                        <div className='w-fit h-full flex items-center justify-end'>
                                                            <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-[var(--warna-aksen)] px-[16px] py-[6px]'>Selengkapnya</button>
                                                        </div>
                                                    </section>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className='flex flex-col gap-[16px] p-[16px]' style={{ outline: '1px solid #005eff' }} >
                                            {newsLanding && newsLanding.map((item) =>
                                                <div className='flex flex-col gap-[32px]'>
                                                    <section className='h-[256px] w-full flex flex-row justify-between'>
                                                        {/* GAMBAR / THUMBNAIL BERITA */}
                                                        <div className='bg-[var(--bg-secondary)] w-full min-w-[232px] max-w-[464px] h-[256px] rounded-xl' style={{ border: "1px solid var(--border)" }}>
                                                            <img src={item.thumbnail} alt={`Gambar ${item.judulBerita}`} className=' h-full w-full object-cover rounded-xl' loading='lazy' />
                                                        </div>

                                                        {/* CONTENT */}
                                                        <div className='p-[16px] flex flex-col gap-[16px]'>
                                                            <span className='flex flex-col gap-[4px]'>
                                                                {/* BUTTON EDIT BERITA */}
                                                                <div className='mb-[16px]'>
                                                                    <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] rounded-lg py-[6px] px-[16px]' onClick={() => { setOnEditNewsLanding(prev => !prev); setOnEditingNewsLanding(item.id) }}>
                                                                        <PencilIcon
                                                                            sizeOnPx={20}
                                                                            color={"#005eff"} />
                                                                        <p className='font-[inter] text-white text-xs sm:text-sm '>Edit</p>
                                                                    </span>
                                                                </div>

                                                                <h1 className='text-base sm:text-lg font-bold line-clamp-2'>{item.judulBerita}</h1>
                                                                <p className="text-sm sm:text-base text-[var(--text-secondary)] font-regular line-clamp-4">
                                                                    {item.deskripsi}
                                                                </p>

                                                            </span>
                                                            <span>
                                                                <p className='text-sm sm:text-base text-[var(--text-secondary)] font-regular'>Terakhir diupdate: {item.updatedAt.slice(0, 10)}</p>
                                                            </span>
                                                        </div>

                                                        {/* CTA BUTTON */}
                                                        <div className='w-fit h-full flex items-center justify-end'>
                                                            <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-[var(--warna-aksen)] px-[16px] py-[6px]'>Selengkapnya</button>
                                                        </div>
                                                    </section>
                                                </div>
                                            )}
                                        </div>
                                    )}


                                </>
                            ) : (
                                <div className='flex flex-col gap-[16px]'>
                                    {newsLanding && newsLanding.map(item =>
                                        <div className='flex flex-col gap-[32px]'>
                                            <section className='h-[256px] w-full flex flex-row justify-between'>
                                                {/* GAMBAR / THUMBNAIL BERITA */}
                                                <div className='bg-[var(--bg-secondary)] w-full min-w-[232px] max-w-[464px] h-[256px] rounded-xl' style={{ border: "1px solid var(--border)" }}>
                                                    <img src={item.thumbnail} alt={`Gambar ${item.judulBerita}`} className=' h-full w-full object-cover rounded-xl' loading='lazy' />
                                                </div>

                                                {/* CONTENT */}
                                                <div className='p-[16px] flex flex-col gap-[16px]'>
                                                    <span className='flex flex-col gap-[4px]'>
                                                        <h1 className='text-base sm:text-lg font-bold line-clamp-2'>{item.judulBerita}</h1>
                                                        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-regular line-clamp-4">
                                                            {item.deskripsi}
                                                        </p>

                                                    </span>
                                                    <span>
                                                        <p className='text-sm sm:text-base text-[var(--text-secondary)] font-regular'>Terakhir diupdate: {item.updatedAt.slice(0, 10)}</p>
                                                    </span>
                                                </div>

                                                {/* CTA BUTTON */}
                                                <div className='w-fit h-full flex items-center justify-end'>
                                                    <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-[var(--warna-aksen)] px-[16px] py-[6px]'>Selengkapnya</button>
                                                </div>
                                            </section>
                                        </div>
                                    )}
                                </div>
                            )}

                        </>
                    )}

                    {isDesktop && (
                        <>
                            {token && PanelEditPage ? (
                                <>
                                    {onEditNewsLanding ? (
                                        <div className='flex flex-col gap-[16px]' >
                                            {newsLanding && newsLanding.map(item =>
                                                <div className='flex flex-col gap-[32px]' style={{ outline: onEditingNewsLanding === item.id && '1px solid var(--warna-aksen)', padding: onEditingNewsLanding === item.id && '16px' }}>

                                                    {onEditingNewsLanding === item.id ? (
                                                        <section className='h-[256px] w-full flex flex-row justify-between'>

                                                            {/* GAMBAR / THUMBNAIL BERITA */}
                                                            <div className='bg-[var(--bg-secondary)] w-[464px] h-[256px] rounded-xl shrink-0 relative cursor-pointer' style={{ border: "1px solid var(--border)" }}>

                                                                {/* ICON CHANGE IMG */}
                                                                <div className='absolute w-full h-full z-[3] flex flex-col gap-[4px] items-center justify-center text-[var(--aksen-biru-2)]' onClick={() => inputFileRefTrigger.current.click()}>
                                                                    <span className='bg-[var(--text-primary)] px-[16px] py-[6px] rounded-lg'>
                                                                        <ImageIcon size={6} />
                                                                    </span>
                                                                    <p className='text-black text-sm font-medium'>Ganti Gambar</p>
                                                                </div>

                                                                <input type="file" ref={inputFileRefTrigger} onChange={(e) => HandleUploadImage(e)} className='hidden' />

                                                                {/* GREEN OVERLAY IMG */}
                                                                <div className='w-full h-full bg-[var(--warna-aksen)] opacity-[60%] absolute rounded-xl' />

                                                                <img src={gambarBeritaNews} alt={`Gambar ${item.judulBerita}`} className=' h-full w-full object-cover rounded-xl' loading='lazy' />
                                                            </div>

                                                            {/* CONTENT */}
                                                            <div className='p-[16px] flex flex-col gap-[16px] w-full relative'>
                                                                <span className='flex flex-col gap-[4px]'>
                                                                    <input type="text" value={judulBeritaNews} className='text-base sm:text-base font-bold line-clamp-2' style={{ outline: '1px solid var(--warna-aksen)' }} onChange={(e) => setJudulBeritaNews(e.target.value)} />

                                                                    <textarea className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular line-clamp-4 resize-none" style={{ outline: '1px solid var(--warna-aksen)' }} value={deskripsiBeritaNews} onChange={(e) => setDeskripsiBeritaNews(e.target.value)} />
                                                                </span>
                                                                <span>
                                                                    <p className='text-sm sm:text-sm text-[var(--text-secondary)] font-regular'>Terakhir diupdate: {item.updatedAt.slice(0, 10)}</p>
                                                                </span>

                                                                {/* BUTTON EDIT BERITA */}
                                                                {onEditingNewsLanding === item.id && (
                                                                    <div className=' w-fit flex flex-row gap-[16px] items-center'>
                                                                        <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] py-[6px] px-[16px] rounded-lg relative' onClick={HandleSaveNewsLanding}>
                                                                            <CheckIcon
                                                                                sizeOnPx={20}
                                                                                color={"#005eff"} />
                                                                            <p className='font-[inter] text-white text-xs sm:text-sm '>Simpan</p>
                                                                        </span>
                                                                        <p className='text-xs sm:text-sm text-[var(--text-primary)] cursor-pointer underline' onClick={() => { setOnEditNewsLanding(false); setOnEditingNewsLanding(null) }}>Cancle</p>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* CTA BUTTON */}
                                                            <div className='w-fit h-full flex items-center justify-end'>
                                                                <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-[var(--warna-aksen)] px-[16px] py-[6px]'>Selengkapnya</button>
                                                            </div>
                                                        </section>
                                                    ) : (
                                                        <section className='h-[256px] w-full flex flex-row justify-between'>
                                                            {/* GAMBAR / THUMBNAIL BERITA */}
                                                            <div className='bg-[var(--bg-secondary)] w-[464px] h-[256px] rounded-xl shrink-0' style={{ border: "1px solid var(--border)" }}>
                                                                <img src={item.thumbnail} alt={`Gambar ${item.judulBerita}`} className=' h-full w-full object-cover rounded-xl' loading='lazy' />
                                                            </div>

                                                            {/* CONTENT */}
                                                            <div className='p-[16px] flex flex-col gap-[16px] relative'>
                                                                <span className='flex flex-col gap-[4px]'>
                                                                    <h1 className='text-base sm:text-base font-bold line-clamp-2'>{item.judulBerita}</h1>
                                                                    <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular line-clamp-4">
                                                                        {item.deskripsi}
                                                                    </p>
                                                                </span>
                                                                <span>
                                                                    <p className='text-sm sm:text-sm text-[var(--text-secondary)] font-regular'>Terakhir diupdate: {item.updatedAt.slice(0, 10)}</p>
                                                                </span>

                                                                {/* BUTTON EDIT BERITA */}
                                                                {onEditingNewsLanding === item.id && (
                                                                    <div className=' w-fit flex flex-row gap-[16px] items-center'>
                                                                        <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] py-[6px] px-[16px] rounded-lg relative' onClick={HandleSaveNewsLanding}>
                                                                            <CheckIcon
                                                                                sizeOnPx={20}
                                                                                color={"#005eff"} />
                                                                            <p className='font-[inter] text-white text-xs sm:text-sm '>Simpan</p>
                                                                        </span>
                                                                        <p className='text-xs sm:text-sm text-[var(--text-primary)] cursor-pointer underline' onClick={() => { setOnEditNewsLanding(false); setOnEditingNewsLanding(null) }}>Cancle</p>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* CTA BUTTON */}
                                                            <div className='w-fit h-full flex items-center justify-end'>
                                                                <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-[var(--warna-aksen)] px-[16px] py-[6px]'>Selengkapnya</button>
                                                            </div>
                                                        </section>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className='flex flex-col gap-[16px] p-[16px]' style={{ outline: !onEditNewsLanding && '1px solid #005eff' }} >
                                            {newsLanding && newsLanding.map((item) =>
                                                <div className='flex flex-col gap-[32px]' key={item.id}>
                                                    <section className='h-[256px] w-full flex flex-row justify-between'>
                                                        {/* GAMBAR / THUMBNAIL BERITA */}
                                                        <div className='bg-[var(--bg-secondary)] w-[464px] h-[256px] rounded-xl shrink-0' style={{ border: "1px solid var(--border)" }}>
                                                            <img src={item.thumbnail} alt={`Gambar ${item.judulBerita}`} className=' h-full w-full object-cover rounded-xl' loading='lazy' />
                                                        </div>

                                                        {/* CONTENT */}
                                                        <div className='p-[16px] flex flex-col gap-[16px] relative'>
                                                            <span className='flex flex-col gap-[4px]'>
                                                                <h1 className='text-base sm:text-base font-bold line-clamp-2'>{item.judulBerita}</h1>
                                                                <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular line-clamp-4">
                                                                    {item.deskripsi}
                                                                </p>
                                                            </span>

                                                            <span>
                                                                <p className='text-sm sm:text-sm text-[var(--text-secondary)] font-regular'>Terakhir diupdate: {item.updatedAt.slice(0, 10)}</p>
                                                            </span>

                                                            {/* BUTTON EDIT BERITA */}
                                                            <div className=''>
                                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] rounded-lg py-[6px] px-[16px]' onClick={() => { setOnEditNewsLanding(prev => !prev); setOnEditingNewsLanding(item.id) }}>
                                                                    <PencilIcon
                                                                        sizeOnPx={20}
                                                                        color={"#005eff"} />
                                                                    <p className='font-[inter] text-white text-xs sm:text-sm '>Edit</p>
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* CTA BUTTON */}
                                                        <div className='w-fit h-full flex items-center justify-end'>
                                                            <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-[var(--warna-aksen)] px-[16px] py-[6px]'>Selengkapnya</button>
                                                        </div>
                                                    </section>
                                                </div>
                                            )}
                                        </div>
                                    )}


                                </>
                            ) : (
                                <div className='flex flex-col gap-[16px]'>
                                    {newsLanding && newsLanding.map(item =>
                                        <div className='flex flex-col gap-[32px]'>
                                            <section className='h-[256px] w-full flex flex-row justify-between'>
                                                {/* GAMBAR / THUMBNAIL BERITA */}
                                                <div className='bg-[var(--bg-secondary)] w-[464px] h-[256px] rounded-xl shrink-0' style={{ border: "1px solid var(--border)" }}>
                                                    <img src={item.thumbnail} alt={`Gambar ${item.judulBerita}`} className=' h-full w-full object-cover rounded-xl' loading='lazy' />
                                                </div>

                                                {/* CONTENT */}
                                                <div className='p-[16px] flex flex-col gap-[16px]'>
                                                    <span className='flex flex-col gap-[4px]'>
                                                        <h1 className='text-base sm:text-base font-bold line-clamp-2'>{item.judulBerita}</h1>
                                                        <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular line-clamp-4">
                                                            {item.deskripsi}
                                                        </p>

                                                    </span>
                                                    <span>
                                                        <p className='text-sm sm:text-sm text-[var(--text-secondary)] font-regular'>Terakhir diupdate: {item.updatedAt.slice(0, 10)}</p>
                                                    </span>
                                                </div>

                                                {/* CTA BUTTON */}
                                                <div className='w-fit h-full flex items-center justify-end'>
                                                    <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-[var(--warna-aksen)] px-[16px] py-[6px]'>Selengkapnya</button>
                                                </div>
                                            </section>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div >


                {/* SEE ALL NEWS */}
                < div className='w-full h-full flex items-center justify-center mt-[32px]' >
                    <button className='rounded-lg text-[green] font-medium text-sm bg-transparent underline px-[16px] py-[6px]'>Lihat semua Berita</button>

                </div >

            </div >
        </>
    )
}

export default NewsPart
