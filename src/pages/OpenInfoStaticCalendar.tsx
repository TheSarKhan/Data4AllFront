import OpenInfoCalendar from "@/components/OpenInfoCalendar"

const OpenInfoStaticCalendar = () => {
  return (
    <div className="px-4 lg:px-8 xl:px-10 py-6 flex items-center">
      <div className="w-full lg:ml-32">
        <h1 className="text-white text-4xl font-semibold mb-9">Statistik təqvim</h1>
        <OpenInfoCalendar/>
      </div>
    </div>
  )
}

export default OpenInfoStaticCalendar