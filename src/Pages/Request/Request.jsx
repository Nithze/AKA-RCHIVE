// import './Request.scss';
// import React, { useState } from 'react';
// import Sidebar from '../../Components/Sidebar.jsx';
//
//
// export const Request = () => {
//     return (
//         <>
//             <div className="container">
//                 <Sidebar className="sidebar" />
//                 {/* Content */}
//                 <div className="content">
//                     {/* -------------------------------- */}
//                     {/* Header */}
//                     {/* -------------------------------- */}
//                     <header className="header">
//                         <div className="header-left">
//                             <h1>Request</h1>
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
//                         </div>
//                         <div className="header-right">
//                             <button className="btn" ><i className='bx bx-download icon'></i>
//                                 Download CSV</button>
//                             <button className="btn" ><i className='bx bx-user-plus icon'></i>
//                                 Add Employee</button>
//                         </div>
//                     </header>
//                     {/* -------------------------------- */}
//                     {/*End Header */}
//                     {/* -------------------------------- */}
//
//                     {/* -------------------------------- */}
//                     {/* Main Table & card maybe */}
//                     {/* -------------------------------- */}
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
//
//                                 <div className="right">
//                                     <div className="alert">
//                                         <i className='bx bx-error'></i>
//                                         <a href='/dashboard'>salary distribution for the previous period has not been distributed. towards salary distribution</a>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="list-employees">
//                                 <div className="table-container">
//                                     <table>
//                                         <colgroup>
//                                             <col style={{ width: '15%' }} />
//                                             <col style={{ width: '10%' }} />
//                                             <col style={{ width: '30%' }} />
//                                             <col style={{ width: '15%' }} />
//                                         </colgroup>
//                                         <thead>
//                                             <tr>
//                                                 <th className="name">Name</th>
//                                                 <th className="role">Role</th>
//                                                 <th className="shift">Reason</th>
//                                                 <th className="action">Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                                 <tr>
//                                                     <td className="name">
//                                                         <div>azhar</div>
//                                                         <div className="phone-number">098989</div>
//                                                     </td>
//                                                     <td className="role"><span className="role-chip">barista</span></td>
//                                                     <td className="reason">
//                                                         <div>izin sakit</div>
//                                                     </td>
//                                                     <td className="action">
//                                                         <button className="btn" >Approve</button>
//                                                         <button className="warning-btn">Disapprove</button>
//                                                     </td>
//                                                 </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* -------------------------------- */}
//                     {/* Main Table & card maybe */}
//                     {/* -------------------------------- */}
//                     {/* Form Dialog */}
//                 </div>
//                 {/* Content */}
//             </div>
//         </>
//     );
//
//     // Handler function untuk edit
//     function handleEdit(index) {
//         console.log(`Edit employee at index ${index}`);
//         // Tambahkan logic untuk proses edit di sini
//     }
//
//     // Handler function untuk delete
//     function handleDelete(index) {
//         console.log(`Delete employee at index ${index}`);
//         // Tambahkan logic untuk proses delete di sini
//     }
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

    return (
        <>
            <div className="container">
                <Sidebar className="sidebar" />
                {/* Content */}
                <div className="content">
                    {/* -------------------------------- */}
                    {/* Header */}
                    {/* -------------------------------- */}
                    <header className="header">
                        <div className="header-left">
                            <h1>Request</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                        </div>
                        <div className="header-right">
                            <button className="btn"><i className='bx bx-download icon'></i> Download CSV</button>
                            <button className="btn"><i className='bx bx-user-plus icon'></i> Add Employee</button>
                        </div>
                    </header>
                    {/* -------------------------------- */}
                    {/* End Header */}
                    {/* -------------------------------- */}

                    {/* -------------------------------- */}
                    {/* Main Table */}
                    {/* -------------------------------- */}

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
                                        <a href='/dashboard'>Salary distribution for the previous period has not been distributed. Towards salary distribution</a>
                                    </div>
                                </div>
                            </div>
                            <div className="list-employees">
                                <div className="table-container">
                                    <table>
                                        <colgroup>
                                            <col style={{ width: '15%' }} />
                                            <col style={{ width: '10%' }} />
                                            <col style={{ width: '30%' }} />
                                            <col style={{ width: '15%' }} />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th className="name">Name</th>
                                                <th className="role">Role</th>
                                                <th className="shift">Reason</th>
                                                <th className="action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requests.map((request) => (
                                                request.attendance.map((attendance) => (
                                                    <tr key={attendance.attendanceId}>
                                                        <td className="name">
                                                            <div>{request.employeeName}</div>
                                                            <div className="phone-number">{request.phoneNumber}</div>
                                                        </td>
                                                        <td className="role"><span className="role-chip">{request.role}</span></td>
                                                        <td className="reason">
                                                            <div>{attendance.reason}</div>
                                                        </td>
                                                        <td className="action">
                                                            <button className="btn" onClick={() => handleApprove(attendance.attendanceId)}>Approve</button>
                                                            <button className="warning-btn" onClick={() => handleDisapprove(attendance.attendanceId)}>Disapprove</button>
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
                    {/* -------------------------------- */}
                    {/* Main Table End */}
                    {/* -------------------------------- */}
                </div>
                {/* Content End */}
            </div>
        </>
    );
};

export default Request;

