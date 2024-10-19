// import './Shifts.scss';
// import React, { useState } from 'react';
// // import React from 'react';
// import Sidebar from '../../Components/Sidebar.jsx';
// import FormShift from '../../Components/FormShift';
//
// const shiftData = [
//     { name: 'Azhar', phone: '08123456789', dateAdded: 'Sep 17, 2024', role: 'Barista', shift: 'Morning Shift', shiftTime: '07:00 AM - 03:00 PM' },
// ];
//
// export const Shifts = () => {
//     const [isDialogOpen, setDialogOpen] = useState(false);
//
//     const handleOpenDialog = () => setDialogOpen(true);
//     const handleCloseDialog = () => setDialogOpen(false);
//     return (
//         <>
//             <FormShift isOpen={isDialogOpen} onClose={handleCloseDialog} />
//             <div className="container">
//                 <Sidebar className="sidebar" />
//                 {/* Content */}
//                 <div className="content">
//                     {/* -------------------------------- */}
//                     {/* Header */}
//                     {/* -------------------------------- */}
//                     <header className="header">
//                         <div className="header-left">
//                             <h1>Manage your shifts</h1>
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
//                         </div>
//                         <div className="header-right">
//                             <button className="btn" onClick={() => handleEdit(index)}><i className='bx bx-download icon'></i>
//                                 Download CSV</button>
//                             <button className="btn" onClick={handleOpenDialog}><i className='bx bx-time icon'></i>
//                                 Add Shift</button>
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
//                                             <col style={{ width: '5%' }} />
//                                             <col style={{ width: '15%' }} />
//                                             <col style={{ width: '15%' }} />
//                                         </colgroup>
//                                         <thead>
//                                             <tr>
//                                                 <th className="shitf-name">Shift Name</th>
//                                                 <th className="start-time">Start Time</th>
//                                                 <th className="end-time">End Time</th>
//                                                 <th className="description">Description</th>
//                                                 <th className="action">Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {shiftData.map((item, index) => (
//                                                 <tr key={index}>
//                                                     <td className="name">
//                                                         <div>{item.name}</div>
//                                                     </td>
//                                                     <td className={`date-add ${item.dateAdded.replace(' ', '-').toLowerCase()}`}>
//                                                         <div className="date-add">{item.dateAdded}</div>
//                                                     </td>
//                                                     <td className="role"><span >{item.role}</span></td>
//                                                     <td className="shift">
//                                                         <div>{item.shift}</div>
//                                                     </td>
//                                                     <td className="action">
//                                                         <button className="btn" onClick={() => handleEdit(index)}>Edit</button>
//                                                         <button className="warning-btn" onClick={() => handleDelete(index)}>Delete</button>
//                                                     </td>
//                                                 </tr>
//                                             ))}
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
// export default Shifts;
//
// import './Shifts.scss';
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../Components/Sidebar.jsx';
// import FormShift from '../../Components/FormShift';
// import axios from 'axios';
//
// export const Shifts = () => {
//     const [isDialogOpen, setDialogOpen] = useState(false);
//     const [shifts, setShifts] = useState([]);
//     const [editIndex, setEditIndex] = useState(null);
//
//     useEffect(() => {
//         fetchShifts();
//     }, []);
//
//     const fetchShifts = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/shifts');
//             setShifts(response.data);
//         } catch (error) {
//             console.error('Error fetching shifts:', error);
//         }
//     };
//
//     const handleOpenDialog = (index = null) => {
//         setEditIndex(index);
//         setDialogOpen(true);
//     };
//
//     const handleCloseDialog = () => setDialogOpen(false);
//
//     const handleDelete = async (index) => {
//         const shiftId = shifts[index]._id;
//         try {
//             await axios.delete(`http://localhost:5000/api/shifts/${shiftId}`);
//             fetchShifts();
//         } catch (error) {
//             console.error('Error deleting shift:', error);
//         }
//     };
//
//     return (
//         <>
//             <FormShift
//                 isOpen={isDialogOpen}
//                 onClose={handleCloseDialog}
//                 shift={editIndex !== null ? shifts[editIndex] : null}
//                 refreshShifts={fetchShifts}
//             />
//             <div className="container">
//                 <Sidebar className="sidebar" />
//                 <div className="content">
//                     <header className="header">
//                         <div className="header-left">
//                             <h1>Manage your shifts</h1>
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
//                         </div>
//                         <div className="header-right">
//                             <button className="btn" onClick={handleOpenDialog}><i className='bx bx-time icon'></i>
//                                 Add Shift</button>
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
//                                         <a href='/dashboard'>Salary distribution for the previous period has not been distributed. towards salary distribution</a>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             <div className="list-employees">
//                                 <div className="table-container">
//                                     <table>
//                                         <colgroup>
//                                             <col style={{ width: '20%' }} />
//                                             <col style={{ width: '20%' }} />
//                                             <col style={{ width: '20%' }} />
//                                             <col style={{ width: '20%' }} />
//                                             <col style={{ width: '20%' }} />
//                                         </colgroup>
//                                         <thead>
//                                             <tr>
//                                                 <th>Shift Name</th>
//                                                 <th>Start Time</th>
//                                                 <th>End Time</th>
//                                                 <th>Description</th>
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {shifts.map((shift, index) => (
//                                                 <tr key={shift._id}>
//                                                     <td>{shift.shiftName}</td>
//                                                     <td>{shift.startTime}</td>
//                                                     <td>{shift.endTime}</td>
//                                                     <td>{shift.description}</td>
//                                                     <td>
//                                                         <button className="btn" onClick={() => handleOpenDialog(index)}>Edit</button>
//                                                         <button className="warning-btn" onClick={() => handleDelete(index)}>Delete</button>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default Shifts;
//
import './Shifts.scss';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import FormShift from '../../Components/FormShift';
import axios from 'axios';
import { toast } from 'sonner'; // Import Sonner toast

export const Shifts = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [shifts, setShifts] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        fetchShifts();
    }, []);

    const fetchShifts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/shifts');
            setShifts(response.data);
        } catch (error) {
            console.error('Error fetching shifts:', error);
        }
    };

    const handleOpenDialog = (index = null) => {
        setEditIndex(index);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => setDialogOpen(false);

    const handleDelete = async (index) => {
        const shiftId = shifts[index]._id;
        
        // Konfirmasi sebelum menghapus
        const confirmDelete = window.confirm("Are you sure you want to delete this shift?");
        if (!confirmDelete) return; // Jika tidak, batalkan penghapusan

        try {
            await axios.delete(`http://localhost:5000/api/shifts/${shiftId}`);
            fetchShifts();
            toast.success('Shift deleted successfully!'); // Tampilkan toast sukses
        } catch (error) {
            console.error('Error deleting shift:', error);
            toast.error('Failed to delete shift.'); // Tampilkan toast error jika gagal
        }
    };

    return (
        <>
            <FormShift
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                shift={editIndex !== null ? shifts[editIndex] : null}
                refreshShifts={fetchShifts}
            />
            <div className="container">
                <Sidebar className="sidebar" />
                <div className="content">
                    <header className="header">
                        <div className="header-left">
                            <h1>Manage your shifts</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                        </div>
                        <div className="header-right">
                            <button className="btn" onClick={handleOpenDialog}><i className='bx bx-time icon'></i>
                                Add Shift</button>
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
                                        <a href='/dashboard'>Salary distribution for the previous period has not been distributed. towards salary distribution</a>
                                    </div>
                                </div>
                            </div>

                            <div className="list-employees">
                                <div className="table-container">
                                    <table>
                                        <colgroup>
                                            <col style={{ width: '20%' }} />
                                            <col style={{ width: '20%' }} />
                                            <col style={{ width: '20%' }} />
                                            <col style={{ width: '20%' }} />
                                            <col style={{ width: '20%' }} />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>Shift Name</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {shifts.map((shift, index) => (
                                                <tr key={shift._id}>
                                                    <td>{shift.shiftName}</td>
                                                    <td>{shift.startTime}</td>
                                                    <td>{shift.endTime}</td>
                                                    <td>{shift.description}</td>
                                                    <td>
                                                        <button className="btn" onClick={() => handleOpenDialog(index)}>Edit</button>
                                                        <button className="warning-btn" onClick={() => handleDelete(index)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shifts;

