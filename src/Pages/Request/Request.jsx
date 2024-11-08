// import './Request.scss';
// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../Components/Sidebar.jsx';
// import axios from 'axios';
// import { toast } from 'sonner'; // Import Sonner for toast notifications
//
// export const Request = () => {
//     const [requests, setRequests] = useState([]);
//
//     useEffect(() => {
//         fetchRequests();
//     }, []);
//
//     const fetchRequests = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/attendance/request/pending');
//             setRequests(response.data);
//         } catch (error) {
//             console.error('Error fetching requests:', error);
//             toast.error('Failed to fetch requests!');
//         }
//     };
//
//     const handleApprove = async (attendanceId) => {
//         try {
//             await axios.put(`http://localhost:5000/api/attendance/approve-leave/${attendanceId}`);
//             toast.success('Request approved successfully!');
//             fetchRequests(); // Refresh the list
//         } catch (error) {
//             console.error('Error approving request:', error);
//             toast.error('Failed to approve request!');
//         }
//     };
//
//     const handleDisapprove = async (attendanceId) => {
//         try {
//             await axios.put(`http://localhost:5000/api/attendance/disapprove-leave/${attendanceId}`);
//             toast.success('Request disapproved successfully!');
//             fetchRequests(); // Refresh the list
//         } catch (error) {
//             console.error('Error disapproving request:', error);
//             toast.error('Failed to disapprove request!');
//         }
//     };
//
//     return (
//         <>
//             <div className="container">
//                 <Sidebar className="sidebar" />
//                 {/* Content */}
//                 <div className="content">
//                     {/* Header */}
//                     <header className="header">
//                         <div className="header-left">
//                             <h1>Request</h1>
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
//                         </div>
//                         <div className="header-right">
//                             <button className="btn"><i className='bx bx-download icon'></i> Download CSV</button>
//                             <button className="btn"><i className='bx bx-user-plus icon'></i> Add Employee</button>
//                         </div>
//                     </header>
//
//                     {/* Main Table */}
//                     <div className="main-container">
//                         <div className="main">
//                             <div className="toolbar">
//                                 <div className="left">
//                                     <div className="search-bar">
//                                         <input type="text" placeholder='Search Here ...' />
//                                     </div>
//                                     <div className="filter">
//                                         <select>
//                                             <option value="Role">Role</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="right">
//                                     <div className="alert">
//                                         <i className='bx bx-error'></i>
//                                         <a href='/dashboard'>Salary distribution for the previous period has not been distributed. Towards salary distribution</a>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="list-employees">
//                                 <div className="table-container">
//                                     <table>
//                                         <colgroup>
//                                             <col style={{ width: '10%' }} />
//                                             <col style={{ width: '10%' }} />
//                                             <col style={{ width: '10%' }} />
//                                             <col style={{ width: '40%' }} />
//                                             <col style={{ width: '15%' }} />
//                                         </colgroup>
//                                         <thead>
//                                             <tr>
//                                                 <th className="name">Name</th>
//                                                 <th className="role">Role</th>
//                                                 <th className="date">Date</th>
//                                                 <th className="shift">Reason</th>
//                                                 <th className="action">Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {requests.map((request) => (
//                                                 request.attendance.map((attendance) => (
//                                                     <tr key={attendance.attendanceId}>
//                                                         <td className="name">
//                                                             <div>{request.employeeName}</div>
//                                                             <div className="phone-number">{request.phoneNumber}</div>
//                                                         </td>
//                                                         <td className="role"><span className="role-chip">{request.role}</span></td>
//                                                         <td className="role"><span className="date">{attendance.date}</span></td>
//                                                         <td className="reason">
//                                                             <div>{attendance.reason}</div>
//                                                         </td>
//                                                         <td className="action">
//                                                             {attendance.status === 'Absent' ? (
//                                                                 <p>Approved <i className='bx bx-check' style={{ color: '#52398e' }}></i></p>
//                                                             ) : (
//                                                                 <>
//                                                                     <button className="btn" onClick={() => handleApprove(attendance.attendanceId)}>Approve</button>
//                                                                     <button className="warning-btn" onClick={() => handleDisapprove(attendance.attendanceId)}>Disapprove</button>
//                                                                 </>
//                                                             )}
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* Main Table End */}
//                 </div>
//                 {/* Content End */}
//             </div>
//         </>
//     );
// };
//
// export default Request;
//
import './Request.scss';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import axios from 'axios';
import { toast } from 'sonner'; // Import Sonner for toast notifications

export const Request = () => {
    const [requests, setRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('All'); // Adjust this based on your role options

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/attendance/request/pending');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
            toast.error('Failed to fetch requests!');
        }
    };

    const handleApprove = async (attendanceId) => {
        try {
            await axios.put(`http://localhost:5000/api/attendance/approve-leave/${attendanceId}`);
            toast.success('Request approved successfully!');
            fetchRequests(); // Refresh the list
        } catch (error) {
            console.error('Error approving request:', error);
            toast.error('Failed to approve request!');
        }
    };

    const handleDisapprove = async (attendanceId) => {
        try {
            await axios.put(`http://localhost:5000/api/attendance/disapprove-leave/${attendanceId}`);
            toast.success('Request disapproved successfully!');
            fetchRequests(); // Refresh the list
        } catch (error) {
            console.error('Error disapproving request:', error);
            toast.error('Failed to disapprove request!');
        }
    };

    // Filter and sort requests
    const filteredRequests = requests
        .filter(request => 
            request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) && 
            (filterRole === 'All' || request.role === filterRole)
        )
        .sort((a, b) => new Date(b.attendance[0].date) - new Date(a.attendance[0].date)); // Sort by date descending

    return (
        <>
            <div className="container">
                <Sidebar className="sidebar" />
                {/* Content */}
                <div className="content">
                    {/* Header */}
                    <header className="header">
                        <div className="header-left">
                            <h1>Request</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                        </div>
                        <div className="header-right">
                            {/* <button className="btn"><i className='bx bx-download icon'></i> Download CSV</button> */}
                        </div>
                    </header>

                    {/* Main Table */}
                    <div className="main-container">
                        <div className="main">
                            <div className="toolbar">
                                <div className="left">
                                    <div className="search-bar">
                                        <input 
                                            type="text" 
                                            placeholder='Search Here ...' 
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                                        />
                                    </div>
                                    <div className="filter">
                                        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                                            <option value="All">All Roles</option>
                                            <option value="Role1">Role1</option>
                                            <option value="Role2">Role2</option>
                                            {/* Add more roles as needed */}
                                        </select>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="alert">
                                        <i className='bx bx-error'></i>
                                        <a href='/request'>Payroll data can only be added and deleted</a>
                                    </div>
                                </div>
                            </div>
                            <div className="list-employees">
                                <div className="table-container">
                                    <table>
                                        <colgroup>
                                            <col style={{ width: '10%' }} />
                                            <col style={{ width: '10%' }} />
                                            <col style={{ width: '10%' }} />
                                            <col style={{ width: '40%' }} />
                                            <col style={{ width: '15%' }} />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th className="name">Name</th>
                                                <th className="role">Role</th>
                                                <th className="date">Date</th>
                                                <th className="shift">Reason</th>
                                                <th className="action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredRequests.map((request) => (
                                                request.attendance.map((attendance) => (
                                                    <tr key={attendance.attendanceId}>
                                                        <td className="name">
                                                            <div>{request.employeeName}</div>
                                                            <div className="phone-number">{request.phoneNumber}</div>
                                                        </td>
                                                        <td className="role"><span className="role-chip">{request.role}</span></td>
                                                        <td className="date"><span className="date">{attendance.date}</span></td>
                                                        <td className="reason">
                                                            <div>{attendance.reason}</div>
                                                        </td>
                                                        <td className="action">
                                                            {attendance.status === 'Absent' ? (
                                                                <p>Approved <i className='bx bx-check' style={{ color: '#52398e' }}></i></p>
                                                            ) : (
                                                                <>
                                                                    <button className="btn" onClick={() => handleApprove(attendance.attendanceId)}>Approve</button>
                                                                    <button className="warning-btn" onClick={() => handleDisapprove(attendance.attendanceId)}>Disapprove</button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Main Table End */}
                </div>
                {/* Content End */}
            </div>
        </>
    );
};

export default Request;

