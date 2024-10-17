// import './FormEmployee.scss';
// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import axios from 'axios'; // Pastikan axios sudah terinstall
//
// const FormEmployee = ({ isOpen, onClose }) => {
//     const [shifts, setShifts] = useState([]);
//     const [roles, setRoles] = useState([]);
//
//     const overlayRef = useRef(null);
//     const dialogRef = useRef(null);
//
//     useEffect(() => {
//         if (isOpen) {
//             gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
//             gsap.to(dialogRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
//         } else {
//             gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.inOut" });
//             gsap.to(dialogRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
//         }
//     }, [isOpen]);
//
//     // Fetch shifts and roles from API when the component mounts
//     useEffect(() => {
//         if (isOpen) {
//             // Fetch Shifts
//             axios.get('http://localhost:5000/api/shifts')
//                 .then(response => {
//                     setShifts(response.data); // Simpan shifts ke state
//                 })
//                 .catch(error => {
//                     console.error('Error fetching shifts:', error);
//                 });
//
//             // Fetch Roles
//             axios.get('http://localhost:5000/api/roles')
//                 .then(response => {
//                     setRoles(response.data); // Simpan roles ke state
//                 })
//                 .catch(error => {
//                     console.error('Error fetching roles:', error);
//                 });
//         }
//     }, [isOpen]);
//
//     if (!isOpen) return null;
//
//     const handleClose = () => {
//         gsap.to(dialogRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
//         gsap.to(overlayRef.current, {
//             opacity: 0,
//             duration: 0.3,
//             ease: "power2.inOut",
//             onComplete: onClose
//         });
//     };
//
//     return (
//         <div className="dialog-overlay" onClick={handleClose} ref={overlayRef} style={{ opacity: 0 }}>
//             <div className="dialog" ref={dialogRef} style={{ transform: "scale(0)", opacity: 0 }} onClick={(e) => e.stopPropagation()}>
//                 <div className="add-employee">
//                     <h2>Add Employee</h2>
//                     <p>Input yang bertanda <span className='warning-text'>*</span> wajib di isi</p>
//
//                     <div className="form-container">
//                         <div className="form-left">
//                             <div className="form-group">
//                                 <label>Nama Lengkap<span className='warning-text'>*</span></label>
//                                 <input type="text" required />
//                             </div>
//                             <div className="form-group">
//                                 <label>NIK<span className='warning-text'>*</span></label>
//                                 <input type="text" required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Tanggal Lahir<span className='warning-text'>*</span></label>
//                                 <input type="date" required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Jenis Kelamin<span className='warning-text'>*</span></label>
//                                 <select>
//                                     <option value="male">Male</option>
//                                     <option value="female">Female</option>
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>Alamat Lengkap</label>
//                                 <input type="text" />
//                             </div>
//                             <div className="form-group">
//                                 <label>No Rekening <span className='warning-text'>*</span></label>
//                                 <input type="text" />
//                             </div>
//                         </div>
//
//                         <div className="form-right">
//                             <div className="form-group">
//                                 <label>Role/Jabatan<span className='warning-text'>*</span></label>
//                                 <select>
//                                     {roles.map(role => (
//                                         <option key={role._id} value={role._id}>{role.role}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>Tanggal Mulai Bekerja<span className='warning-text'>*</span></label>
//                                 <input type="date" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Shift<span className='warning-text'>*</span></label>
//                                 <select>
//                                     {shifts.map(shift => (
//                                         <option key={shift._id} value={shift._id}>{shift.shiftName}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>Nomor Telepon<span className='warning-text'>*</span></label>
//                                 <input type="number" required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Password<span className='warning-text'>*</span></label>
//                                 <input type="text" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Rekening Atas Nama<span className='warning-text'>*</span></label>
//                                 <input type="text" />
//                             </div>
//                         </div>
//                     </div>
//                     <p>NIK dan password digunakan untuk login</p>
//                     <div className="button-group">
//                         <button onClick={handleClose} className='warning-btn'>Batal</button>
//                         <button className='btn'>Simpan</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default FormEmployee;
//
import './FormEmployee.scss';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import axios from 'axios'; // Pastikan axios sudah terinstall

const FormEmployee = ({ isOpen, onClose }) => {
    const [shifts, setShifts] = useState([]);
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        fullName: '',
        nik: '',
        birthDate: '',
        gender: 'Male',
        address: '',
        accountNumber: '',
        role: '',
        startDate: '',
        shift: '',
        phoneNumber: '',
        password: '',
        bankAccountName: ''
    });

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

    // Fetch shifts and roles from API when the component mounts
    useEffect(() => {
        if (isOpen) {
            // Fetch Shifts
            axios.get('http://localhost:5000/api/shifts')
                .then(response => {
                    setShifts(response.data); // Simpan shifts ke state
                })
                .catch(error => {
                    console.error('Error fetching shifts:', error);
                });

            // Fetch Roles
            axios.get('http://localhost:5000/api/roles')
                .then(response => {
                    setRoles(response.data); // Simpan roles ke state
                })
                .catch(error => {
                    console.error('Error fetching roles:', error);
                });
        }
    }, [isOpen]);

    const handleClose = () => {
        gsap.to(dialogRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: onClose
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/employees', formData)
            .then(response => {
                console.log('Employee added:', response.data);
                // Reset form data after successful submission
                setFormData({
                    fullName: '',
                    nik: '',
                    birthDate: '',
                    gender: 'male',
                    address: '',
                    accountNumber: '',
                    role: '',
                    startDate: '',
                    shift: '',
                    phoneNumber: '',
                    password: '',
                    bankAccountName: ''
                });
                handleClose();
            })
            .catch(error => {
                console.error('Error adding employee:', error);
            });
    };

    if (!isOpen) return null;

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
                                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>NIK<span className='warning-text'>*</span></label>
                                <input type="text" name="nik" required value={formData.nik} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Tanggal Lahir<span className='warning-text'>*</span></label>
                                <input type="date" name="birthDate" required value={formData.birthDate} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Jenis Kelamin<span className='warning-text'>*</span></label>
                                <select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Alamat Lengkap</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>No Rekening <span className='warning-text'>*</span></label>
                                <input type="text" name="accountNumber" required value={formData.accountNumber} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-right">
                            <div className="form-group">
                                <label>Role/Jabatan<span className='warning-text'>*</span></label>
                                <select name="role" required value={formData.role} onChange={handleChange}>
                                    <option value="">Pilih Jabatan</option>
                                    {roles.map(role => (
                                        <option key={role._id} value={role._id}>{role.role}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tanggal Mulai Bekerja<span className='warning-text'>*</span></label>
                                <input type="date" name="startDate" required value={formData.startDate} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Shift<span className='warning-text'>*</span></label>
                                <select name="shift" required value={formData.shift} onChange={handleChange}>
                                    <option value="">Pilih Shift</option>
                                    {shifts.map(shift => (
                                        <option key={shift._id} value={shift._id}>{shift.shiftName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Nomor Telepon<span className='warning-text'>*</span></label>
                                <input type="tel" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Password<span className='warning-text'>*</span></label>
                                <input type="password" name="password" required value={formData.password} onChange={handleChange} autoComplete="new-password"/>
                            </div>
                            <div className="form-group">
                                <label>Rekening Atas Nama<span className='warning-text'>*</span></label>
                                <input type="text" name="bankAccountName" required value={formData.bankAccountName} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <p>NIK dan password digunakan untuk login</p>
                    <div className="button-group">
                        <button onClick={handleClose} className='warning-btn'>Batal</button>
                        <button className='btn' onClick={handleSubmit}>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEmployee;

