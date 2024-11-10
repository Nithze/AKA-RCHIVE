// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../Components/Sidebar.jsx';
// import './Attendance.scss';
// import axios from 'axios';
//
// export const Attendance = () => {
//     const [attendanceData, setAttendanceData] = useState([]);
//     const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
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
//                 return '#eba834';
//             case 'Alpha':
//                 return '#ff0000';
//             case 0:
//                 return '#1a1a1a';
//             default:
//                 return '#1a1a1a';
//         }
//     };
//
//     const getStatusInfo = (att) => {
//         return {
//             color: getStatusColor(att.status),
//             tooltip: `Check In: ${att.checkInTime ? att.checkInTime : 'Not checked in'}\nCheck Out: ${att.checkOutTime ? att.checkOutTime : 'Not checked out'}\nLate Time: ${att.lateTime} minutes`
//         };
//     };
//
//     const handleMouseEnter = (event, att) => {
//         const { tooltip } = getStatusInfo(att);
//         setTooltip({
//             visible: true,
//             content: tooltip,
//             x: event.clientX,
//             y: event.clientY
//         });
//     };
//
//     const handleMouseLeave = () => {
//         setTooltip({ ...tooltip, visible: false });
//     };
//     const convertMinutesToHours = (minutes) => {
//         const hours = Math.floor(minutes / 60);
//         const remainingMinutes = minutes % 60;
//         return `${hours}h ${remainingMinutes}m`;
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
//                                             <option value="year">Year</option>
//                                         </select>
//                                         <select>
//                                             <option value="month">Month</option>
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
//                                     {/* <thead> */}
//                                     {/*     <tr> */}
//                                     {/*         <th>Name</th> */}
//                                     {/*         {Array.from({ length: daysInMonth }, (_, i) => ( */}
//                                     {/*             <th key={i}> */}
//                                     {/*                 <div className="date-day"> */}
//                                     {/*                     <span>{adjustedDaysOfWeek[i]}</span> */}
//                                     {/*                     <span>{i + 1}</span> */}
//                                     {/*                 </div> */}
//                                     {/*             </th> */}
//                                     {/*         ))} */}
//                                     {/*     </tr> */}
//                                     {/* </thead> */}
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
//                                             <th>Total Late Time</th> {/* Kolom baru untuk total late time */}
//                                         </tr>
//                                     </thead>
//
//
//                                     {/* <tbody> */}
//                                     {/*     {attendanceData.map((employee, index) => ( */}
//                                     {/*         <tr key={index}> */}
//                                     {/*             <td> */}
//                                     {/*                 {employee.employeeName} */}
//                                     {/*                 <div className="shift-info">{employee.shiftName} ({employee.shiftStart} - {employee.shiftEnd})</div> */}
//                                     {/*             </td> */}
//                                     {/*             {employee.attendance.map((att, i) => { */}
//                                     {/*                 const { color } = getStatusInfo(att); */}
//                                     {/*                 return ( */}
//                                     {/*                     <td key={i}> */}
//                                     {/*                         <div */}
//                                     {/*                             className="attendance-box" */}
//                                     {/*                             style={{ backgroundColor: color }} */}
//                                     {/*                             onMouseEnter={(e) => handleMouseEnter(e, att)} */}
//                                     {/*                             onMouseLeave={handleMouseLeave} */}
//                                     {/*                         ></div> */}
//                                     {/*                     </td> */}
//                                     {/*                 ); */}
//                                     {/*             })} */}
//                                     {/*         </tr> */}
//                                     {/*     ))} */}
//                                     {/* </tbody> */}
//                                     <tbody>
//                                         {attendanceData.map((employee, index) => {
//                                             const totalLateTime = employee.attendance.reduce((acc, att) => acc + att.lateTime, 0);
//                                             return (
//                                                 <tr key={index}>
//                                                     <td>
//                                                         {employee.employeeName}
//                                                         <div className="shift-info">{employee.shiftName} ({employee.shiftStart} - {employee.shiftEnd})</div>
//                                                     </td>
//                                                     {employee.attendance.map((att, i) => {
//                                                         const { color } = getStatusInfo(att);
//                                                         return (
//                                                             <td key={i}>
//                                                                 <div
//                                                                     className="attendance-box"
//                                                                     style={{ backgroundColor: color }}
//                                                                     onMouseEnter={(e) => handleMouseEnter(e, att)}
//                                                                     onMouseLeave={handleMouseLeave}
//                                                                 ></div>
//                                                             </td>
//                                                         );
//                                                     })}
//                                                     <td>{convertMinutesToHours(totalLateTime)}</td> {/* Menampilkan total late time dalam format jam dan menit */}
//                                                 </tr>
//                                             );
//                                         })}
//                                     </tbody>
//
//                                 </table>
//                                 {tooltip.visible && (
//                                     <div className="tooltip" style={{ left: tooltip.x + 10, top: tooltip.y - 30 }}>
//                                         {tooltip.content.split('\n').map((line, index) => (
//                                             <div key={index}>{line}</div>
//                                         ))}
//                                     </div>
//                                 )}
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
// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../Components/Sidebar.jsx';
// import './Attendance.scss';
// import axios from 'axios';
//
// export const Attendance = () => {
//     const [attendanceData, setAttendanceData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//     const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
//
//     // Fetch attendance data from backend based on selected year and month
//     const fetchAttendanceData = async (year, month) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/attendance/monthly/${year}/${month}`);
//             setAttendanceData(response.data);
//         } catch (error) {
//             console.error('Error fetching attendance data:', error);
//         }
//     };
//
//     useEffect(() => {
//         fetchAttendanceData(selectedYear, selectedMonth);
//     }, [selectedYear, selectedMonth]);
//
//     useEffect(() => {
//         // Filter data based on search term
//         const filtered = attendanceData.filter(employee =>
//             employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredData(filtered);
//     }, [searchTerm, attendanceData]);
//
//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };
//
//     const handleYearChange = (e) => {
//         setSelectedYear(Number(e.target.value));
//     };
//
//     const handleMonthChange = (e) => {
//         setSelectedMonth(Number(e.target.value));
//     };
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
//                 return '#eba834';
//             case 'Alpha':
//                 return '#ff0000';
//             case 0:
//                 return '#1a1a1a';
//             default:
//                 return '#1a1a1a';
//         }
//     };
//
//     const getStatusInfo = (att) => {
//         return {
//             color: getStatusColor(att.status),
//             tooltip: `Check In: ${att.checkInTime ? att.checkInTime : 'Not checked in'}\nCheck Out: ${att.checkOutTime ? att.checkOutTime : 'Not checked out'}\nLate Time: ${att.lateTime} minutes`
//         };
//     };
//
//     const handleMouseEnter = (event, att) => {
//         const { tooltip } = getStatusInfo(att);
//         setTooltip({
//             visible: true,
//             content: tooltip,
//             x: event.clientX,
//             y: event.clientY
//         });
//     };
//
//     const handleMouseLeave = () => {
//         setTooltip({ ...tooltip, visible: false });
//     };
//
//     const convertMinutesToHours = (minutes) => {
//         const hours = Math.floor(minutes / 60);
//         const remainingMinutes = minutes % 60;
//         return `${hours}h ${remainingMinutes}m`;
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
//                                         <input
//                                             type="text"
//                                             placeholder='Search Here ...'
//                                             value={searchTerm}
//                                             onChange={handleSearchChange}
//                                         />
//                                     </div>
//                                     <div className="filter">
//                                         <select value={selectedYear} onChange={handleYearChange}>
//                                             {/* Replace with actual year options */}
//                                             <option value={2023}>2023</option>
//                                             <option value={2024}>2024</option>
//                                         </select>
//                                         <select value={selectedMonth} onChange={handleMonthChange}>
//                                             {/* Replace with actual month options */}
//                                             {Array.from({ length: 12 }, (_, i) => (
//                                                 <option key={i + 1} value={i + 1}>{i + 1}</option>
//                                             ))}
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
//                                             <th>Total Late Time</th> {/* New column for total late time */}
//                                         </tr>
//                                     </thead>
//
//                                     <tbody>
//                                         {filteredData.map((employee, index) => {
//                                             const totalLateTime = employee.attendance.reduce((acc, att) => acc + att.lateTime, 0);
//                                             return (
//                                                 <tr key={index}>
//                                                     <td>
//                                                         {employee.employeeName}
//                                                         <div className="shift-info">{employee.shiftName} ({employee.shiftStart} - {employee.shiftEnd})</div>
//                                                     </td>
//                                                     {employee.attendance.map((att, i) => {
//                                                         const { color } = getStatusInfo(att);
//                                                         return (
//                                                             <td key={i}>
//                                                                 <div
//                                                                     className="attendance-box"
//                                                                     style={{ backgroundColor: color }}
//                                                                     onMouseEnter={(e) => handleMouseEnter(e, att)}
//                                                                     onMouseLeave={handleMouseLeave}
//                                                                 ></div>
//                                                             </td>
//                                                         );
//                                                     })}
//                                                     <td>{convertMinutesToHours(totalLateTime)}</td> {/* Displaying total late time in hours and minutes */}
//                                                 </tr>
//                                             );
//                                         })}
//                                     </tbody>
//
//                                 </table>
//                                 {tooltip.visible && (
//                                     <div className="tooltip" style={{ left: tooltip.x + 10, top: tooltip.y - 30 }}>
//                                         {tooltip.content.split('\n').map((line, index) => (
//                                             <div key={index}>{line}</div>
//                                         ))}
//                                     </div>
//                                 )}
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
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
    const [minYear, setMinYear] = useState(new Date().getFullYear() - 5); // Tahun minimum
    const [maxYear, setMaxYear] = useState(new Date().getFullYear() + 5); // Tahun maksimum

    const fetchAttendanceData = async (year, month) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/attendance/monthly/${year}/${month}`);
            setAttendanceData(response.data);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    useEffect(() => {
        fetchAttendanceData(selectedYear, selectedMonth);
    }, [selectedYear, selectedMonth]);

    useEffect(() => {
        const filtered = attendanceData.filter(employee =>
            employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, attendanceData]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleYearChange = (e) => {
        setSelectedYear(Number(e.target.value));
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(Number(e.target.value));
    };

    // Menghitung jumlah hari dalam bulan yang dipilih
    const getDaysInMonth = () => {
        return new Date(selectedYear, selectedMonth, 0).getDate();
    };

    // Mendapatkan hari pertama dari bulan yang dipilih
    const getFirstDayOfMonth = () => {
        return new Date(selectedYear, selectedMonth - 1, 1).getDay();
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
                            <p>attendance record</p>
                        </div>
                    </header>

                    <div className="main-container">
                        <div className="main">
                            <div className="toolbar">
                                <div className="left">
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            placeholder='Search Here ...'
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                    <div className="filter">
                                        {/* <select value={selectedYear} onChange={handleYearChange}> */}
                                        {/*     <option value={2023}>2023</option> */}
                                        {/*     <option value={2024}>2024</option> */}
                                        {/* </select> */}
                                        <select value={selectedYear} onChange={handleYearChange}>
                                            {Array.from({ length: (maxYear - minYear) + 1 }, (_, i) => minYear + i).map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                        <select value={selectedMonth} onChange={handleMonthChange}>
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="right">
                                    <div className="alert">
                                        <i className='bx bx-error'></i>
                                        <a href='/attendance'>Absence data cannot be contested</a>
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
                                            <th>Total Late Time</th> {/* Kolom ini akan selalu berada di posisi terakhir */}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredData.map((employee, index) => {
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
                                                    <td>{convertMinutesToHours(totalLateTime)}</td> {/* Kolom total terlambat waktu dalam jam dan menit */}
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
