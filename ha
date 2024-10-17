buatin crud bang, yang lengkap yaa yang bener
nih saya kasih file file nya

//Employees.jsx
import './Employees.scss';
import React, { useState } from 'react';
// import React from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import FormEmployee from '../../Components/FormEmployee';

const shiftData = [
    { name: 'Azhar', phone: '08123456789', dateAdded: 'Sep 17, 2024', role: 'Barista', shift: 'Morning Shift', shiftTime: '07:00 AM - 03:00 PM' },
];

export const Employees = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);
    return (
        <>
            <FormEmployee isOpen={isDialogOpen} onClose={handleCloseDialog} />
            <div className="container">
                <Sidebar className="sidebar" />
                {/* Content */}
                <div className="content">
                    {/* -------------------------------- */}
                    {/* Header */}
                    {/* -------------------------------- */}
                    <header className="header">
                        <div className="header-left">
                            <h1>Manage your employees</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                        </div>
                        <div className="header-right">
                            <button className="btn" onClick={() => handleEdit(index)}><i className='bx bx-download icon'></i>
                                Download CSV</button>
                            <button className="btn" onClick={handleOpenDialog}><i className='bx bx-user-plus icon'></i>
                                Add Employee</button>
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
                                                    <td className={date-add ${item.dateAdded.replace(' ', '-').toLowerCase()}}>
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
        console.log(Edit employee at index ${index});
        // Tambahkan logic untuk proses edit di sini
    }

    // Handler function untuk delete
    function handleDelete(index) {
        console.log(Delete employee at index ${index});
        // Tambahkan logic untuk proses delete di sini
    }
};

export default Employees;



//FormEmployee.jsx
import './FormEmployee.scss';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FormEmployee = ({ isOpen, onClose }) => {
    const overlayRef = useRef(null);
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
            gsap.to(dialogRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
        } else {
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.inOut" });
            gsap.to(dialogRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleClose = () => {
        gsap.to(dialogRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: onClose
        });
    };

    return (
        <div className="dialog-overlay" onClick={handleClose} ref={overlayRef} style={{ opacity: 0 }}>
            <div className="dialog" ref={dialogRef} style={{ transform: "scale(0)", opacity: 0 }} onClick={(e) => e.stopPropagation()}>
                <div className="add-employee">
                    <h2>Add Employee</h2>
                    <p>Input yang bertanda <span className='warning-text'>*</span> wajib di isi</p>

                    <div className="form-container">

                        <div className="form-left">
                            <div className="form-group">
                                <label>Nama Lengkap<span className='warning-text'>*</span></label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>NIK<span className='warning-text'>*</span></label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Tanggal Lahir<span className='warning-text'>*</span></label>
                                <input type="date" required />
                            </div>
                            <div className="form-group">
                                <label>Jenis Kelamin<span className='warning-text'>*</span></label>
                                <select>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Alamat Lengkap</label>
                                <input type="text" />
                            </div>
                            <div className="form-group">
                                <label>No Rekening <span className='warning-text'>*</span></label>
                                <input type="text" />
                            </div>
                        </div>




                        <div className="form-right">

                            <div className="form-group">
                                <label>Role/Jabatan<span className='warning-text'>*</span></label>
                                <select>
                                    <option value="role1">Role 1</option>
                                    <option value="role2">Role 2</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tanggal Mulai Bekerja<span className='warning-text'>*</span></label>
                                <input type="date" />
                            </div>
                            <div className="form-group">
                                <label>Shift<span className='warning-text'>*</span></label>
                                <select>
                                    <option value="morning">Morning</option>
                                    <option value="Night">Night</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Nomor Telepon<span className='warning-text'>*</span></label>
                                <input type="number" required />
                            </div>
                            <div className="form-group">
                                <label>Password<span className='warning-text'>*</span></label>
                                <input type="text" />
                            </div>
                            <div className="form-group">
                                <label>Rekening Atas Nama<span className='warning-text'>*</span></label>
                                <input type="text" />
                            </div>
                        </div>

                    </div>
                    <p>NIK dan Nomor Telepon dapat digunakan untuk login</p>
                    <div className="button-group">
                        <button onClick={handleClose} className='warning-btn'>Batal</button>
                        <button className='btn'>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEmployee;

nih route Backend nya
get all employee 
http://localhost:5000/api/employees
hasil request
[
	{
		"_id": "670aa6179653884af5fa17be",
		"fullName": "testautohehe",
		"nik": "222",
		"birthDate": "1990-01-01T00:00:00.000Z",
		"gender": "Male",
		"address": "123 Main St, City, Country",
		"role": {
			"_id": "66f3df3d9729db1919e1a748",
			"role": "Barista",
			"salary": 3000000,
			"description": "barista.",
			"createdAt": "2024-09-25T10:00:29.105Z",
			"updatedAt": "2024-09-25T10:07:19.463Z",
			"__v": 0
		},
		"startDate": "2022-01-01T00:00:00.000Z",
		"shift": {
			"_id": "670aa5eb9653884af5fa17b8",
			"shiftName": "Morning",
			"startTime": "13:00",
			"endTime": "13:51",
			"description": "Shift for morning duties",
			"createdAt": "2024-10-12T16:38:03.272Z",
			"updatedAt": "2024-10-13T06:27:12.314Z",
			"__v": 0
		},
		"phoneNumber": "085925327256",
		"password": "test123",
		"bankAccountNumber": "1234567890",
		"accountHolderName": "Test Name",
		"createdAt": "2024-10-12T16:38:47.373Z",
		"updatedAt": "2024-10-12T16:38:47.373Z",
		"__v": 0
	},

post add employee
http://localhost:5000/api/employees
body request json
{
    "fullName": "TERBARU NIH",
    "nik": "777",
    "birthDate": "1990-01-01",
    "gender": "Male",
    "address": "123 Main St, City, Country",
    "role": "66f3df3d9729db1919e1a748",
    "startDate": "2022-10-13",
    "shift": "670bab8d33278d24ccd7796d",
    "phoneNumber": "085925327256",
    "password": "test123",
    "bankAccountNumber": "1234567890", 
    "accountHolderName": "Test Name" 
}

put update employee
http://localhost:5000/api/employees/670bb307da66a7bc51de8406
body request json
{
    "fullName": "FIXX TEST",
    "nik": "44444",
    "birthDate": "1990-01-01",
    "gender": "Male",
    "address": "123 Main St, City, Country",
    "role": "66f3df3d9729db1919e1a748",
    "startDate": "2024-10-13",
    "shift": "670bab8d33278d24ccd7796d",
    "phoneNumber": "085925327256",
    "password": "test123",
    "bankAccountNumber": "1234567890", 
    "accountHolderName": "Test Name" 
}

delete 
http://localhost:5000/api/employees/66f3e8beb83086634f4e0237


get all role ( buat dropdown di form nya )
http://localhost:5000/api/roles
hasil request
[
	{
		"_id": "66f3df3d9729db1919e1a748",
		"role": "Barista",
		"salary": 3000000,
		"description": "barista.",
		"createdAt": "2024-09-25T10:00:29.105Z",
		"updatedAt": "2024-09-25T10:07:19.463Z",
		"__v": 0
	},
	{
		"_id": "66f3e2939729db1919e1a750",
		"role": "Kithcen",
		"salary": 3000000,
		"description": "kithzen.",
		"createdAt": "2024-09-25T10:14:43.927Z",
		"updatedAt": "2024-09-25T10:14:43.927Z",
		"__v": 0
	}
]

get all shift ( buat dropdown di form )
http://localhost:5000/api/shifts
hasil req
[
	{
		"_id": "670aa5eb9653884af5fa17b8",
		"shiftName": "Morning",
		"startTime": "13:00",
		"endTime": "13:51",
		"description": "Shift for morning duties",
		"createdAt": "2024-10-12T16:38:03.272Z",
		"updatedAt": "2024-10-13T06:27:12.314Z",
		"__v": 0
	},
	{
		"_id": "670bab8d33278d24ccd7796d",
		"shiftName": "Morning Shift",
		"startTime": "19:01",
		"endTime": "21:15",
		"description": "Shift for morning duties",
		"createdAt": "2024-10-13T11:14:21.700Z",
		"updatedAt": "2024-10-16T12:04:26.862Z",
		"__v": 0
	}
]
