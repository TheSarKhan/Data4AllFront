import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"


const OpenInfoCalendar = () => {
  return (
    <div className='bg-white rounded-lg p-4'>
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
            headerToolbar={
                {
                    start: 'title', // will normally be on the left. if RTL, will be on the right
                    center: '',
                    end: 'dayGridMonth,timeGridWeek prev,next today' // will normally be on the right. if RTL, will be on the 
                  }
            }
        />
    </div>
  )
}

export default OpenInfoCalendar