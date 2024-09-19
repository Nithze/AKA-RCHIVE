
import React, { useState } from 'react';
import './FormAddEmployee.css';

const FormAddEmployee = ({ isOpen, onClose, onAddEmployee }) => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        phone: '',
        dateAdded: new Date().toLocaleDateString(),
        role: '',
        shift: '',
        shiftTime: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEmployee(employeeData);
        setEmployeeData({ name: '', phone: '', dateAdded: new Date().toLocaleDateString(), role: '', shift: '', shiftTime: '' });
    };

    return (
        <div className={`floating-form-container ${isOpen ? 'open' : ''}`}>
            <div className="floating-form">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={employeeData.name} onChange={handleChange} required />
                    <input type="text" name="phone" placeholder="Phone" value={employeeData.phone} onChange={handleChange} required />
                    <input type="text" name="role" placeholder="Role" value={employeeData.role} onChange={handleChange} required />
                    <input type="text" name="shift" placeholder="Shift" value={employeeData.shift} onChange={handleChange} required />
                    <input type="text" name="shiftTime" placeholder="Shift Time" value={employeeData.shiftTime} onChange={handleChange} required />
                    <button type="submit">Add Employee</button>
                </form>
            </div>
        </div>
    );
};

export default FormAddEmployee;

