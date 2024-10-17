// import './Employees.scss';
// import React, { useState } from 'react';
// // import React from 'react';
// import Sidebar from '../../Components/Sidebar.jsx';
// import FormEmployee from '../../Components/FormEmployee';
//
// const shiftData = [
//     { name: 'Azhar', phone: '08123456789', dateAdded: 'Sep 17, 2024', role: 'Barista', shift: 'Morning Shift', shiftTime: '07:00 AM - 03:00 PM' },
// ];
//
// export const Employees = () => {
//     const [isDialogOpen, setDialogOpen] = useState(false);
//
//     const handleOpenDialog = () => setDialogOpen(true);
//     const handleCloseDialog = () => setDialogOpen(false);
//     return (
//         <>
//             <FormEmployee isOpen={isDialogOpen} onClose={handleCloseDialog} />
//             <div className="container">
//                 <Sidebar className="sidebar" />
//                 {/* Content */}
//                 <div className="content">
//                     {/* -------------------------------- */}
//                     {/* Header */}
//                     {/* -------------------------------- */}
//                     <header className="header">
//                         <div className="header-left">
//                             <h1>Manage your employees</h1>
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
//                         </div>
//                         <div className="header-right">
//                             <button className="btn" onClick={() => handleEdit(index)}><i className='bx bx-download icon'></i>
//                                 Download CSV</button>
//                             <button className="btn" onClick={handleOpenDialog}><i className='bx bx-user-plus icon'></i>
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
//                                             <col style={{ width: '5%' }} />
//                                             <col style={{ width: '15%' }} />
//                                             <col style={{ width: '15%' }} />
//                                         </colgroup>
//                                         <thead>
//                                             <tr>
//                                                 <th className="name">Name</th>
//                                                 <th className="date-add">Date added</th>
//                                                 <th className="role">Role</th>
//                                                 <th className="shift">Shift</th>
//                                                 <th className="action">Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {shiftData.map((item, index) => (
//                                                 <tr key={index}>
//                                                     <td className="name">
//                                                         <div>{item.name}</div>
//                                                         <div className="phone-number">{item.phone}</div>
//                                                     </td>
//                                                     <td className={`date-add ${item.dateAdded.replace(' ', '-').toLowerCase()}`}>
//                                                         <div>{item.presence}</div>
//                                                         <div className="date-add">{item.dateAdded}</div>
//                                                     </td>
//                                                     <td className="role"><span className="role-chip">{item.role}</span></td>
//                                                     <td className="shift">
//                                                         <div>{item.shift}</div>
//                                                         <div className="shift-time">{item.shiftTime}</div>
//                                                     </td>
//                                                     <td className="action">
//                                                         <button className="btn" onClick={() => handleEdit(index)}>Detail</button>
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
// export default Employees;
//
// import './Employees.scss';
// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../Components/Sidebar.jsx';
// import FormEmployee from '../../Components/FormEmployee';
// import axios from 'axios';
//
// export const Employees = () => {
//     const [isDialogOpen, setDialogOpen] = useState(false);
//     const [employees, setEmployees] = useState([]);
//
//     // Fetch employees when the component mounts
//     useEffect(() => {
//         const fetchEmployees = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/employees');
//                 setEmployees(response.data);
//             } catch (error) {
//                 console.error('Error fetching employees:', error);
//             }
//         };
//
//         fetchEmployees();
//     }, []);
//
//     const handleOpenDialog = () => setDialogOpen(true);
//     const handleCloseDialog = () => setDialogOpen(false);
//
//     const handleAddEmployee = (newEmployee) => {
//         setEmployees((prev) => [...prev, newEmployee]);
//         handleCloseDialog();
//     };
//
//     return (
//         <>
//             <FormEmployee isOpen={isDialogOpen} onClose={handleCloseDialog} onAddEmployee={handleAddEmployee} />
//             <div className="container">
//                 <Sidebar className="sidebar" />
//                 <div className="content">
//                     <header className="header">
//                         <div className="header-left">
//                             <h1>Manage your employees</h1>
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
//                         </div>
//                         <div className="header-right">
//                             <button className="btn" onClick={handleOpenDialog}>
//                                 <i className='bx bx-user-plus icon'></i>
//                                 Add Employee
//                             </button>
//                         </div>
//                     </header>
//
//                     <div className="main-container">
//                         <div className="main">
//                             <div className="list-employees">
//                                 <div className="table-container">
//                                     <table>
//                                         <colgroup>
//                                             <col style={{ width: '15%' }} />
//                                             <col style={{ width: '10%' }} />
//                                             <col style={{ width: '15%' }} />
//                                             <col style={{ width: '15%' }} />
//                                             <col style={{ width: '15%' }} />
//                                         </colgroup>
//                                         <thead>
//                                             <tr>
//                                                 <th className="name">Name</th>
//                                                 <th className="date-add">Date added</th>
//                                                 <th className="role">Role</th>
//                                                 <th className="shift">Shift</th>
//                                                 <th className="action">Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {employees.map((employee, index) => (
//                                                 <tr key={employee._id}>
//                                                     <td className="name">
//                                                         <div>{employee.fullName}</div>
//                                                         <div className="phone-number">{employee.phoneNumber}</div>
//                                                     </td>
//                                                     <td className="date-add">
//                                                         <div>{new Date(employee.startDate).toLocaleDateString()}</div>
//                                                     </td>
//                                                     <td className="role"><span className="role-chip">{employee.role.role}</span></td>
//                                                     <td className="shift">
//                                                         <div>{employee.shift.shiftName}</div>
//                                                         <div className="shift-time">{employee.shift.startTime} - {employee.shift.endTime}</div>
//                                                     </td>
//                                                     <td className="action">
//                                                         <button className="btn">Detail</button>
//                                                         <button className="btn">Edit</button>
//                                                         <button className="warning-btn">Delete</button>
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
// export default Employees;
//
import './Employees.scss';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import FormEmployee from '../../Components/FormEmployee';
import axios from 'axios';

export const Employees = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null); // For editing employees

    // Fetch employees when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleOpenDialog = (employee = null) => {
        setSelectedEmployee(employee); // Set the employee to be edited
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedEmployee(null); // Reset the selected employee
        setDialogOpen(false);
    };

    const handleAddEmployee = (newEmployee) => {
        setEmployees((prev) => [...prev, newEmployee]);
        handleCloseDialog();
    };

    const handleEditEmployee = (updatedEmployee) => {
        setEmployees((prev) =>
            prev.map((employee) => (employee._id === updatedEmployee._id ? updatedEmployee : employee))
        );
        handleCloseDialog();
    };

    const handleDeleteEmployee = async (employeeId) => {
        try {
            await axios.delete(`http://localhost:5000/api/employees/${employeeId}`);
            setEmployees((prev) => prev.filter((employee) => employee._id !== employeeId));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <>
            <FormEmployee 
                isOpen={isDialogOpen} 
                onClose={handleCloseDialog} 
                onAddEmployee={handleAddEmployee} 
                onEditEmployee={handleEditEmployee} 
                employee={selectedEmployee} // Pass selected employee for editing
            />
            <div className="container">
                <Sidebar className="sidebar" />
                <div className="content">
                    <header className="header">
                        <div className="header-left">
                            <h1>Manage your employees</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                        </div>
                        <div className="header-right">
                            <button className="btn" onClick={() => handleOpenDialog()}>
                                <i className='bx bx-user-plus icon'></i>
                                Add Employee
                            </button>
                        </div>
                    </header>

                    <div className="main-container">
                        <div className="main">
                            <div className="list-employees">
                                <div className="table-container">
                                    <table>
                                        <colgroup>
                                            <col style={{ width: '15%' }} />
                                            <col style={{ width: '10%' }} />
                                            <col style={{ width: '15%' }} />
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
                                            {employees.map((employee) => (
                                                <tr key={employee._id}>
                                                    <td className="name">
                                                        <div>{employee.fullName}</div>
                                                        <div className="phone-number">{employee.phoneNumber}</div>
                                                    </td>
                                                    <td className="date-add">
                                                        <div>{new Date(employee.startDate).toLocaleDateString()}</div>
                                                    </td>
                                                    <td className="role">
                                                        <span className="role-chip">{employee.role.role}</span>
                                                    </td>
                                                    <td className="shift">
                                                        <div>{employee.shift.shiftName}</div>
                                                        <div className="shift-time">{employee.shift.startTime} - {employee.shift.endTime}</div>
                                                    </td>
                                                    <td className="action">
                                                        <button className="btn" onClick={() => handleOpenDialog(employee)}>Edit</button>
                                                        <button 
                                                            className="warning-btn" 
                                                            onClick={() => handleDeleteEmployee(employee._id)}
                                                        >
                                                            Delete
                                                        </button>
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

export default Employees;

