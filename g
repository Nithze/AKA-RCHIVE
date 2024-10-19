saya mau integrasi bang udah ada backend nya
buatin crud untuk shift bang 
nih saya kasih file file nya frontend 
sama route backend nya

struktur div nya jangan di ubah ubah yaa, nama class kaya name role segala macem ganti aja
nanti design nya berubah takutnyaberubah

Shitfs.jsx
import './Shifts.scss';
import React, { useState } from 'react';
// import React from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import FormShift from '../../Components/FormShift';

const shiftData = [
    { name: 'Azhar', phone: '08123456789', dateAdded: 'Sep 17, 2024', role: 'Barista', shift: 'Morning Shift', shiftTime: '07:00 AM - 03:00 PM' },
];

export const Shifts = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);
    return (
        <>
            <FormShift isOpen={isDialogOpen} onClose={handleCloseDialog} />
            <div className="container">
                <Sidebar className="sidebar" />
                {/* Content */}
                <div className="content">
                    {/* -------------------------------- */}
                    {/* Header */}
                    {/* -------------------------------- */}
                    <header className="header">
                        <div className="header-left">
                            <h1>Manage your shifts</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                        </div>
                        <div className="header-right">
                            <button className="btn" onClick={() => handleEdit(index)}><i className='bx bx-download icon'></i>
                                Download CSV</button>
                            <button className="btn" onClick={handleOpenDialog}><i className='bx bx-time icon'></i>
                                Add Shift</button>
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
                                                <th className="shitf-name">Shift Name</th>
                                                <th className="start-time">Start Time</th>
                                                <th className="end-time">End Time</th>
                                                <th className="description">Description</th>
                                                <th className="action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {shiftData.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="name">
                                                        <div>{item.name}</div>
                                                    </td>
                                                    <td className={date-add ${item.dateAdded.replace(' ', '-').toLowerCase()}}>
                                                        <div className="date-add">{item.dateAdded}</div>
                                                    </td>
                                                    <td className="role"><span >{item.role}</span></td>
                                                    <td className="shift">
                                                        <div>{item.shift}</div>
                                                    </td>
                                                    <td className="action">
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

export default Shifts;





FormShift.jsx
import './FormShift.scss';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import axios from 'axios'; // Pastikan axios sudah terinstall

const FormShift = ({ isOpen, onClose }) => {

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
                    <h2>Add Shift</h2>
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
                        </div>

                        <div className="form-right">
                            <div className="form-group">
                                <label>Tanggal Mulai Bekerja<span className='warning-text'>*</span></label>
                                <input type="date" />
                            </div>
                            <div className="form-group">
                                <label>Tanggal Mulai Bekerja<span className='warning-text'>*</span></label>
                                <input type="date" />
                            </div>
                        </div>
                    </div>
                    <p>NIK dan password digunakan untuk login</p>
                    <div className="button-group">
                        <button onClick={handleClose} className='warning-btn'>Batal</button>
                        <button className='btn'>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormShift;


route get all shifts
http://localhost:5000/api/shifts
hasil request
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
		"startTime": "07:00",
		"endTime": "23:00",
		"description": "Shift for morning duties",
		"createdAt": "2024-10-13T11:14:21.700Z",
		"updatedAt": "2024-10-18T12:01:26.765Z",
		"__v": 0
	}
]

route add shifts 
post http://localhost:5000/api/shifts
body json request nya
{
    "shiftName": "tet111111Shift",
    "startTime": "06:14", 
    "endTime": "07:07", 
    "description": "Shift for morning duties"
}


route update shift
http://localhost:5000/api/shifts/\670aa5eb9653884af5fa17b8
body request json
{
    "shiftName": "Morning 2",
    "startTime": "19:00", 
    "endTime": "23:00", 
    "description": "Shift for morning duties"
}


route delete shift
http://localhost:5000/api/shifts/66f28f72e6ae90526cd46db1
