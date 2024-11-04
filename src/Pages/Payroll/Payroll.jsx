// import './Payroll.scss';
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../Components/Sidebar.jsx';
// import FormPayroll from '../../Components/FormPayroll';
// import { toast } from 'sonner'; // Importing toast from Sonner
//
// export const Payroll = () => {
//     const [isDialogOpen, setDialogOpen] = useState(false);
//     const [payrolls, setPayrolls] = useState([]);
//
//     const handleOpenDialog = () => setDialogOpen(true);
//     const handleCloseDialog = () => setDialogOpen(false);
//
//     const fetchPayrolls = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/payroll/payrolls');
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setPayrolls(data.payrolls || []); // Simpan data payroll di state, atau set ke array kosong
//         } catch (error) {
//             console.error("Error fetching payrolls:", error);
//             setPayrolls([]); // Atur payrolls ke array kosong jika terjadi error
//         }
//     };
//
//     useEffect(() => {
//         fetchPayrolls();
//     }, []);
//
//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this payroll entry?")) {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/payroll/payroll/${id}`, {
//                     method: 'DELETE',
//                 });
//
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//
//                 // Fetch payrolls again to update the state
//                 fetchPayrolls(); 
//
//                 // Show success toast
//                 toast.success("Payroll entry deleted successfully!");
//             } catch (error) {
//                 console.error("Error deleting payroll:", error);
//                 // Show error toast
//                 toast.error("Failed to delete payroll entry.");
//             }
//         }
//     };
//
//     return (
//         <>
//             <FormPayroll
//                 isOpen={isDialogOpen}
//                 onClose={handleCloseDialog}
//                 onSuccess={fetchPayrolls} // Meneruskan fetchPayrolls sebagai props
//             />
//
//             <div className="container">
//                 <Sidebar className="sidebar" />
//                 <div className="content">
//                     <header className="header">
//                         <div className="header-left">
//                             <h1>Payroll</h1>
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
//                         </div>
//                         <div className="header-right">
//                             <button className="btn"><i className='bx bx-download icon'></i> Download CSV</button>
//                             <button className="btn" onClick={handleOpenDialog}><i className='bx bx-user-plus icon'></i> Add Payroll</button>
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
//                                 <div className="right">
//                                     <div className="alert">
//                                         <i className='bx bx-error'></i>
//                                         <a href='/dashboard'>salary distribution for the previous period has not been distributed. towards salary distribution</a>
//                                     </div>
//                                 </div>
//                             </div>
//
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
//                                                 <th className="date-add">Date Added</th>
//                                                 <th className="role">Role</th>
//                                                 <th className="shift">Net Salary</th>
//                                                 <th className="action">Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {payrolls.map((payroll) => (
//                                                 <tr key={payroll._id}>
//                                                     <td className="name">
//                                                         <div>{payroll.employee.fullName}</div>
//                                                         <div className="phone-number">{payroll.employee.phoneNumber}</div>
//                                                     </td>
//                                                     <td className="date">
//                                                         <div>{new Date(payroll.createdAt).toLocaleDateString()}</div>
//                                                     </td>
//                                                     <td className="role">
//                                                         <div>{payroll.employee.role}</div>
//                                                     </td>
//                                                     <td className="net-salary">
//                                                         <div>{payroll.netSalary.toLocaleString()}</div>
//                                                     </td>
//                                                     <td className="action">
//                                                         <button className="btn" onClick={() => handleDetail(payroll._id)}>Detail</button>
//                                                         <button className="warning-btn" onClick={() => handleDelete(payroll._id)}>Delete</button>
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
// export default Payroll;
//
import './Payroll.scss';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import FormPayroll from '../../Components/FormPayroll';
import { toast } from 'sonner'; // Importing toast from Sonner

export const Payroll = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [payrolls, setPayrolls] = useState([]);
    const [selectedPayroll, setSelectedPayroll] = useState(null);

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);

    const handleOpenDetailModal = () => setDetailModalOpen(true);
    const handleCloseDetailModal = () => setDetailModalOpen(false);

    const fetchPayrolls = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/payroll/payrolls');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPayrolls(data.payrolls || []);
        } catch (error) {
            console.error("Error fetching payrolls:", error);
            setPayrolls([]);
        }
    };

    const fetchPayrollDetail = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/payroll/payroll/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSelectedPayroll(data.payroll); // Set the fetched payroll data
            handleOpenDetailModal(); // Open the detail modal
        } catch (error) {
            console.error("Error fetching payroll detail:", error);
            toast.error("Failed to fetch payroll detail.");
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

                fetchPayrolls();
                toast.success("Payroll entry deleted successfully!");
            } catch (error) {
                console.error("Error deleting payroll:", error);
                toast.error("Failed to delete payroll entry.");
            }
        }
    };

    return (
        <>
            <FormPayroll
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={fetchPayrolls}
            />

            {/* Detail Modal */}
            {/* {isDetailModalOpen && selectedPayroll && ( */}
            {/*     <div className="modal"> */}
            {/*         <div className="modal-content"> */}
            {/*             <span className="close" onClick={handleCloseDetailModal}>&times;</span> */}
            {/*             <h2>Payroll Details</h2> */}
            {/*             <p><strong>Name:</strong> {selectedPayroll.employee.fullName}</p> */}
            {/*             <p><strong>NIK:</strong> {selectedPayroll.employee.nik}</p> */}
            {/*             <p><strong>Phone Number:</strong> {selectedPayroll.employee.phoneNumber}</p> */}
            {/*             <p><strong>Role:</strong> {selectedPayroll.employee.role}</p> */}
            {/*             <p><strong>Shift:</strong> {selectedPayroll.employee.shift}</p> */}
            {/*             <p><strong>Month:</strong> {selectedPayroll.month}</p> */}
            {/*             <p><strong>Year:</strong> {selectedPayroll.year}</p> */}
            {/*             <p><strong>Basic Salary:</strong> {selectedPayroll.basicSalary.toLocaleString()}</p> */}
            {/*             <p><strong>Net Salary:</strong> {selectedPayroll.netSalary.toLocaleString()}</p> */}
            {/*             <h3>Deductions</h3> */}
            {/*             <ul> */}
            {/*                 {selectedPayroll.deductions.map(deduction => ( */}
            {/*                     <li key={deduction._id}>{deduction.description}: {deduction.amount.toLocaleString()}</li> */}
            {/*                 ))} */}
            {/*             </ul> */}
            {/*             <h3>Bonuses</h3> */}
            {/*             <ul> */}
            {/*                 {selectedPayroll.bonuses.map(bonus => ( */}
            {/*                     <li key={bonus._id}>{bonus.name}: {bonus.amount.toLocaleString()}</li> */}
            {/*                 ))} */}
            {/*             </ul> */}
            {/*         </div> */}
            {/*     </div> */}
            {/* )} */}
            {isDetailModalOpen && selectedPayroll && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}>
                    {/* <div style={{ */}
                    {/*     backgroundColor: 'rgba(0, 0, 0, 0.6)', */}
                    {/*     borderRadius: '4px', */}
                    {/*     border: '1px solid #222', */}
                    {/*     padding: '20px', */}
                    {/*     boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', */}
                    {/*     width: '500px', */}
                    {/*     position: 'relative', */}
                    {/* }}> */}
                    <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px',
                        border: '1px solid #222',
                        padding: '20px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                        width: '500px',
                        position: 'relative',
                        backdropFilter: 'blur(4px)', // Tambahkan baris ini
                    }}>

                        <span style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            fontSize: '24px',
                            color: '#666',
                            cursor: 'pointer',
                            transition: 'color 0.2s',
                        }} onClick={handleCloseDetailModal}>&times;</span>
                        <h2 style={{
                            fontSize: '24px',
                            marginBottom: '20px',
                            color: '#fff',
                            textAlign: 'center',
                        }}>Payroll Detail</h2>
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ borderBottom: '2px solid #222', paddingBottom: '10px', marginBottom: '20px' }}>
                                <h3 style={{ margin: '0' }}>{selectedPayroll.employee.fullName}</h3>
                                <p><strong>NIK:</strong> {selectedPayroll.employee.nik}</p>
                                <p><strong>Phone Number:</strong> {selectedPayroll.employee.phoneNumber}</p>
                                <p><strong>Role:</strong> {selectedPayroll.employee.role}</p>
                                <p><strong>Shift:</strong> {selectedPayroll.employee.shift}</p>
                                <p><strong>Alpha:</strong> {selectedPayroll.alphaCount}</p>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <p><strong>Month:</strong> {selectedPayroll.month}</p>
                                <p><strong>Year:</strong> {selectedPayroll.year}</p>
                                <p><strong>Basic Salary:</strong> {selectedPayroll.basicSalary.toLocaleString()}</p>
                                <p><strong>Net Salary:</strong> {selectedPayroll.netSalary.toLocaleString()}</p>
                            </div>
                            <h3 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px', color: '#555' }}>Deductions</h3>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                {selectedPayroll.deductions.map(deduction => (
                                    <li key={deduction._id} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '8px 0',
                                        borderBottom: '1px solid #222',
                                    }}>
                                        {deduction.description}: <span style={{ color: '#52398e', fontWeight: 'bold' }}>{deduction.amount.toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                            <h3 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px', color: '#555' }}>Bonuses</h3>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                {selectedPayroll.bonuses.map(bonus => (
                                    <li key={bonus._id} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '8px 0',
                                        borderBottom: '1px solid #222',
                                    }}>
                                        {bonus.name}: <span style={{ color: '#ff0000', fontWeight: 'bold' }}>{bonus.amount.toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}


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
                                                        <button className="btn" onClick={() => fetchPayrollDetail(payroll._id)}>Detail</button>
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

