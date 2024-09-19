import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import 'boxicons/css/boxicons.min.css'
import Login from './Pages/Auth/Login.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Employees from './Pages/Employees/Employees.jsx'
import CustomCursor from './Components/CustomCursor.jsx'

function App() {
    return (
        <Router>
            <CustomCursor />  {/* Tambahkan di sini */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
            </Routes>
        </Router>
    )
}





export default App
