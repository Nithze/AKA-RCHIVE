import './Payroll.scss';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import FormPayroll from '../../Components/FormPayroll';
import { toast } from 'sonner'; // Importing toast from Sonner

export const Payroll = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [payrolls, setPayrolls] = useState([]);

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);

    const fetchPayrolls = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/payroll/payrolls');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPayrolls(data.payrolls || []); // Simpan data payroll di state, atau set ke array kosong
        } catch (error) {
            console.error("Error fetching payrolls:", error);
            setPayrolls([]); // Atur payrolls ke array kosong jika terjadi error
        }
    };

    useEffect(() => {
        fetchPayrolls();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this payroll entry?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/payroll/payroll/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Fetch payrolls again to update the state
                fetchPayrolls(); 

                // Show success toast
                toast.success("Payroll entry deleted successfully!");
            } catch (error) {
                console.error("Error deleting payroll:", error);
                // Show error toast
                toast.error("Failed to delete payroll entry.");
            }
        }
    };

    return (
        <>
            <FormPayroll
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={fetchPayrolls} // Meneruskan fetchPayrolls sebagai props
            />

            <div className="container">
                <Sidebar className="sidebar" />
                <div className="content">
                    <header className="header">
                        <div className="header-left">
                            <h1>Payroll</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                        </div>
                        <div className="header-right">
                            <button className="btn"><i className='bx bx-download icon'></i> Download CSV</button>
                            <button className="btn" onClick={handleOpenDialog}><i className='bx bx-user-plus icon'></i> Add Payroll</button>
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
                                                <th className="date-add">Date Added</th>
                                                <th className="role">Role</th>
                                                <th className="shift">Net Salary</th>
                                                <th className="action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payrolls.map((payroll) => (
                                                <tr key={payroll._id}>
                                                    <td className="name">
                                                        <div>{payroll.employee.fullName}</div>
                                                        <div className="phone-number">{payroll.employee.phoneNumber}</div>
                                                    </td>
                                                    <td className="date">
                                                        <div>{new Date(payroll.createdAt).toLocaleDateString()}</div>
                                                    </td>
                                                    <td className="role">
                                                        <div>{payroll.employee.role}</div>
                                                    </td>
                                                    <td className="net-salary">
                                                        <div>{payroll.netSalary.toLocaleString()}</div>
                                                    </td>
                                                    <td className="action">
                                                        <button className="btn" onClick={() => handleEdit(payroll._id)}>Detail</button>
                                                        <button className="warning-btn" onClick={() => handleDelete(payroll._id)}>Delete</button>
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

export default Payroll;

