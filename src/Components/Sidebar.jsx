// import React, { useState } from 'react';
// import './Sidebar.scss'; 
//
// const Sidebar = () => {
//
//   return (
//     <nav className={"sidebar" }>
//       <header>
//         <div className="image-text">
//           <div className="text logo-text">
//             <span className="name">Azhar</span>
//             <span className="profession">azhar@gmail.com</span>
//           </div>
//         </div>
//
//       </header>
//
//       <div className="menu-bar">
//         <div className="menu">
//
//           <ul className="menu-links">
//             <li className="nav-link">
//               <a href="#">
//                 <i className='bx bx-home-alt icon'></i>
//                 <span className="text nav-text">Dashboard</span>
//               </a>
//             </li>
//
//             <li className="nav-link">
//               <a href="#">
//                 <i className='bx bx-bar-chart-alt-2 icon'></i>
//                 <span className="text nav-text">Employees</span>
//               </a>
//             </li>
//
//             <li className="nav-link">
//               <a href="#">
//                 <i className='bx bx-bell icon'></i>
//                 <span className="text nav-text">Notifications</span>
//               </a>
//             </li>
//
//             <li className="nav-link">
//               <a href="#">
//                 <i className='bx bx-pie-chart-alt icon'></i>
//                 <span className="text nav-text">Analytics</span>
//               </a>
//             </li>
//
//             <li className="nav-link">
//               <a href="#">
//                 <i className='bx bx-heart icon'></i>
//                 <span className="text nav-text">Likes</span>
//               </a>
//             </li>
//
//             <li className="nav-link">
//               <a href="#">
//                 <i className='bx bx-wallet icon'></i>
//                 <span className="text nav-text">Wallets</span>
//               </a>
//             </li>
//           </ul>
//         </div>
//
//         <div className="bottom-content">
//           <li>
//             <a href="#">
//               <i className='bx bx-log-out icon'></i>
//               <span className="text nav-text">Logout</span>
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <i className='bx bx-sun icon'></i>
//               <span className="theme-toogle">Logout</span>
//             </a>
//           </li>
//
//         </div>
//       </div>
//     </nav>
//   );
// };
//
// export default Sidebar;

import React from 'react';
import { useTheme } from '../Services/ThemeContext.jsx'; // Impor hook context
import './Sidebar.scss';

const Sidebar = () => {
    const { darkMode, setDarkMode } = useTheme(); // Ambil tema dari context

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
                            <a href="#">
                                <i className='bx bx-home-alt icon'></i>
                                <span className="text nav-text">Dashboard</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-bar-chart-alt-2 icon'></i>
                                <span className="text nav-text">Employees</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-bell icon'></i>
                                <span className="text nav-text">Notifications</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-pie-chart-alt icon'></i>
                                <span className="text nav-text">Analytics</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-heart icon'></i>
                                <span className="text nav-text">Likes</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-wallet icon'></i>
                                <span className="text nav-text">Wallets</span>
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

