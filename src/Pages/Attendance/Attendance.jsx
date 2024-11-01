// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../Components/Sidebar.jsx';
// import './Attendance.scss';
// import axios from 'axios';
//
// export const Attendance = () => {
//     const [attendanceData, setAttendanceData] = useState([]);
//
//     // Fetch attendance data from backend
//     useEffect(() => {
//         const fetchAttendanceData = async () => {
//             const year = new Date().getFullYear();
//             const month = new Date().getMonth() + 1; // Get current month
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/attendance/monthly/${year}/${month}`);
//                 setAttendanceData(response.data);
//             } catch (error) {
//                 console.error('Error fetching attendance data:', error);
//             }
//         };
//
//         fetchAttendanceData();
//     }, []);
//
//     const getDaysInMonth = () => {
//         const date = new Date();
//         const year = date.getFullYear();
//         const month = date.getMonth();
//         return new Date(year, month + 1, 0).getDate();
//     };
//
//     const getFirstDayOfMonth = () => {
//         const date = new Date();
//         const year = date.getFullYear();
//         const month = date.getMonth();
//         return new Date(year, month, 1).getDay();
//     };
//
//     const daysInMonth = getDaysInMonth();
//     const firstDayOfMonth = getFirstDayOfMonth();
//     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//
//     const adjustedDaysOfWeek = Array.from({ length: daysInMonth }, (_, i) => {
//         return daysOfWeek[(firstDayOfMonth + i) % 7];
//     });
//
//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'Present':
//                 return '#52398e';
//             case 'Absent':
//                 return '#ff4d00';
//             case 'Alpha':
//                 return '#ff0000';
//             case 0:
//                 return '#222';
//             default:
//                 return '#222';
//         }
//     };
//
//     return (
//         <>
//             <div className="container">
//                 <Sidebar className="sidebar" />
//                 <div className="content">
//                     <header className="header">
//                         <div className="header-left">
//                             <h1>Attendance</h1>
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
//                         </div>
//                     </header>
//
//                     <div className="main-container">
//                         <div className="main">
//                             <div className="toolbar">
//                                 <div className="left">
//                                     <div className="search-bar">
//                                         <input type="text" placeholder='Search Here ...' />
//                                     </div>
//                                     <div className="filter">
//                                         <select>
//                                             <option value="male">Male</option>
//                                             <option value="female">Female</option>
//                                         </select>
//                                         <select>
//                                             <option value="male">Male</option>
//                                             <option value="female">Female</option>
//                                         </select>
//                                     </div>
//                                 </div>
//
//                                 <div className="right">
//                                     <div className="alert">
//                                         <i className='bx bx-error'></i>
//                                         <a href='/dashboard'>All Attendance</a>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             <div className="attendance-table">
//                                 <table>
//                                     <thead>
//                                         <tr>
//                                             <th>Name</th>
//                                             {Array.from({ length: daysInMonth }, (_, i) => (
//                                                 <th key={i}>
//                                                     <div className="date-day">
//                                                         <span>{adjustedDaysOfWeek[i]}</span>
//                                                         <span>{i + 1}</span>
//                                                     </div>
//                                                 </th>
//                                             ))}
//                                         </tr>
//                                     </thead>
//
//                                     <tbody>
//                                         {attendanceData.map((employee, index) => (
//                                             <tr key={index}>
//                                                 <td>
//                                                     {employee.employeeName}
//                                                     <div className="shift-info">{employee.shiftName} ({employee.shiftStart} - {employee.shiftEnd})</div>
//                                                 </td>
//                                                 {employee.attendance.map((att, i) => (
//                                                     <td key={i}>
//                                                         <div
//                                                             className="attendance-box"
//                                                             style={{ backgroundColor: getStatusColor(att.status) }}
//                                                         ></div>
//                                                     </td>
//                                                 ))}
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default Attendance;
//
import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import './Attendance.scss';
import axios from 'axios';

export const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);

    // Fetch attendance data from backend
    useEffect(() => {
        const fetchAttendanceData = async () => {
            const year = new Date().getFullYear();
            const month = new Date().getMonth() + 1; // Get current month
            try {
                const response = await axios.get(`http://localhost:5000/api/attendance/monthly/${year}/${month}`);
                setAttendanceData(response.data);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchAttendanceData();
    }, []);

    const getDaysInMonth = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth();
    const firstDayOfMonth = getFirstDayOfMonth();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const adjustedDaysOfWeek = Array.from({ length: daysInMonth }, (_, i) => {
        return daysOfWeek[(firstDayOfMonth + i) % 7];
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Present':
                return '#52398e';
            case 'Absent':
                return '#ff4d00';
            case 'Alpha':
                return '#ff0000';
            case 0:
                return '#222';
            default:
                return '#222';
        }
    };

    const getStatusInfo = (att) => {
        return {
            color: getStatusColor(att.status),
            tooltip: `Check In: ${att.checkInTime ? att.checkInTime : 'Not checked in'}\nCheck Out: ${att.checkOutTime ? att.checkOutTime : 'Not checked out'}\nLate Time: ${att.lateTime} minutes`
        };
    };

    return (
        <>
            <div className="container">
                <Sidebar className="sidebar" />
                <div className="content">
                    <header className="header">
                        <div className="header-left">
                            <h1>Attendance</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                        </div>
                    </header>

                    <div className="main-container">
                        <div className="main">
                            <div className="toolbar">
                                <div className="left">
                                    <div className="search-bar">
                                        <input type="text" placeholder='Search Here ...' />
                                    </div>
                                    <div className="filter">
                                        <select>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        <select>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="right">
                                    <div className="alert">
                                        <i className='bx bx-error'></i>
                                        <a href='/dashboard'>All Attendance</a>
                                    </div>
                                </div>
                            </div>

                            <div className="attendance-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            {Array.from({ length: daysInMonth }, (_, i) => (
                                                <th key={i}>
                                                    <div className="date-day">
                                                        <span>{adjustedDaysOfWeek[i]}</span>
                                                        <span>{i + 1}</span>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {attendanceData.map((employee, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {employee.employeeName}
                                                    <div className="shift-info">{employee.shiftName} ({employee.shiftStart} - {employee.shiftEnd})</div>
                                                </td>
                                                {employee.attendance.map((att, i) => {
                                                    const { color, tooltip } = getStatusInfo(att);
                                                    return (
                                                        <td key={i}>
                                                            <div
                                                                className="attendance-box"
                                                                style={{ backgroundColor: color }}
                                                                title={tooltip} 
                                                            ></div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Attendance;

