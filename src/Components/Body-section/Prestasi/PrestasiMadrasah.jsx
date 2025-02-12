import React, { useEffect, useState, useContext } from 'react'
import { GetTokenContext } from '../../Auth/GetTokenContext'
import { PanelAdminContext } from '../../../Context/ControlPanelAdmin/PanelAdminCtx'

export const PrestasiMadrasah = () => {
    // CONTEXT TO SAVE / GET TOKEN
    const { token, setToken } = useContext(GetTokenContext)
    const { PanelEditPage, setPanelEditPage } = useContext(PanelAdminContext)

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
    }, [])

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



    return (

        <div>
            {/* JUDUL */}
            <div className='w-full h-[60px] flex flex-col gap-[2px] mb-[16px]'>
                <h1 className='text-[18px] sm:text-xl font-bold leading-[1]'>Prestasi Madrasah</h1>
                <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular">Pencapaian prestasi yang didapat oleh MAN 1 Kota Tangerang</p>
            </div>

            <div className='overflow-x-auto pb-[16px] rounded-lg'>
                <div class="relative overflow-x-auto sm:rounded-lg border-r border-l border-gray-50">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                        Sunting
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {outputPrestasi.map((item, index) =>
                                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-50 border-b" onClick={() => console.log(item.id)}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.prestasi === '' || null ? '-' : item.prestasi}</th>
                                    <td className="px-6 py-4">{item.tingkat === '' || null ? '-' : item.tingkat}</td>
                                    <td className="px-6 py-4">{item.tahun === '' || null ? '-' : item.tahun}</td>
                                    <td className="px-6 py-4">{item.deskripsi === '' || null ? '-' : item.deskripsi}</td>
                                    <td className="px-6 py-4">{item.filePendukung === '' || null ? '-' : item.filePendukung}</td>
                                    {token && PanelEditPage && (
                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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
    )
}
