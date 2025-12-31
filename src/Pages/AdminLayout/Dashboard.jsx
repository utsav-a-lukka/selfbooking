import { CalendarCheck, DollarSign } from "lucide-react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";

const stats = [
  {
    id: 1,
    title: "Total Bookings (24 hours)",
    value: 120, // Static initial value
    bg: "bg-orange-50",
    iconBg: "bg-orange-500",
    icon: CalendarCheck,
  },
  {
    id: 2,
    title: "Total Revenue (24 hours)",
    value: "$12,400", // Static initial value
    bg: "bg-green-50",
    iconBg: "bg-green-500",
    icon: DollarSign,
  },
];

const AdminDashboard = () => {

  // UI state
  const [dashBoardStatasctics, setDashBoardStatistics] = useState(stats);

  // Data states (initialized with mock data for display)
  const [bookingCount, setBookingCount] = useState([
    { name: "Summer Fest", y: 45 },
    { name: "Tech Talk", y: 20 },
    { name: "Art Expo", y: 35 }
  ]);
  const [bookingCapacity, setBookingCapacity] = useState([
    { name: "Summer Fest", y: 50 },
    { name: "Tech Talk", y: 30 },
    { name: "Art Expo", y: 40 }
  ]);
  const [cancelCount, setCancelledCount] = useState([
    { name: "Summer Fest", y: 2 },
    { name: "Tech Talk", y: 1 },
    { name: "Art Expo", y: 0 }
  ]);
  const [bookingRevenue, setBookingRevenue] = useState([
    { name: "Summer Fest", y: 4500 },
    { name: "Tech Talk", y: 1200 },
    { name: "Art Expo", y: 3500 }
  ]);

  const [eventStatus, setEventStatus] = useState([
    { name: "UPCOMING", y: 5 },
    { name: "LIVE", y: 2 },
    { name: "COMPLETED", y: 8 }
  ]);

  // Chart Options
  const barChartOptions = {
    chart: { type: "column" },
    title: { text: null },
    credits: { enabled: false },
    xAxis: {
      categories: bookingRevenue.map((item) => item.name),
    },
    yAxis: {
      min: 0,
      title: { text: "Values" },
    },
    series: [
      { name: "Booking", data: bookingCount },
      { name: "Capacity", data: bookingCapacity },
      { name: "Cancelled", data: cancelCount },
      { name: "Revenue", data: bookingRevenue },
    ],
  };

  const pieChartOptions = {
    chart: { type: "pie" },
    title: { text: "" },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        innerSize: "60%",
        dataLabels: { enabled: true },
      },
    },
    series: [{ name: "Events", data: eventStatus }],
  };

  // Methods for manual API integration later
  const loadEvents = () => {
    console.log("loadEvents called - Integrate API here");
    // Logic to fetch events and update statistics, charts
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="w-full p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Manage your ticket booking system</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dashBoardStatasctics.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className={`${item.bg} rounded-2xl shadow-sm p-5 flex justify-between items-center transition hover:shadow-md`}>
              <div className="w-full">
                <div className="flex w-full justify-between items-start">
                  <div className={`w-10 h-10 ${item.iconBg} rounded-xl flex items-center justify-center mb-2`}>
                    <Icon className="text-white" size={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-600">{item.title}</p>
                <h2 className="text-2xl font-bold text-gray-900">{item.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-semibold mb-1 text-gray-800">Event Bookings</h3>
          <p className="text-sm text-gray-500 mb-4">Top performing events</p>
          {bookingCount.length === 0 ? (
            <p className="flex items-center justify-center min-h-[300px] text-gray-400">No Data Available</p>
          ) : (
            <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-semibold mb-1 text-gray-800">Event Status</h3>
          <p className="text-sm text-gray-500 mb-4">Distribution overview</p>
          <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
