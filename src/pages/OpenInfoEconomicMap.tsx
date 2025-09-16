const OpenInfoEconomicMap = () => {
    return (

        <div className="px-4 lg:px-8 xl:px-10 py-6 flex items-center">
            <div className="w-full lg:ml-32">
                <div className="mb-28">
                    <h1 className="md:text-4xl text-white font-semibold">Xəritə üzrə iqtisadi göstəricilər</h1>
                    <div className="flex flex-wrap gap-4 mt-11">
                        <button className="p-5 bg-[rgba(255,255,255,0.15)] rounded-[8px] text-white font-medium text-lg">Restoran və kofeşoplar</button>
                        <button className="p-5 bg-[rgba(255,255,255,0.15)] rounded-[8px] text-white font-medium text-lg">İstirahət yerləri</button>
                        <button className="p-5 bg-[rgba(255,255,255,0.15)] rounded-[8px] text-white font-medium text-lg">Turizm zonaları</button>
                        <button className="p-5 bg-[rgba(255,255,255,0.15)] rounded-[8px] text-white font-medium text-lg">Otellərin və əşyalı mənzillərin siyahısı</button>
                        <button className="p-5 bg-[rgba(255,255,255,0.15)] rounded-[8px] text-white font-medium text-lg">Hava limanlarının siyahısı</button>
                        <button className="p-5 bg-[rgba(255,255,255,0.15)] rounded-[8px] text-white font-medium text-lg">Digərlər</button>
                    </div>
                    <div className="w-full lg:h-[450px] mt-28">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.67591050896!2d49.84348767652873!3d40.3717099583774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dade1cdd6cd%3A0x78973258d3b861e5!2zRGlqaXRhbCBHZWxpxZ9pbSB2ZSBVbGHFn8SxbSBCYWthbmzEscSfxLE!5e0!3m2!1str!2saz!4v1757675024187!5m2!1str!2saz"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
                </div>
            </div>
        </div>
    )
}

export default OpenInfoEconomicMap