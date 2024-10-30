import { useTheme } from "../Services/ThemeContext.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Sidebar.scss";

const Sidebar = () => {
	const { darkMode, setDarkMode } = useTheme(); // Ambil tema
	const navigate = useNavigate(); // Initialize navigate

	const toggleTheme = () => {
		setDarkMode((prev) => !prev);
	};

	const handleLogout = () => {
		// Remove token from localStorage
		localStorage.removeItem("token"); // Replace "token" with your actual token key if different
		navigate("/"); // Redirect to the login page
	};

	return (
		<nav className={"sidebar"}>
			<header>
				<div className="image-text">
					<div className="text logo-text">
						<span className="name">Azhar</span>
						<span className="profession">azhar@gmail.com</span>
					</div>
				</div>
			</header>

			<div className="menu-bar">
				<div className="menu">
					<ul className="menu-links">
						<li className="nav-link">
							<a href="/dashboard">
								<i className="bx bx-home-alt icon"></i>
								<span className="text nav-text">Dashboard</span>
							</a>
						</li>

						<li className="nav-link">
							<a href="/roles">
								<i className="bx bx-check-shield icon"></i>
								<span className="text nav-text">Role & Salary</span>
							</a>
						</li>

						<li className="nav-link">
							<a href="/shifts">
								<i className="bx bx-time icon"></i>
								<span className="text nav-text">Shift</span>
							</a>
						</li>

						<li className="nav-link">
							<a href="/employees">
								<i className="bx bx-user icon"></i>
								<span className="text nav-text">Employees</span>
							</a>
						</li>

						<li className="nav-link">
							<a href="/attendance">
								<i className="bx bx-calendar-check icon"></i>
								<span className="text nav-text">Attendance</span>
							</a>
						</li>
						<li className="nav-link">
							<a href="/request">
								<i className="bx bx-calendar-check icon"></i>
								<span className="text nav-text">Request</span>
							</a>
						</li>

						<li className="nav-link">
							<a href="/payroll">
								<i className="bx bx-money icon"></i>
								<span className="text nav-text">Payroll</span>
							</a>
						</li>

						<li className="nav-link">
							<a href="/shipment">
								<i className="bx bxs-file-import icon"></i>
								<span className="text nav-text">Shipment</span>
							</a>
						</li>

						<li className="nav-link">
							<a href="/inventory">
								<i className="bx bx-package icon"></i>
								<span className="text nav-text">Inventory</span>
							</a>
						</li>
					</ul>
				</div>

				<div className="bottom-content">
					<li>
						<a onClick={handleLogout}>
							{" "}
							{/* Call handleLogout on click */}
							<i className="bx bx-log-out icon"></i>
							<span className="text nav-text">Logout</span>
						</a>
					</li>
					<li>
						<a onClick={toggleTheme}>
							<i className={`bx ${darkMode ? "bx-moon" : "bx-sun"} icon`}></i>
							<span className="theme-toggle">
								{darkMode ? "Dark Mode" : "Light Mode"}
							</span>
						</a>
					</li>
				</div>
			</div>
		</nav>
	);
};

export default Sidebar;
