import React from 'react'

const HomeAdmin = () => {
    const [outputDataPeserta, setOutputDataPeserta] = useState([]) //State untuk output data peserta

    // GET OUTPUT (UNTUK ADMIN PANEL!)
    useEffect(() => {
        const GetDataFromDB = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BE_URL}/user`, {
                    method: 'GET'
                })
                if (response.ok) {
                    const data = await response.json()
                    setOutputDataPeserta(data)
                    console.log(data)
                }
            }
            catch (error) {
                console.error(error)
            }
        }
        GetDataFromDB()
    }, [])

    // HAPUS AKUN PESERTA
    async function HandleDeletePesertaPPDB(IdPeserta) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/user/${IdPeserta}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                // outputDataPeserta((prev => prev.filter(item => item.id !== IdPeserta)))
                const updatedData = await fetch(`${process.env.REACT_APP_BE_URL}/user`);
                const newData = await updatedData.json();
                setOutputDataPeserta(newData); // Update state dengan data terbaru
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">No</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Nama</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {outputDataPeserta.map((item, index) =>
                        <tr key={item.id} className="odd:bg-white even:bg-gray-50" onClick={() => console.log(item.id)}>
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <div className='flex flex-row items-center'>
                                    <button className='bg-[green] w-full h-full text-white p-[4px]'>Edit</button>
                                    <button className='bg-[tomato] w-full h-full text-white p-[4px]' onClick={() => HandleDeletePesertaPPDB(item.id)}>Delete</button>
                                </div>
                            </td>

                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default HomeAdmin
