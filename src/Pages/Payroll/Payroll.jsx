import './Payroll.scss';
import React, { useState } from 'react';
// import React from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import FormPayroll from '../../Components/FormPayroll';

const shiftData = [
    { name: 'Azhar', phone: '08123456789', dateAdded: 'Sep 17, 2024', role: 'Barista', shift: 'Morning Shift', shiftTime: '07:00 AM - 03:00 PM' },
];

export const Employees = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);
    return (
        <>
            <FormPayroll isOpen={isDialogOpen} onClose={handleCloseDialog} />
            <div className="container">
                <Sidebar className="sidebar" />
                {/* Content */}
                <div className="content">
                    {/* -------------------------------- */}
                    {/* Header */}
                    {/* -------------------------------- */}
                    <header className="header">
                        <div className="header-left">
                            <h1>Payroll</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                        </div>
                        <div className="header-right">
                            <button className="btn" onClick={() => handleEdit(index)}><i className='bx bx-download icon'></i>
                                Download CSV</button>
                            <button className="btn" onClick={handleOpenDialog}><i className='bx bx-user-plus icon'></i>
                                Add Payroll</button>
                        </div>
                    </header>
                    {/* -------------------------------- */}
                    {/*End Header */}
                    {/* -------------------------------- */}

                    {/* -------------------------------- */}
                    {/* Main Table & card maybe */}
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
                                        <a href='/dashboard'>salary distribution for the previous period has not been distributed. towards salary distribution</a>
                                    </div>
                                </div>
                            </div>
                            <div className="list-employees">
                                <div className="table-container">
                                    <table>
                                        <colgroup>
                                            <col style={{ width: '15%' }} />
                                            <col style={{ width: '10%' }} />
                                            <col style={{ width: '5%' }} />
                                            <col style={{ width: '15%' }} />
                                            <col style={{ width: '15%' }} />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th className="name">Name</th>
                                                <th className="date-add">Date added</th>
                                                <th className="role">Role</th>
                                                <th className="shift">Shift</th>
                                                <th className="action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {shiftData.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="name">
                                                        <div>{item.name}</div>
                                                        <div className="phone-number">{item.phone}</div>
                                                    </td>
                                                    <td className={`date-add ${item.dateAdded.replace(' ', '-').toLowerCase()}`}>
                                                        <div>{item.presence}</div>
                                                        <div className="date-add">{item.dateAdded}</div>
                                                    </td>
                                                    <td className="role"><span className="role-chip">{item.role}</span></td>
                                                    <td className="shift">
                                                        <div>{item.shift}</div>
                                                        <div className="shift-time">{item.shiftTime}</div>
                                                    </td>
                                                    <td className="action">
                                                        <button className="btn" onClick={() => handleEdit(index)}>Detail</button>
                                                        <button className="btn" onClick={() => handleEdit(index)}>Edit</button>
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

                    {/* -------------------------------- */}
                    {/* Main Table & card maybe */}
                    {/* -------------------------------- */}
                    {/* Form Dialog */}
                </div>
                {/* Content */}
            </div>
        </>
    );

    // Handler function untuk edit
    function handleEdit(index) {
        console.log(`Edit employee at index ${index}`);
        // Tambahkan logic untuk proses edit di sini
    }

    // Handler function untuk delete
    function handleDelete(index) {
        console.log(`Delete employee at index ${index}`);
        // Tambahkan logic untuk proses delete di sini
    }
};

export default Employees;

