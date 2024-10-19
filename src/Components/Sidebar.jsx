import React from 'react';
import { useTheme } from '../Services/ThemeContext.jsx'; 
import './Sidebar.scss';

const Sidebar = () => {
    const { darkMode, setDarkMode } = useTheme(); // Ambil tema

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
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
                                <i className='bx bx-home-alt icon'></i>
                                <span className="text nav-text">Dashboard</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="/roles">
                                <i className='bx bx-check-shield icon'></i>
                                <span className="text nav-text">Role & Salary</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="/shifts">
                                <i className='bx bx-time icon'></i>
                                <span className="text nav-text">Shift</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="/employees">
                                <i className='bx bx-user icon'></i>
                                <span className="text nav-text">Employees</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="/attendance">
                                <i className='bx bx-calendar-check icon'></i>
                                <span className="text nav-text">Attendance</span>
                            </a>
                        </li>



                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-money icon'></i>
                                <span className="text nav-text">Salary Distribution</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bxs-file-import icon'></i>
                                <span className="text nav-text">Suplier</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="/Inventory">
                                <i className='bx bx-package icon'></i>
                                <span className="text nav-text">Inventory</span>
                            </a>
                        </li>


                    </ul>

                </div>

                <div className="bottom-content">
                    <li>
                        <a href="#">
                            <i className='bx bx-log-out icon'></i>
                            <span className="text nav-text">Logout</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={toggleTheme}>
                            <i className={`bx ${darkMode ? 'bx-moon' : 'bx-sun'} icon`}></i>
                            <span className="theme-toggle">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                        </a>
                    </li>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;

