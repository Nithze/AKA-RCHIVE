import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "boxicons/css/boxicons.min.css";
import Login from "./Pages/Auth/Login.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Employees from "./Pages/Employees/Employees.jsx";
import Attendance from "./Pages/Attendance/Attendance.jsx";
import Shifts from "./Pages/Shifts/Shifts.jsx";
import Payroll from "./Pages/Payroll/Payroll.jsx";
import Roles from "./Pages/Roles/Roles.jsx";
import Request from "./Pages/Request/Request.jsx";
import BlankPage from "./Components/BlankPage.jsx";
import { ThemeProvider } from "./Services/ThemeContext.jsx";
import Inventory from "./Pages/Inventory/Inventory.jsx";
import Shipment from "./Pages/Shipment/Shipment.jsx";
import Sales from "./Pages/Sales/Sales.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx"; // Import ProtectedRoute
import { Toaster } from "sonner";

function App() {
	return (
		<ThemeProvider>
			<Router>
				<BlankPage />
				<Toaster
					toastOptions={{
						style: {
							background: "#222",
							color: "#f9f9f9",
							border: "1px solid #444",
						},
					}}
				/>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route element={<ProtectedRoute />}>
						{" "}
						{/* Tempatkan ProtectedRoute di sini */}
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/employees" element={<Employees />} />
						<Route path="/attendance" element={<Attendance />} />
						<Route path="/shifts" element={<Shifts />} />
						<Route path="/payroll" element={<Payroll />} />
						<Route path="/roles" element={<Roles />} />
						<Route path="/request" element={<Request />} />
						<Route path="/inventory" element={<Inventory />} />
						<Route path="/shipment" element={<Shipment />} />
						<Route path="/sales" element={<Sales />} />
					</Route>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
