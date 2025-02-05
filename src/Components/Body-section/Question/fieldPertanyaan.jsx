import React from 'react'

const FieldPertanyaan = () => {
    return (
        <div className='w-fit h-full flex flex-col justify-between  mt-[24px] bg-[var(--card)] rounded-xl'>
            <div className='w-full h-fit flex flex-col gap-[2px] mb-[16px] '>
                <h1 className='text-[18px] sm:text-lg font-bold leading-[1]'>Ada Pertanyaan?</h1>
                <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular font-['inter']">Masukkan pertanyaan dibawah ini, seputar sekolah atau informasi seputar SNPDB MAN 1 Kota Tangerang.</p>
            </div>
            <div className='flex w-full h-fit gap-[16px] bg-[var(--card] rounded-lg flex flex-col' >
                <textarea name="" id="" className='w-full focus:outline-none rounded-lg resize-none px-[16px] py-[6px]' style={{ border: '0px solid var(--text-primary)' }}/>
                <button className='w-fit bg-[var(--warna-aksen)] px-[16px] py-[6px] rounded-xl text-sm '>Kirim</button>
            </div>
        </div>
    )
}

export default FieldPertanyaan  
