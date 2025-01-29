import React from 'react'
import { useMediaQuery } from 'react-responsive'

const NewsPart = () => {
    const isMobile = useMediaQuery({ maxWidth: 640 })
    const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1079 });
    const isDesktop = useMediaQuery({ minWidth: 1080 });

    return (
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
                        <section className='h-fit w-full flex flex-col justify-between gap-[16px]'>
                            {/* GAMBAR / THUMBNAIL BERITA */}
                            <div className='bg-[var(--bg-secondary)] w-full max-w-[464px] h-[256px] rounded-xl' style={{ border: "1px solid var(--border)" }}>
                                <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737952463/header-image_sephfa.webp" alt="" className=' h-full w-full object-cover rounded-xl' loading='lazy' />
                            </div>

                            {/* CONTENT */}
                            <div className='flex flex-col gap-[16px]'>
                                <span className='flex flex-col gap-[4px]'>
                                    <h1 className='text-base sm:text-lg font-bold line-clamp-2'>Peserta didik tahun ajaran 2025</h1>
                                    <p className="text-sm sm:text-base text-[var(--text-secondary)] font-regular line-clamp-4">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex fugit quod nulla accusamus eaque, odit obcaecati illo hic omnis vero id magni blanditiis dolorum. Quaerat esse expedita facilis quam mollitia!
                                    </p>

                                </span>
                                <span>
                                    <p className='text-sm sm:text-base text-[var(--text-secondary)] font-regular'>23 Januari 2025</p>
                                </span>
                            </div>

                            {/* CTA BUTTON */}
                            <div className='w-fit h-full flex items-center justify-end'>
                                <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-[var(--warna-aksen)] px-[16px] py-[6px]'>Selengkapnya</button>
                            </div>
                        </section>
                    </div>

                )}

                {isTablet && (
                    <div className='flex flex-col gap-[32px]'>
                        <section className='h-[256px] w-full flex flex-row justify-between'>
                            {/* GAMBAR / THUMBNAIL BERITA */}
                            <div className='bg-[var(--bg-secondary)] w-full min-w-[232px] max-w-[464px] h-[256px] rounded-xl' style={{ border: "1px solid var(--border)" }}>
                                <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737952463/header-image_sephfa.webp" alt="" className=' h-full w-full object-cover rounded-xl' loading='lazy' />
                            </div>

                            {/* CONTENT */}
                            <div className='p-[16px] flex flex-col gap-[16px]'>
                                <span className='flex flex-col gap-[4px]'>
                                    <h1 className='text-base sm:text-lg font-bold line-clamp-2'>Peserta didik tahun ajaran 2025</h1>
                                    <p className="text-sm sm:text-base text-[var(--text-secondary)] font-regular line-clamp-4">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex fugit quod nulla accusamus eaque, odit obcaecati illo hic omnis vero id magni blanditiis dolorum. Quaerat esse expedita facilis quam mollitia!
                                    </p>

                                </span>
                                <span>
                                    <p className='text-sm sm:text-base text-[var(--text-secondary)] font-regular'>23 Januari 2025</p>
                                </span>
                            </div>

                            {/* CTA BUTTON */}
                            <div className='w-fit h-full flex items-center justify-end'>
                                <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-[var(--warna-aksen)] px-[16px] py-[6px]'>Selengkapnya</button>
                            </div>
                        </section>
                    </div>
                )}

                {isDesktop && (
                    <div className='flex flex-col gap-[16px]'>

                        <div className='flex flex-col gap-[32px]'>
                            <section className='h-[256px] w-full flex flex-row justify-between'>
                                {/* GAMBAR / THUMBNAIL BERITA */}
                                <div className='bg-[var(--bg-secondary)] w-[464px] h-[256px] rounded-xl shrink-0' style={{ border: "1px solid var(--border)" }}>
                                    <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737952463/header-image_sephfa.webp" alt="" className=' h-full w-full object-cover rounded-xl' loading='lazy' />
                                </div>

                                {/* CONTENT */}
                                <div className='p-[16px] flex flex-col gap-[16px]'>
                                    <span className='flex flex-col gap-[4px]'>
                                        <h1 className='text-base sm:text-base font-bold line-clamp-2'>Peserta didik tahun ajaran 2025</h1>
                                        <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular line-clamp-4">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex fugit quod nulla accusamus eaque, odit obcaecati illo hic omnis vero id magni blanditiis dolorum. Quaerat esse expedita facilis quam mollitia!
                                        </p>

                                    </span>
                                    <span>
                                        <p className='text-sm sm:text-sm text-[var(--text-secondary)] font-regular'>23 Januari 2025</p>
                                    </span>
                                </div>

                                {/* CTA BUTTON */}
                                <div className='w-fit h-full flex items-center justify-end'>
                                    <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-[var(--warna-aksen)] px-[16px] py-[6px]'>Selengkapnya</button>
                                </div>
                            </section>
                        </div>
                        <div className='flex flex-col gap-[32px]'>
                            <section className='h-[256px] w-full flex flex-row justify-between'>
                                {/* GAMBAR / THUMBNAIL BERITA */}
                                <div className='bg-[var(--bg-secondary)] w-[464px] h-[256px] rounded-xl shrink-0' style={{ border: "1px solid var(--border)" }}>
                                    <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737952463/header-image_sephfa.webp" alt="" className=' h-full w-full object-cover rounded-xl' loading='lazy' />
                                </div>

                                {/* CONTENT */}
                                <div className='p-[16px] flex flex-col gap-[16px]'>
                                    <span className='flex flex-col gap-[4px]'>
                                        <h1 className='text-base sm:text-base font-bold line-clamp-2'>Peserta didik tahun ajaran 2025</h1>
                                        <p className="text-sm sm:text-sm text-[var(--text-secondary)] font-regular line-clamp-4">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex fugit quod nulla accusamus eaque, odit obcaecati illo hic omnis vero id magni blanditiis dolorum. Quaerat esse expedita facilis quam mollitia!
                                        </p>

                                    </span>
                                    <span>
                                        <p className='text-sm sm:text-sm text-[var(--text-secondary)] font-regular'>23 Januari 2025</p>
                                    </span>
                                </div>

                                {/* CTA BUTTON */}
                                <div className='w-fit h-full flex items-center justify-end'>
                                    <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-[var(--warna-aksen)] px-[16px] py-[6px]'>Selengkapnya</button>
                                </div>
                            </section>
                        </div>
                    </div>

                )}
            </div>


            {/* SEE ALL NEWS */}
            <div className='w-full h-full flex items-center justify-center mt-[32px]'>
                <button className='rounded-lg text-[var(--text-primary)] font-medium text-sm bg-transparent underline px-[16px] py-[6px]'>Lihat semua Berita</button>

            </div>

        </div >
    )
}

export default NewsPart
