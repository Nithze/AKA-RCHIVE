import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import './Attendance.scss';
import axios from 'axios';

export const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

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
                return '#eba834';
            case 'Alpha':
                return '#ff0000';
            case 0:
                return '#1a1a1a';
            default:
                return '#1a1a1a';
        }
    };

    const getStatusInfo = (att) => {
        return {
            color: getStatusColor(att.status),
            tooltip: `Check In: ${att.checkInTime ? att.checkInTime : 'Not checked in'}\nCheck Out: ${att.checkOutTime ? att.checkOutTime : 'Not checked out'}\nLate Time: ${att.lateTime} minutes`
        };
    };

    const handleMouseEnter = (event, att) => {
        const { tooltip } = getStatusInfo(att);
        setTooltip({
            visible: true,
            content: tooltip,
            x: event.clientX,
            y: event.clientY
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, visible: false });
    };
    const convertMinutesToHours = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
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
                                    {/* <thead> */}
                                    {/*     <tr> */}
                                    {/*         <th>Name</th> */}
                                    {/*         {Array.from({ length: daysInMonth }, (_, i) => ( */}
                                    {/*             <th key={i}> */}
                                    {/*                 <div className="date-day"> */}
                                    {/*                     <span>{adjustedDaysOfWeek[i]}</span> */}
                                    {/*                     <span>{i + 1}</span> */}
                                    {/*                 </div> */}
                                    {/*             </th> */}
                                    {/*         ))} */}
                                    {/*     </tr> */}
                                    {/* </thead> */}
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
                                            <th>Total Late Time</th> {/* Kolom baru untuk total late time */}
                                        </tr>
                                    </thead>


                                    {/* <tbody> */}
                                    {/*     {attendanceData.map((employee, index) => ( */}
                                    {/*         <tr key={index}> */}
                                    {/*             <td> */}
                                    {/*                 {employee.employeeName} */}
                                    {/*                 <div className="shift-info">{employee.shiftName} ({employee.shiftStart} - {employee.shiftEnd})</div> */}
                                    {/*             </td> */}
                                    {/*             {employee.attendance.map((att, i) => { */}
                                    {/*                 const { color } = getStatusInfo(att); */}
                                    {/*                 return ( */}
                                    {/*                     <td key={i}> */}
                                    {/*                         <div */}
                                    {/*                             className="attendance-box" */}
                                    {/*                             style={{ backgroundColor: color }} */}
                                    {/*                             onMouseEnter={(e) => handleMouseEnter(e, att)} */}
                                    {/*                             onMouseLeave={handleMouseLeave} */}
                                    {/*                         ></div> */}
                                    {/*                     </td> */}
                                    {/*                 ); */}
                                    {/*             })} */}
                                    {/*         </tr> */}
                                    {/*     ))} */}
                                    {/* </tbody> */}
                                    <tbody>
                                        {attendanceData.map((employee, index) => {
                                            const totalLateTime = employee.attendance.reduce((acc, att) => acc + att.lateTime, 0);
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {employee.employeeName}
                                                        <div className="shift-info">{employee.shiftName} ({employee.shiftStart} - {employee.shiftEnd})</div>
                                                    </td>
                                                    {employee.attendance.map((att, i) => {
                                                        const { color } = getStatusInfo(att);
                                                        return (
                                                            <td key={i}>
                                                                <div
                                                                    className="attendance-box"
                                                                    style={{ backgroundColor: color }}
                                                                    onMouseEnter={(e) => handleMouseEnter(e, att)}
                                                                    onMouseLeave={handleMouseLeave}
                                                                ></div>
                                                            </td>
                                                        );
                                                    })}
                                                    <td>{convertMinutesToHours(totalLateTime)}</td> {/* Menampilkan total late time dalam format jam dan menit */}
                                                </tr>
                                            );
                                        })}
                                    </tbody>

                                </table>
                                {tooltip.visible && (
                                    <div className="tooltip" style={{ left: tooltip.x + 10, top: tooltip.y - 30 }}>
                                        {tooltip.content.split('\n').map((line, index) => (
                                            <div key={index}>{line}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Attendance;

