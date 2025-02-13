import React, { useEffect, useState, useContext } from 'react'
import { useMediaQuery } from 'react-responsive';
import { SuccessPopup } from '../Landing/LandingPage';
import { GetTokenContext } from '../../Auth/GetTokenContext';
import { PanelAdminContext } from '../../../Context/ControlPanelAdmin/PanelAdminCtx';

import { PencilIcon } from '../../Icon/ListIcon';
import { CheckIcon } from '../../Icon/ListIcon';
import { LoadingEffect } from '../../Icon/ListIcon';

const DataProfile = () => {
    const isMobile = useMediaQuery({ maxWidth: 640 })
    const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1079 });
    const isDesktop = useMediaQuery({ minWidth: 1080 });

    // CONTEXT TO SAVE / GET TOKEN
    const { token, setToken } = useContext(GetTokenContext)
    const { PanelEditPage, setPanelEditPage } = useContext(PanelAdminContext) // ON EDIT PANEL ADMIN
    const [onSuccesCopyState, setonSuccesCopyState] = useState(false)
    const [onLoading, setOnLoading] = useState(false) // ONLOADING STATE


    // STATE EDITING
    const [onEditTentang, setOnEditTentang] = useState(false)
    const [onEditAkreditasi, setOnEditAkreditasi] = useState(false)
    const [onEditAlamat, setOnEditAlamat] = useState(false)
    const [onEditNSM, setOnEditNSM] = useState(false)
    const [onEditNPSM, setOnEditNPSM] = useState(false)

    // DATA VALUE
    const [tentang, setTentang] = useState(null)
    const [backupValueTentang, setBackupValueTentang] = useState(null)
    async function HandlePatchProfileDataTentang() {
        try {
            setOnLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/patch/adm/profiledata`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ tentang: tentang })
            })
            if (response.ok) {
                const data = await response.json()
                setOnSuccesEdit(data.msg)
                setOnSuccesEditState(true)
                setRefreshData(prev => !prev)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setOnLoading(false)
        }

    }

    const [akreditasi, setAkreditasi] = useState(null)
    const [backupValueAkre, setBackupValueAkre] = useState(null)
    async function HandlePatchProfileDataAkre() {
        try {
            setOnLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/patch/adm/profiledata`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ akreditasi: akreditasi })
            })
            if (response.ok) {
                const data = await response.json()
                setOnSuccesEdit(data.msg)
                setOnSuccesEditState(true)
                setRefreshData(prev => !prev)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setOnLoading(false)
        }
    }

    const [alamat, setAlamat] = useState(null)
    const [backupValueAlamat, setBackupValueAlamat] = useState(null)
    async function HandlePatchProfileDataAlamat() {
        try {
            setOnLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/patch/adm/profiledata`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ alamat: alamat })
            })
            if (response.ok) {
                const data = await response.json()
                setOnSuccesEdit(data.msg)
                setOnSuccesEditState(true)
                setRefreshData(prev => !prev)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setOnLoading(false)
        }
    }

    const [nsm, setNsm] = useState(null)
    const [backupValueNSM, setBackupValueNSM] = useState(null)
    async function HandlePatchProfileDataNSM() {
        try {
            setOnLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/patch/adm/profiledata`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ nsm: nsm })
            })
            if (response.ok) {
                const data = await response.json()
                setOnSuccesEdit(data.msg)
                setOnSuccesEditState(true)
                setRefreshData(prev => !prev)

            }
        } catch (error) {
            console.error(error)
        } finally {
            setOnLoading(false)
        }
    }

    const [npsm, setNpsm] = useState(null)
    const [backupValueNPSM, setBackupValueNPSM] = useState(null)
    async function HandlePatchProfileDataNPSM() {
        try {
            setOnLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/patch/adm/profiledata`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ npsm: npsm })
            })
            if (response.ok) {
                const data = await response.json()
                setOnSuccesEdit(data.msg)
                setOnSuccesEditState(true)
                setRefreshData(prev => !prev)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setOnLoading(false)
        }
    }


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


    const [refreshData, setRefreshData] = useState(false)
    const [profileDataMAN, setProfileDataMAN] = useState([])

    useEffect(() => {
        const GetProfileDataMAN = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BE_URL}/get/adm/profiledata`)
                if (response.ok) {
                    const data = await response.json()
                    setTentang(data[0].tentang)
                    setBackupValueTentang(data[0].tentang)

                    setAkreditasi(data[0].akreditasi)
                    setBackupValueAkre(data[0].akreditasi)

                    setAlamat(data[0].alamat)
                    setBackupValueAlamat(data[0].alamat)

                    setNsm(data[0].nsm)
                    setBackupValueNSM(data[0].nsm)

                    setNpsm(data[0].npsm)
                    setBackupValueNPSM(data[0].npsm)
                }
            } catch (err) {
                console.error(err)
            }
        }
        GetProfileDataMAN()
    }, [refreshData])

    // ON COPY
    const [onCopyText, setOnCopyText] = useState(null)
    async function CopyData(nameField, value) {
        try {
            await navigator.clipboard.writeText(value)
            setonSuccesCopyState(true)
            setOnCopyText(`${nameField} Berhasil disalin!`)
        } catch (err) {
            console.error(err)
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

            {/* POPUP SUKSES COPY */}
            {onSuccesCopyState && (
                <SuccessPopup
                    heading={"Berhasil disalin"}
                    subHeading={onCopyText}
                    button={<button className='bg-[var(--text-primary)] w-fit h-fit py-[6px] px-[16px] rounded-lg text-white text-xs sm:text-sm' onClick={() => setonSuccesCopyState(false)}>Tutup</button>}

                />
            )}
            <style>
                {`
                    .data-sekolah li {
                        display: flex;
                        align-items: center;
                        line-height: 21px;
                        height: 37px;
                    }
                    
                    // .fasilitas-sekolah li {
                    //     display: flex;
                    //     align-items: center;
                    //     width: 220px;
                    //     height: 110px;
                    //     background-color: var(--card);
                    //     padding: 24px;
                    //     border-radius: 12px;
                    //     font-weight: 600;
                    //     border: 1px solid var(--bg-primary);
                    //     font-size: ${isMobile ? '14px' : isDesktop && '16px'}
                    // }
                `}
            </style>

            {/* PROFILE SEKOLAH */}
            <div>
                { /* JUDUL */}
                <div className='w-full h-[60px] flex items-center'>
                    <h1 className='text-[18px] sm:text-xl font-bold'>Profile Madrasah</h1>
                </div>
                {token && PanelEditPage ? (
                    <>
                        {/* TENTANG */}
                        {onEditTentang ? (
                            <span className='flex flex-col gap-[16px] w-full h-full'>
                                <textarea className='w-full text-sm sm:text-sm text-[var(--text-secondary)] min-h-[120px] resize-none p-[16px]' value={tentang} style={{ outline: '1px solid var(--warna-aksen)' }} onChange={(e) => setTentang(e.target.value)} autoFocus />
                                {/* BUTTON EDIT */}
                                <div className=' w-fit flex flex-row gap-[16px] items-center'>
                                    <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] py-[6px] px-[16px] rounded-lg relative'>
                                        <CheckIcon
                                            sizeOnPx={20}
                                            color={"#005eff"} />
                                        <p className='font-[inter] text-white text-xs sm:text-sm ' onClick={() => { HandlePatchProfileDataTentang(); setOnEditTentang(false) }}>Simpan</p>
                                    </span>
                                    <p className='text-xs sm:text-sm text-[var(--text-primary)] cursor-pointer underline' onClick={() => { setTentang(backupValueTentang); setOnEditTentang(false); }}>Cancle</p>
                                </div>
                            </span>
                        ) : (
                            <span className='flex flex-col gap-[16px] w-full h-full'>
                                <span >
                                    <p className=' w-full text-sm sm:text-sm text-[var(--text-secondary)] p-[16px]' style={{ outline: '1px solid var(--aksen-biru)' }}>{tentang}</p>
                                </span>
                                {/* BUTTON EDIT */}
                                <div>
                                    <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] rounded-lg py-[6px] px-[16px]' onClick={() => setOnEditTentang(prev => !prev)}>
                                        <PencilIcon
                                            sizeOnPx={20}
                                            color={"#005eff"} />
                                        <p className='font-[inter] text-white text-xs sm:text-sm '>Edit</p>
                                    </span>
                                </div>
                            </span>
                        )}


                        <div className='w-full h-full flex flex-row items-center gap-[16px] mt-[32px] ' >

                            <div className='w-full h-full pt-[16px]' style={{ borderTop: '1px solid var(--border)' }}>
                                <ul className='data-sekolah w-full h-full flex flex-col gap-[12px] text-sm sm:text-sm text-[var(--text-secondary)] font-regular'>
                                    {/* AKREDITASI */}
                                    {onEditAkreditasi ? (
                                        <li>
                                            <span className='w-full flex flex-row items-center justify-between'>
                                                <p>Akreditasi</p>
                                                <input className='text-[var(--text-primary)] font-bold py-[4px] px-[16px]' style={{ outline: '1px solid var(--warna-aksen)' }} value={akreditasi} autoFocus type='text' onChange={(e) => setAkreditasi(e.target.value)} />
                                            </span>
                                            {/* BUTTON EDIT */}
                                            <div className=' w-fit flex flex-row gap-[16px] items-center pl-[32px]'>
                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] py-[6px] px-[16px] rounded-lg relative'>
                                                    <CheckIcon
                                                        sizeOnPx={20}
                                                        color={"#005eff"} />
                                                    <p className='font-[inter] text-white text-xs sm:text-sm ' onClick={() => { HandlePatchProfileDataAkre(); setOnEditAkreditasi(false) }}>Simpan</p>
                                                </span>
                                                <p className='text-xs sm:text-sm text-[var(--text-primary)] cursor-pointer underline' onClick={() => { setAkreditasi(backupValueAkre); setOnEditAkreditasi(false) }}>Cancle</p>
                                            </div>
                                        </li>
                                    ) : (
                                        <li>
                                            <span className='w-full flex flex-row items-center justify-between'>
                                                {/* BUTTON EDIT */}
                                                <p>Akreditasi</p>
                                                <p className='text-[var(--text-primary)] font-bold py-[4px] px-[16px]' style={{ outline: '1px solid var(--aksen-biru)' }}>{akreditasi}</p>
                                            </span>
                                            <div className='pl-[32px]'>
                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] rounded-lg py-[6px] px-[16px]' onClick={() => setOnEditAkreditasi(prev => !prev)}>
                                                    <PencilIcon
                                                        sizeOnPx={20}
                                                        color={"#005eff"} />
                                                    <p className='font-[inter] text-white text-xs sm:text-sm '>Edit</p>
                                                </span>
                                            </div>
                                        </li>
                                    )}

                                    {onEditAlamat ? (
                                        <li>
                                            <span className='w-full flex flex-row items-center justify-between' >
                                                <p>Alamat</p>
                                                <input type='text' className='text-[var(--text-primary)] py-[4px] px-[16px] w-[50%]' autoFocus value={alamat} style={{ outline: '1px solid var(--warna-aksen)', overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: "nowrap " }} onChange={(e) => setAlamat(e.target.value)} />
                                            </span>
                                            {/* BUTTON EDIT */}
                                            <div className=' w-fit flex flex-row gap-[16px] items-center pl-[32px]'>
                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] py-[6px] px-[16px] rounded-lg relative'>
                                                    <CheckIcon
                                                        sizeOnPx={20}
                                                        color={"#005eff"} />
                                                    <p className='font-[inter] text-white text-xs sm:text-sm ' onClick={() => { HandlePatchProfileDataAlamat(); setOnEditAlamat(false) }}>Simpan</p>
                                                </span>
                                                <p className='text-xs sm:text-sm text-[var(--text-primary)] cursor-pointer underline' onClick={() => { setAlamat(backupValueAlamat); setOnEditAlamat(false); }}>Cancle</p>
                                            </div>
                                        </li>
                                    ) : (
                                        <li>
                                            <span className='w-full flex flex-row items-center justify-between' >
                                                <p>Alamat</p>
                                                <p className='text-[var(--text-primary)] py-[4px] px-[16px]' onClick={() => CopyData('Alamat', alamat)} style={{ outline: '1px solid var(--aksen-biru)' }}>{alamat}</p>
                                            </span>
                                            <div className='pl-[32px]'>
                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] rounded-lg py-[6px] px-[16px]' onClick={() => setOnEditAlamat(prev => !prev)}>
                                                    <PencilIcon
                                                        sizeOnPx={20}
                                                        color={"#005eff"} />
                                                    <p className='font-[inter] text-white text-xs sm:text-sm '>Edit</p>
                                                </span>
                                            </div>
                                        </li>
                                    )}

                                    {onEditNSM ? (
                                        <li>
                                            <span className='w-full flex flex-row items-center justify-between'>
                                                <p>NSM (Nomor Statistik Madrasah)</p>
                                                <input type='text' value={nsm} className='text-[var(--text-primary)] py-[4px] px-[16px]' autoFocus style={{ outline: '1px solid var(--warna-aksen)', overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: "nowrap " }} onChange={(e) => setNsm(e.target.value)} />
                                            </span>
                                            {/* BUTTON EDIT */}
                                            <div className=' w-fit flex flex-row gap-[16px] items-center pl-[32px]'>
                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] py-[6px] px-[16px] rounded-lg relative'>
                                                    <CheckIcon
                                                        sizeOnPx={20}
                                                        color={"#005eff"} />
                                                    <p className='font-[inter] text-white text-xs sm:text-sm ' onClick={() => { HandlePatchProfileDataNSM(); setOnEditNSM(false) }}>Simpan</p>
                                                </span>
                                                <p className='text-xs sm:text-sm text-[var(--text-primary)] cursor-pointer underline' onClick={() => { setNsm(backupValueNSM); setOnEditNSM(false); }}>Cancle</p>
                                            </div>
                                        </li>
                                    ) : (
                                        <li>
                                            <span className='w-full flex flex-row items-center justify-between'>
                                                <p>NSM (Nomor Statistik Madrasah)</p>
                                                <p className='text-[var(--text-primary)] py-[4px] px-[16px]' onClick={() => CopyData('NSM', nsm)} style={{ outline: '1px solid var(--aksen-biru)' }}>{nsm}</p>
                                            </span>
                                            <div className='pl-[32px]'>
                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] rounded-lg py-[6px] px-[16px]' onClick={() => setOnEditNSM(prev => !prev)}>
                                                    <PencilIcon
                                                        sizeOnPx={20}
                                                        color={"#005eff"} />
                                                    <p className='font-[inter] text-white text-xs sm:text-sm '>Edit</p>
                                                </span>
                                            </div>
                                        </li>
                                    )}

                                    {onEditNPSM ? (
                                        <li>
                                            <span className='w-full flex flex-row items-center justify-between'>
                                                <p>NPSN (Nomor Pokok Sekolah Nasional)</p>
                                                <input type='text' className='text-[var(--text-primary)] px-[16px] py-[4px]' value={npsm} autoFocus style={{ outline: '1px solid var(--warna-aksen)', overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: "nowrap " }} onChange={(e) => setNpsm(e.target.value)} />
                                            </span>
                                            {/* BUTTON EDIT */}
                                            <div className=' w-fit flex flex-row gap-[16px] items-center pl-[32px]'>
                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] py-[6px] px-[16px] rounded-lg relative'>
                                                    <CheckIcon
                                                        sizeOnPx={20}
                                                        color={"#005eff"} />
                                                    <p className='font-[inter] text-white text-xs sm:text-sm ' onClick={() => { HandlePatchProfileDataNPSM(); setOnEditNPSM(false) }}>Simpan</p>
                                                </span>
                                                <p className='text-xs sm:text-sm text-[var(--text-primary)] cursor-pointer underline' onClick={() => { setNpsm(backupValueNPSM); setOnEditNPSM(false); }}>Cancle</p>
                                            </div>
                                        </li>
                                    ) : (
                                        <li>
                                            <span className='w-full flex flex-row items-center justify-between'>
                                                <p>NPSN (Nomor Pokok Sekolah Nasional)</p>
                                                <p className='text-[var(--text-primary)] py-[4px] px-[16px]' onClick={() => CopyData('NPSM', npsm)} style={{ outline: '1px solid var(--aksen-biru)' }}>{npsm}</p>
                                            </span>
                                            <div className='pl-[32px]'>
                                                <span className='w-fit h-fit flex flex-row items-center gap-[8px] cursor-pointer bg-[var(--text-primary)] rounded-lg py-[6px] px-[16px]' onClick={() => setOnEditNPSM(prev => !prev)}>
                                                    <PencilIcon
                                                        sizeOnPx={20}
                                                        color={"#005eff"} />
                                                    <p className='font-[inter] text-white text-xs sm:text-sm '>Edit</p>
                                                </span>
                                            </div>
                                        </li>
                                    )}



                                </ul>
                            </div>
                        </div>


                    </>
                ) : (
                    <>
                        <span >
                            <p className=' w-full text-sm sm:text-sm text-[var(--text-secondary)]'>{tentang}</p>
                        </span>

                        <div className='w-full h-full flex flex-row items-center gap-[16px] mt-[32px] ' >

                            <div className='w-full h-full pt-[16px]' style={{ borderTop: '1px solid var(--border)' }}>
                                <ul className='data-sekolah w-full h-full flex flex-col gap-[12px] text-sm sm:text-sm text-[var(--text-secondary)] font-regular'>
                                    <li>
                                        <span className='w-full flex flex-row items-center justify-between'>
                                            <p>Akreditasi</p>
                                            <p className='text-[var(--text-primary)] font-bold'>{akreditasi}</p>
                                        </span>
                                    </li>
                                    <li>
                                        <span className='w-full flex flex-row items-center justify-between' >
                                            <p>Alamat</p>
                                            <p className='text-[var(--text-primary)]' onClick={() => CopyData('Alamat', alamat)}><i class="fa-regular fa-copy" ></i> {alamat}</p>
                                        </span>
                                    </li>
                                    <li>
                                        <span className='w-full flex flex-row items-center justify-between'>
                                            <p>NSM (Nomor Statistik Madrasah)</p>
                                            <p className='text-[var(--text-primary)]' onClick={() => CopyData('NSM', nsm)}><i class="fa-regular fa-copy"></i> {nsm}</p>
                                        </span>
                                    </li>
                                    <li>
                                        <span className='w-full flex flex-row items-center justify-between'>
                                            <p>NPSN (Nomor Pokok Sekolah Nasional)</p>
                                            <p className='text-[var(--text-primary)]' onClick={() => CopyData('NPSM', npsm)}><i class="fa-regular fa-copy" ></i> {npsm}</p>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}


            </div>

            {/* DATA SEKOLAH */}
            <div className='my-[24px]'>
                {/* JUDUL */}
                <div className='w-full h-[60px] flex items-center'>
                    <h1 className='text-[18px] sm:text-xl font-bold'>Sarana dan Prasarana</h1>
                </div>

                <div className='fasilitas-sekolah w-full h-full flex flex-row gap-[16px] text-sm sm:text-base text-[var(--text-primary)] overflow-x-auto pb-[16px]'>
                    {/* PERPUSTAKAAN */}
                    <div className='w-fit h-fit flex flex-col gap-[12px] shrink-0'>
                        <div class="flex items-center w-[220px] h-[110px] bg-card rounded-[12px] font-semibold border border-bg-primary text-[14px] sm:text-[16px] relative">
                            <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1738244880/Perpus_byxisp.jpg" alt="Lab IPA" className='w-full h-full object-cover rounded-lg' />
                        </div>
                        <span className='flex flex-col w-full h-full font-regular text-[var(--text-primary)]'>
                            <p className='text-sm sm:text-sm font-semibold'>Perpustakaan</p>
                            {/* <p className='text-[var(--text-secondary)] font-[400] text-xs sm:text-sm'>Adzikra Library</p> */}
                        </span>
                    </div>

                    {/* LAB KOMPUTER */}
                    <div className='w-fit h-fit flex flex-col gap-[12px] shrink-0'>
                        <div class="flex items-center w-[220px] h-[110px] bg-card rounded-[12px] font-semibold border border-bg-primary text-[14px] sm:text-[16px] relative">
                            <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1738246127/LabKomputer_tadflw.jpg" alt="Lab IPA" className='w-full h-full object-cover rounded-xl' />
                        </div>
                        <span className='flex w-full h-full font-regular text-[var(--text-primary)]'>
                            <p className='text-sm sm:text-sm font-semibold'>Lab Komputer</p>
                        </span>
                    </div>

                    {/* LAB IPA */}
                    <div className='w-fit h-fit flex flex-col gap-[12px] shrink-0'>
                        <div class="flex items-center w-[220px] h-[110px] bg-card rounded-[12px] font-semibold border border-bg-primary text-[14px] sm:text-[16px] relative">
                            <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1738244881/LabIPA_k0mzbd.jpg" alt="Lab IPA" className='w-full h-full object-cover rounded-xl' />
                        </div>
                        <span className='flex w-full h-full font-regular text-[var(--text-primary)]'>
                            <p className='text-sm sm:text-sm font-semibold'>Lab IPA</p>
                        </span>
                    </div>



                    {/* UKS */}
                    <div class="flex items-center justify-center w-[220px] h-[110px] bg-[var(--card)] rounded-[12px] font-semibold border border-bg-primary text-[14px] sm:text-[16px] shrink-0">
                        <span className='w-full h-full flex items-center justify-center'>
                            <p className='font-semibold text-[var(--text-primary)] text-sm'>UKS</p>
                        </span>
                    </div>

                </div>

            </div>
        </>
    )
}

export default DataProfile
