import { Checkbox, FormControlLabel } from "@mui/material"

const OpenInfoDataRequest = () => {

  return (
    <div className="px-4 lg:px-8 xl:px-10 py-6 flex items-center">
      <div className="w-full lg:ml-32">
        <div className="bg-[#0706186E] flex flex-col items-center text-white p-16 rounded-3xl">
          <h1 className="mb-16 font-semibold text-4xl">Dataset sorğusu</h1>
          <form className="flex flex-col gap-8 w-full">
          <div>
          <label htmlFor="fullName" className="text-lg">Adı və soyadı</label>
          <input
            type="text"
            name="fullName"
            className="w-full bg-transparent border border-[#66666659] rounded-lg p-3 outline-none focus:border-blue-500 mt-2"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 text-lg">Elektron poçt ünvanı</label>
          <input
            type="text"
            name="email"
            className="w-full bg-transparent border border-[#66666659] rounded-lg p-3 outline-none focus:border-blue-500 mt-2"
            required
          />
        </div>
        <div>
          <label htmlFor="number" className="mb-2 text-lg">Nömrə</label>
          <input
            type="text"
            name="number"
            className="w-full bg-transparent border border-[#66666659] rounded-lg p-3 outline-none focus:border-blue-500 mt-2"
            required
          />
        </div>
        <div>
          <label htmlFor="type" className="mb-2 text-lg">Müraciətin növü</label>
          <input
            type="text"
            name="type"
            className="w-full bg-transparent border border-[#66666659] rounded-lg p-3 outline-none focus:border-blue-500 mt-2"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="mb-2 text-lg">Dataset adı</label>
          <input
            type="text"
            name="subject"
            className="w-full bg-transparent border border-[#66666659] rounded-lg p-3 outline-none focus:border-blue-500 mt-2"
            required
          />
        </div>
        <div>
          <label htmlFor="purpose" className="mb-2 text-lg">Sorğunun məqsədi</label>
          <input
            type="text"
            name="purpose"
            className="w-full bg-transparent border border-[#66666659] rounded-lg p-3 outline-none focus:border-blue-500 mt-2"
            required
          />
        </div>
        <div>
        <label htmlFor="purpose" className="mb-2 text-lg">Qeydlər</label>
        <textarea
            id="message"
            name="message"
            placeholder="Mesaj yazın..."
            rows={5}
            className="w-full bg-transparent border border-[#66666659] rounded-lg p-3 outline-none focus:border-blue-500 resize-none mt-2"
            required
          ></textarea>
        </div>
          <div className="flex justify-baseline">
          <FormControlLabel required control={<Checkbox defaultChecked />} label="Mən robot deyiləm" />
          </div>

          <button className="bg-[#3460DC] rounded-lg py-3.5 font-medium text-lg">Göndər</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OpenInfoDataRequest