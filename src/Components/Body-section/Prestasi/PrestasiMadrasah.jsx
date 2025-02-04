import React, { useEffect, useState } from 'react'

export const PrestasiMadrasah = () => {
    // GET OUTPUT PRESTASI FROM ADMIN
    const [outputPrestasi, setOutputPrestasi] = useState([])
    useEffect(() => {
        const getPrestasiMan = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BE_URL}/prestasi`, {
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

            <div className='overflow-x-auto pb-[16px]'>
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        {/* BG-GRAY-100 */}
                        <tr className="bg-[var(--warna-aksen)]">
                            <th className="border border-gray-300 px-4 py-2 text-left">Prestasi</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Tingkat</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Deskripsi</th>
                            {/* <th className="border border-gray-300 px-4 py-2 text-left">File Pendukung</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {outputPrestasi.map((item, index) =>
                            <tr key={index} className="odd:bg-white even:bg-gray-100 text-sm sm:text-sm" onClick={() => console.log(item.id)}>
                                <td className="border border-gray-300 px-4 py-2">{item.prestasi === '' || null ? '-' : item.prestasi}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.tingkat === '' || null ? '-' : item.tingkat}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.deskripsi === '' || null ? '-' : item.deskripsi}</td>
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
    )
}
