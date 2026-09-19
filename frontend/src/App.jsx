import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import MyBookings from "./pages/MyBookings";
import MyWaitingList from "./pages/MyWaitingList";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AttendeeDashboard from "./pages/AttendeeDashboard";
import AIChatbot from "./Components/AIChatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-waitlist" element={<MyWaitingList />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/attendee-dashboard" element={<AttendeeDashboard />} />
      </Routes>
      <AIChatbot />
    </BrowserRouter>
  );
}

export default App;