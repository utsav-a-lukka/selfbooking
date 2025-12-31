import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Clock,
  Users,
  DollarSign,
  X
} from "lucide-react";
import { Apiservice } from "../../services/Apiservice";

const AdminEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    capacity: 100,
    price: 0
  });

  useEffect(() => {
    getAllEvents()
  },[])
  useEffect(() => {
    console.log(formData);
    
  }, [formData]);

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /* ---------------- FORM VALIDATION ---------------- */
  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.date) {
      newErrors.date = "Event date is required";
    }

    if (!formData.time) {
      newErrors.time = "Event time is required";
    }

    if (!formData.capacity) {
      newErrors.capacity = "Capacity is required";
    } else if (formData.capacity <= 0) {
      newErrors.capacity = "Capacity must be greater than 0";
    }

    if (!formData.price && formData.price !== 0) {
      newErrors.price = "Price is required";
    } else if (formData.price < 0) {
      newErrors.price = "Price cannot be negative";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- MODAL HANDLERS ---------------- */
  const openAddModal = () => {
    setEditingEvent(null);
    setErrors({});
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      capacity: 100,
      price: 0
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    console.log("Submitting Event Data:", formData);
    if (editingEvent) {
      const res = await Apiservice.put(`event/update/${editingEvent.id}`, formData);
      console.log('updating the event',res);
    } else { 
      const res = await Apiservice.post("event/create", formData);
      console.log('creating the event',res);
    }
    getAllEvents();
    setShowModal(false);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setErrors({});
    setFormData({
      ...event,
      date: event.date.split('T')[0] // Format date for input
    });
    setShowModal(true);
  };

  const handleDelete = async(id) => {
    await Apiservice.delete(`event/delete/${id}`);
    getAllEvents()
  };

  const toggleStatus = async(event) => {
    await Apiservice.put(`event/update/${event.id}`, { active: !event.active });
    getAllEvents();
  };

  const getAllEvents = async() => {
    const res = await Apiservice.get("event/list")
    setEvents(res.data)
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Manage Events</h1>
          <p className="text-gray-500">Create and manage events (Static Mode)</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full"
        >
          <Plus size={18} /> Add Event
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {events.map((event) => {
          const progress =
            ((parseInt(event.booked) / event.capacity) * 100).toFixed(1);

          return (
            <div
              key={event.id}
              className="bg-white p-6 rounded-3xl shadow border"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold">{event.title}</h2>
                  <span className="text-xs text-red-500">
                    {event.active ? "active" : "inactive"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Pencil
                    onClick={() => openEditModal(event)}
                    className="cursor-pointer"
                  />
                  <Trash2
                    onClick={() => handleDelete(event.id)}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <p className="text-gray-600 mt-2">{event.description}</p>

              {/* Info */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="flex items-center gap-2 bg-blue-100 p-2 rounded-full">
                  <Calendar size={16} />
                  {event.date.split("T")[0]}
                </div>

                <div className="flex items-center gap-2 bg-purple-100 p-2 rounded-full">
                  <Clock size={16} />
                  {event.time}
                </div>

                <div className="flex items-center gap-2 bg-yellow-100 p-2 rounded-full">
                  <Users size={16} />
                  {event.bookingCount} / {event.capacity}
                </div>

                <div className="flex items-center gap-2 bg-green-100 p-2 rounded-full">
                  <DollarSign size={16} />
                  ${event.price}
                </div>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span>Booking</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-indigo-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Toggle */}
              <div className="flex justify-between mt-4 items-center">
                <span>Status</span>
                <button
                  onClick={() => toggleStatus(event)}
                  className={`w-12 h-6 rounded-full ${event.active ? "bg-orange-500" : "bg-gray-300"
                    }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transform ${event.active ? "translate-x-6" : ""
                      }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-3xl w-full max-w-lg relative shadow-xl">
            <X
              className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            />

            <h2 className="text-xl font-bold mb-4">
              {editingEvent ? "Edit Event" : "Add Event"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium ml-1 mb-1">Event Title</label>
                <input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full p-2 bg-gray-100 rounded-lg border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-colors"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium ml-1 mb-1">Event Description</label>
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full p-2 bg-gray-100 rounded-lg border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-colors resize-none h-24"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium ml-1 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-lg border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-colors"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium ml-1 mb-1">Event Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-lg border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-colors"
                  />
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium ml-1 mb-1">Capacity</label>
                  <input
                    type="number"
                    placeholder="Capacity"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-lg border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-colors"
                  />
                  {errors.capacity && (
                    <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium ml-1 mb-1">Price ($)</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-lg border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-colors"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
