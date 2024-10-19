// import './Roles.scss';
// import React, { useState } from 'react';
// // import React from 'react';
// import Sidebar from '../../Components/Sidebar.jsx';
// import FormRole from '../../Components/FormRole';
//
// const shiftData = [
//     { name: 'Azhar', phone: '08123456789', dateAdded: 'Sep 17, 2024', role: 'Barista', shift: 'Morning Shift', shiftTime: '07:00 AM - 03:00 PM' },
// ];
//
// export const Roles = () => {
//     const [isDialogOpen, setDialogOpen] = useState(false);
//
//     const handleOpenDialog = () => setDialogOpen(true);
//     const handleCloseDialog = () => setDialogOpen(false);
//     return (
//         <>
//             <FormRole isOpen={isDialogOpen} onClose={handleCloseDialog} />
//             <div className="container">
//                 <Sidebar className="sidebar" />
//                 {/* Content */}
//                 <div className="content">
//                     {/* -------------------------------- */}
//                     {/* Header */}
//                     {/* -------------------------------- */}
//                     <header className="header">
//                         <div className="header-left">
//                             <h1>Manage your Role & Salary</h1>
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
//                         </div>
//                         <div className="header-right">
//                             <button className="btn" onClick={() => handleEdit(index)}><i className='bx bx-download icon'></i>
//                                 Download CSV</button>
//                             <button className="btn" onClick={handleOpenDialog}><i className='bx bx-time icon'></i>
//                                 Add Role</button>
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
//                                             <col style={{ width: '15%' }} />
//                                             <col style={{ width: '15%' }} />
//                                         </colgroup>
//                                         <thead>
//                                             <tr>
//                                                 <th className="role-name">Role Name</th>
//                                                 <th className="salary">Salary</th>
//                                                 <th className="description">Description</th>
//                                                 <th className="action">Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {shiftData.map((item, index) => (
//                                                 <tr key={index}>
//                                                     <td className="role-name"><span className='role-chip' >Barista</span></td>
//                                                     <td className="salary"><span >2000000</span></td>
//                                                     <td className="description"><span >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente!</span></td>
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
// export default Roles;
//
import './Roles.scss';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import FormRole from '../../Components/FormRole';
import axios from 'axios';
import { toast } from 'sonner'; // Import Sonner for toast notifications

const Roles = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track index for editing
    const [selectedRole, setSelectedRole] = useState(null); // Track selected role for editing

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/roles');
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleOpenDialog = (index = null) => {
        if (index !== null) {
            setSelectedRole(roles[index]); // Set selected role for editing
            setEditIndex(index);
        } else {
            setSelectedRole(null); // Clear selected role when adding
            setEditIndex(null);
        }
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedRole(null); // Clear selected role when closing the dialog
    };

    const handleAddOrUpdateRole = async (roleData) => {
        try {
            if (selectedRole) {
                // Update existing role
                await axios.put(`http://localhost:5000/api/roles/${selectedRole._id}`, roleData);
                toast.success('Role updated successfully!');
            } else {
                // Add new role
                await axios.post('http://localhost:5000/api/roles', roleData);
                toast.success('Role added successfully!');
            }
            fetchRoles();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving role:', error);
            toast.error('Error saving role!');
        }
    };

    const handleDelete = async (index) => {
        const roleId = roles[index]._id;
        if (window.confirm('Are you sure you want to delete this role?')) {
            try {
                await axios.delete(`http://localhost:5000/api/roles/${roleId}`);
                fetchRoles();
                toast.success('Role deleted successfully!');
            } catch (error) {
                console.error('Error deleting role:', error);
                toast.error('Error deleting role!');
            }
        }
    };

    return (
        <>
            <FormRole
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                role={selectedRole}
                onSave={handleAddOrUpdateRole}
            />
            <div className="container">
                <Sidebar className="sidebar" />
                <div className="content">
                    <header className="header">
                        <div className="header-left">
                            <h1>Manage your Role & Salary</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                        </div>
                        <div className="header-right">
                            <button className="btn" onClick={handleOpenDialog}><i className='bx bx-time icon'></i>
                                Add Role</button>
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
                                            <col style={{ width: '15%' }} />
                                            <col style={{ width: '10%' }} />
                                            <col style={{ width: '15%' }} />
                                            <col style={{ width: '15%' }} />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th className="role-name">Role Name</th>
                                                <th className="salary">Salary</th>
                                                <th className="description">Description</th>
                                                <th className="action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {roles.map((item, index) => (
                                                <tr key={item._id}>
                                                    <td className="role-name"><span className='role-chip'>{item.role}</span></td>
                                                    <td className="salary"><span>{item.salary}</span></td>
                                                    <td className="description"><span>{item.description}</span></td>
                                                    <td className="action">
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

export default Roles;

