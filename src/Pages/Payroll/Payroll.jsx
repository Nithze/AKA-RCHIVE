import './Payroll.scss';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import FormPayroll from '../../Components/FormPayroll';
import { toast } from 'sonner'; // Importing toast from Sonner

export const Payroll = () => {
    const handlePrint = () => {
        const printContent = document.getElementById("payroll-modal-content").innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // Reload to restore the original content
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Month is 0-indexed
    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleYearChange = (e) => setSelectedYear(Number(e.target.value));
    const handleMonthChange = (e) => setSelectedMonth(Number(e.target.value));


    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [payrolls, setPayrolls] = useState([]);
    const [selectedPayroll, setSelectedPayroll] = useState(null);

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);

    const handleOpenDetailModal = () => setDetailModalOpen(true);
    const handleCloseDetailModal = () => setDetailModalOpen(false);
    const filterPayrolls = () => {
        return payrolls.filter((payroll) => {
            const payrollDate = new Date(payroll.createdAt);
            const matchesYear = payrollDate.getFullYear() === selectedYear;
            const matchesMonth = payrollDate.getMonth() + 1 === selectedMonth;
            const matchesSearch = payroll.employee.fullName.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesYear && matchesMonth && matchesSearch;
        });
    };


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
                    <div id="payroll-modal-content" style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px',
                        border: '1px solid #222',
                        padding: '20px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                        width: '500px',
                        position: 'relative',
                        backdropFilter: 'blur(4px)',
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
                        <div style={{ marginBottom: '' }}>
                            <div style={{ borderBottom: '2px solid #222', paddingBottom: '10px', marginBottom: '20px' }}>
                                <h3 style={{ margin: '0' }}>{selectedPayroll.employee.fullName}</h3>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p><strong>NIK:</strong></p>
                                    <p style={{ fontSize: '18px' }}>{selectedPayroll.employee.nik}</p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p><strong>Phone Number:</strong></p>
                                    <p style={{ fontSize: '18px' }}>{selectedPayroll.employee.phoneNumber}</p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p><strong>Role:</strong></p>
                                    <p className='role-chip' style={{ fontSize: '18px' }}>{selectedPayroll.employee.role}</p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p><strong>Shift:</strong></p>
                                    <p style={{ fontSize: '18px' }}>{selectedPayroll.employee.shift}</p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p><strong>Alpha:</strong></p>
                                    <p style={{ fontSize: '18px' }}>{selectedPayroll.alphaCount}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p><strong>Date:</strong></p>
                                <p style={{ fontSize: '18px' }}>{`${selectedPayroll.month}/${selectedPayroll.year}`}</p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p><strong>Basic Salary:</strong></p>
                                <p style={{ fontSize: '18px' }}>{selectedPayroll.basicSalary.toLocaleString()}</p>
                            </div>
                            {/* Deductions Section */}
                            <h3 style={{ fontSize: '18px', marginTop: '0px', marginBottom: '10px', color: '#555' }}>Deductions</h3>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                {selectedPayroll.deductions.map(deduction => (
                                    <li key={deduction._id} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '8px 0',
                                        borderBottom: '1px solid #222',
                                    }}>
                                        <span>{deduction.description}:</span>
                                        <span style={{ color: '#555', fontWeight: 'bold', fontSize: '18px' }}>{deduction.amount.toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Bonuses Section */}
                            <h3 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px', color: '#555' }}>Bonuses</h3>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                {selectedPayroll.bonuses.map(bonus => (
                                    <li key={bonus._id} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '8px 0',
                                        borderBottom: '1px solid #222',
                                    }}>
                                        <span>{bonus.name}:</span>
                                        <span style={{ color: '#555', fontWeight: 'bold', fontSize: '18px' }}>{bonus.amount.toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Total Deductions */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                                <p><strong>Total Deductions:</strong></p>
                                <p style={{ fontSize: '18px', color: '#ff0000', fontWeight: 'bold' }}>
                                    {selectedPayroll.calculations.totalDeductions.toLocaleString()}
                                </p>
                            </div>


                            {/* Total Bonuses */}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p><strong>Total Bonuses:</strong></p>
                                <p style={{ fontSize: '18px', color: '#52398e', fontWeight: 'bold' }}>
                                    {selectedPayroll.bonuses.reduce((total, bonus) => total + bonus.amount, 0).toLocaleString()}
                                </p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '2px solid #222' }}>
                                <p><strong>Net Salary Calculation:</strong></p>
                                <div>
                                    <p style={{ fontSize: '16px', margin: '5px 0' }}>
                                        {`Basic Salary + Total Bonuses - Total Deductions`}
                                    </p>
                                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>
                                        {`${selectedPayroll.basicSalary.toLocaleString()} + ${selectedPayroll.calculations.totalBonus.toLocaleString()} - ${selectedPayroll.calculations.totalDeductions.toLocaleString()} = ${selectedPayroll.netSalary.toLocaleString()}`}
                                    </p>
                                </div>
                            </div>

                        </div>
                        <button onClick={handlePrint} style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#fff',
                            color: '#000',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}>Print</button>

                    </div>
                </div>
            )}



            <div className="container">
                <Sidebar className="sidebar" />
                <div className="content">
                    <header className="header">
                        <div className="header-left">
                            <h1>Payroll</h1>
                            <p>manage all payroll</p>
                        </div>
                        <div className="header-right">
                            {/* <button className="btn"><i className='bx bx-download icon'></i> Download CSV</button> */}
                            <button className="btn" onClick={handleOpenDialog}><i className='bx bx-user-plus icon'></i> Add Payroll</button>
                        </div>
                    </header>

                    <div className="main-container">
                        <div className="main">
                            {/* <div className="toolbar"> */}
                            {/*     <div className="left"> */}
                            {/*         <div className="search-bar"> */}
                            {/*             <input type="text" placeholder='Search Here ...' /> */}
                            {/*         </div> */}
                            {/*         <div className="filter"> */}
                            {/*             <select> */}
                            {/*                 <option value="year">year</option> */}
                            {/*             </select> */}
                            {/*             <select> */}
                            {/*                 <option value="month">month</option> */}
                            {/*             </select> */}
                            {/*         </div> */}
                            {/*     </div> */}
                            {/*     <div className="right"> */}
                            {/*         <div className="alert"> */}
                            {/*             <i className='bx bx-error'></i> */}
                            {/*             <a href='/dashboard'>salary distribution for the previous period has not been distributed. towards salary distribution</a> */}
                            {/*         </div> */}
                            {/*     </div> */}
                            {/* </div> */}
                            <div className="toolbar">
                                <div className="left">
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            placeholder="Search by employee name..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                    <div className="filter">
                                        <select value={selectedYear} onChange={handleYearChange}>
                                            {[...Array(5)].map((_, i) => {
                                                const year = new Date().getFullYear() - i;
                                                return <option key={year} value={year}>{year}</option>;
                                            })}
                                        </select>
                                        <select value={selectedMonth} onChange={handleMonthChange}>
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="alert">
                                        <i className='bx bx-error'></i>
                                        <a href='/payroll'>Salary distribution for the previous period has not been distributed. Proceed to salary distribution</a>
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
                                        {/* <tbody> */}
                                        {/*     {payrolls.map((payroll) => ( */}
                                        {/*         <tr key={payroll._id}> */}
                                        {/*             <td className="name"> */}
                                        {/*                 <div>{payroll.employee.fullName}</div> */}
                                        {/*                 <div className="phone-number">{payroll.employee.phoneNumber}</div> */}
                                        {/*             </td> */}
                                        {/*             <td className="date"> */}
                                        {/*                 <div>{new Date(payroll.createdAt).toLocaleDateString()}</div> */}
                                        {/*             </td> */}
                                        {/*             <td className="role"> */}
                                        {/*                 <div>{payroll.employee.role}</div> */}
                                        {/*             </td> */}
                                        {/*             <td className="net-salary"> */}
                                        {/*                 <div>{payroll.netSalary.toLocaleString()}</div> */}
                                        {/*             </td> */}
                                        {/*             <td className="action"> */}
                                        {/*                 <button className="btn" onClick={() => fetchPayrollDetail(payroll._id)}>Detail</button> */}
                                        {/*                 <button className="warning-btn" onClick={() => handleDelete(payroll._id)}>Delete</button> */}
                                        {/*             </td> */}
                                        {/*         </tr> */}
                                        {/*     ))} */}
                                        {/* </tbody> */}
                                        <tbody>
                                            {filterPayrolls().map((payroll) => (
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

