import { useState } from "react";
import { Pencil, XCircle, Download, ChevronDown, Search } from "lucide-react";

// Mock EditBookingModal Component
const EditBookingModal = ({ isEditOpen, selectedBooking, closeModal, handleChange, handleSave }) => {
  if (!isEditOpen || !selectedBooking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <XCircle size={24} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Booking</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
            <input
              type="text"
              name="user"
              value={selectedBooking.user || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={selectedBooking.status || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="UPCOMING">Upcoming</option>
              <option value="LIVE">Live</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <button
            onClick={() => handleSave(selectedBooking)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ManageBookings() {
  // Static mock data
  const [bookings, setBookings] = useState([
    {
      id: "1",
      user: "John Doe",
      event: "Summer Music Festival",
      date: "2024-07-15",
      time: "18:00",
      tickets: "A1, A2",
      status: "UPCOMING",
      price: 150
    },
    {
      id: "2",
      user: "Jane Smith",
      event: "Tech Conference 2024",
      date: "2024-08-20",
      time: "09:00",
      tickets: "VIP-1",
      status: "LIVE",
      price: 299
    },
    {
      id: "3",
      user: "Mike Johnson",
      event: "Art Gallery Opening",
      date: "2024-06-10",
      time: "19:30",
      tickets: "General-5",
      status: "COMPLETED",
      price: 50
    }
  ]);

  // UI Logic States (No Functional Logic)
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEditModal = (booking) => {
    setSelectedBooking(booking);
    setIsEditOpen(true);
  };

  const closeModal = () => {
    setIsEditOpen(false);
    setSelectedBooking(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (data) => {
    console.log("Saving booking data:", data);
    setBookings(prev => prev.map(b => b.id === data.id ? data : b));
    closeModal();
  };

  const deleteBooking = (booking) => {
    console.log("Deleting booking:", booking.id);
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings(prev => prev.filter(b => b.id !== booking.id));
    }
  };

  const handleExport = () => {
    console.log("Export button clicked");
  }

  // Extract unique events for the UI dropdown
  const uniqueEvents = [...new Set(bookings.map((b) => b.event))];

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
        <p className="text-gray-500 mt-1">
          View, create, and manage all ticket bookings
        </p>
      </div>

      {/* Filters (Visual Only) */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 w-full">

          {/* Search Icon */}
          <button
            className="cursor-pointer relative left-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 shadow-md transition"
          >
            <Search size={16} />
          </button>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by ID, user, or event..."
            className="px-5 py-2 pr-12 rounded-full border border-gray-200 bg-white shadow-sm w-72 focus:outline-none focus:ring-2 focus:ring-orange-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none px-5 py-2 pr-10 rounded-full border border-gray-200 bg-white shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              <option value="">All Status</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="LIVE">Live</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Event Filter */}
          <div className="relative">
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="appearance-none px-5 py-2 pr-10 rounded-full border border-gray-200 bg-white shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              <option value="">All Events</option>
              {uniqueEvents.map((event, index) => (
                event && (
                  <option key={index} value={event}>
                    {event}
                  </option>
                )
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

        </div>

        <button className="cursor-pointer flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition"
          onClick={handleExport}>
          <Download size={16} /> Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-t-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-orange-50 text-gray-800 font-semibold">
            <tr>
              <th className="p-4 text-left">Booking ID</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Event</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Tickets</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-600">#{booking.id}</td>
                <td className="p-4 font-medium text-gray-900">{booking.user}</td>
                <td className="p-4 text-gray-600">{booking.event}</td>
                <td className="p-4 text-gray-600">{booking.date}</td>
                <td className="p-4 text-gray-600">{booking.time}</td>
                <td className="p-4 text-gray-600">{booking.tickets}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize 
                                        ${booking.status === "UPCOMING"
                        ? "bg-blue-100 text-blue-700"
                        : booking.status === "LIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {booking.status.toLowerCase()}
                  </span>
                </td>

                <td className="p-4 text-center flex items-center justify-center gap-2">
                  <button
                    onClick={() => openEditModal(booking)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteBooking(booking)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                    title="Delete"
                  >
                    <XCircle size={18} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditBookingModal
        isEditOpen={isEditOpen}
        selectedBooking={selectedBooking}
        closeModal={closeModal}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    </div>
  );
}
