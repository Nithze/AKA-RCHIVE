import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Pages/Auth/Login.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import 'boxicons/css/boxicons.min.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    )
}





export default App
