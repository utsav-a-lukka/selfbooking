import { useState, useEffect } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import BookingModal from "../../Components/BookingModal.jsx";

// Simple helper to mimic getStatus behavior if needed for future logic, 
// though currently we just display static events.
const getStatus = (dateStr, timeStr) => {
  // Placeholder logic for status
  return "UPCOMING";
};

const Events = () => {

  // Mocking user for static version if needed, or safer access
  const getUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem('authDetail-tickethub'));
      return user?.id;
    } catch (e) {
      return null;
    }
  };
  const id = getUserId();

  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Static Data
  const staticEvents = [
    {
      id: 1,
      title: "Tech Conference 2025",
      description: "Join us for the biggest tech conference of the year featuring industry leaders.",
      date: "2025-10-15T09:00:00",
      time: "09:00 AM",
      capacity: 200,
      bookingCount: 150,
      price: 299,
    },
  ];

  const loadEvents = async () => {
    // SIMULATED: const res = awaitinitials ApiService.post("/events/list", {})

    const formattedData = staticEvents.map((event) => {
      const isoDate = event.date;
      const date = new Date(isoDate);
      const options = { month: "short", day: "2-digit", year: "numeric" };
      const formatted = date.toLocaleDateString("en-US", options);

      // Logic regarding status counts removed as dashboard stats are not part of this component's scope

      return { ...event, date: formatted };
    });

    setEvents(formattedData);
    // Dashboard statistics logic removed as it relied on external state/props not present.
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleBooking = async (data) => {
    // SIMULATED: const response = await ApiService.post("/tickets/add", payload)

    const payload = {
      eventId: data.id,
      userId: id,
      price: data.total,
      noOfTickets: data.ticketCount,
      seats: data.seats
    };

    console.log("Booking Payload (Static):", payload);
    alert("Booking Successful (Static Mode)");

    // loadEvents(); // No need to reload for static
    setOpen(false);
  }

  return (
    <>
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {event.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-5 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} /> {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} /> {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} /> {parseInt(event.bookingCount)}/{event.capacity} booked
                    </div>
                  </div>

                  <div className="mt-6">
                    {/* Availability Bar */}
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Availability</span>
                      <span>{Math.max(0, 100 - Math.round((parseInt(event.bookingCount) / event.capacity) * 100))}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-200">
                      <div
                        className="h-2 bg-orange-500 rounded-full"
                        style={{ width: `${Math.min(100, Math.max(0, 100 - (parseInt(event.bookingCount) / event.capacity) * 100))}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4 mt-6">
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-xl font-bold">${event.price}</p>
                  </div>

                  <button
                    className="bg-orange-500 text-white cursor-pointer px-6 py-2 rounded-full text-sm hover:bg-orange-600 transition"
                    onClick={() => {
                      setSelectedEvent(event);
                      setOpen(true);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}

          {open && (
            <BookingModal
              event={selectedEvent}
              isOpen={open}
              onConfirm={handleBooking}
              onClose={() => setOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Events;
