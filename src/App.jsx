import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'boxicons/css/boxicons.min.css';
import 'boxicons'
import Login from './Pages/Auth/Login.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Employees from './Pages/Employees/Employees.jsx';
import Attendance from './Pages/Attendance/Attendance.jsx';
// import CustomCursor from './Components/CustomCursor.jsx';
import BlankPage from './Components/BlankPage.jsx';
import { ThemeProvider } from './Services/ThemeContext.jsx';

function App() {
    return (
        <ThemeProvider>
            <Router>
                {/* <CustomCursor /> */}
                <BlankPage />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/attendance" element={<Attendance />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;

