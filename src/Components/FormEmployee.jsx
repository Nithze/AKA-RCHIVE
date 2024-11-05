// import './FormEmployee.scss';
// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import axios from 'axios';
// import { toast } from 'sonner';
//
// const FormEmployee = ({ isOpen, onClose, employee, onSuccess }) => {
//     const [shifts, setShifts] = useState([]);
//     const [roles, setRoles] = useState([]);
//     const [formData, setFormData] = useState({
//         fullName: '',
//         nik: '',
//         birthDate: '',
//         gender: '',
//         address: '',
//         role: '',
//         startDate: '',
//         shift: '',
//         phoneNumber: '',
//         password: '',
//         bankAccountNumber: '',
//         accountHolderName: ''
//     });
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
//     useEffect(() => {
//         // Fetch shifts and roles from API when the component mounts
//         if (isOpen) {
//             // Fetch Shifts
//             axios.get('http://localhost:5000/api/shifts')
//                 .then(response => setShifts(response.data))
//                 .catch(error => console.error('Error fetching shifts:', error));
//
//             // Fetch Roles
//             axios.get('http://localhost:5000/api/roles')
//                 .then(response => setRoles(response.data))
//                 .catch(error => console.error('Error fetching roles:', error));
//         }
//     }, [isOpen]);
//
//     useEffect(() => {
//         // Populate form data if an employee is provided for editing
//         if (employee) {
//             setFormData({
//                 fullName: employee.fullName,
//                 nik: employee.nik,
//                 birthDate: employee.birthDate.split('T')[0], // Format date
//                 gender: employee.gender,
//                 address: employee.address,
//                 role: employee.role._id,
//                 startDate: employee.startDate.split('T')[0], // Format date
//                 shift: employee.shift._id,
//                 phoneNumber: employee.phoneNumber,
//                 password: employee.password,
//                 bankAccountNumber: employee.bankAccountNumber,
//                 accountHolderName: employee.accountHolderName
//             });
//         }
//     }, [employee]);
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
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const url = employee ? `http://localhost:5000/api/employees/${employee._id}` : 'http://localhost:5000/api/employees';
//         const method = employee ? 'put' : 'post';
//
//         axios[method](url, formData)
//             .then(response => {
//                 toast.success(employee ? 'Karyawan berhasil diperbarui!' : 'Karyawan berhasil ditambahkan!');
//                 // Reset form data after successful submission
//                 setFormData({
//                     fullName: '',
//                     nik: '',
//                     birthDate: '',
//                     gender: '',
//                     address: '',
//                     role: '',
//                     startDate: '',
//                     shift: '',
//                     phoneNumber: '',
//                     password: '',
//                     bankAccountNumber: '',
//                     accountHolderName: ''
//                 });
//                 handleClose();
//                 if (onSuccess) {
//                     onSuccess(); 
//                 }
//             })
//             .catch(error => {
//                 console.error(employee ? 'Error updating employee:' : 'Error adding employee:', error);
//                 toast.error(employee ? 'Gagal memperbarui karyawan.' : 'Gagal menambahkan karyawan.');
//             });
//     };
//
//     if (!isOpen) return null;
//
//     return (
//         <div className="dialog-overlay" onClick={handleClose} ref={overlayRef} style={{ opacity: 0 }}>
//             <div className="dialog" ref={dialogRef} style={{ transform: "scale(0)", opacity: 0 }} onClick={(e) => e.stopPropagation()}>
//                 <div className="add-employee">
//                     <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
//                     <p>Input yang bertanda <span className='warning-text'>*</span> wajib di isi</p>
//
//                     <div className="form-container">
//                         <div className="form-left">
//                             <div className="form-group">
//                                 <label>Nama Lengkap<span className='warning-text'>*</span></label>
//                                 <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} />
//                             </div>
//                             <div className="form-group">
//                                 <label>NIK<span className='warning-text'>*</span></label>
//                                 <input type="text" name="nik" required value={formData.nik} onChange={handleChange} />
//                             </div>
//                             <div className="form-group">
//                                 <label>Tanggal Lahir<span className='warning-text'>*</span></label>
//                                 <input type="date" name="birthDate" required value={formData.birthDate} onChange={handleChange} />
//                             </div>
//                             <div className="form-group">
//                                 <label>Jenis Kelamin<span className='warning-text'>*</span></label>
//                                 <select name="gender" value={formData.gender} onChange={handleChange}>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>Alamat Lengkap</label>
//                                 <input type="text" name="address" value={formData.address} onChange={handleChange} />
//                             </div>
//                             <div className="form-group">
//                                 <label>No Rekening <span className='warning-text'>*</span></label>
//                                 <input type="text" name="bankAccountNumber" required value={formData.bankAccountNumber} onChange={handleChange} />
//                             </div>
//                         </div>
//
//                         <div className="form-right">
//                             <div className="form-group">
//                                 <label>Role<span className='warning-text'>*</span></label>
//                                 <select name="role" required value={formData.role} onChange={handleChange}>
//                                     <option value="">Pilih Role</option>
//                                     {roles.map(role => (
//                                         <option key={role._id} value={role._id}>{role.role}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>Tanggal Mulai Bekerja<span className='warning-text'>*</span></label>
//                                 <input type="date" name="startDate" required value={formData.startDate} onChange={handleChange} />
//                             </div>
//                             <div className="form-group">
//                                 <label>Shift<span className='warning-text'>*</span></label>
//                                 <select name="shift" required value={formData.shift} onChange={handleChange}>
//                                     <option value="">Pilih Shift</option>
//                                     {shifts.map(shift => (
//                                         <option key={shift._id} value={shift._id}>{shift.shiftName}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>Nomor Telepon<span className='warning-text'>*</span></label>
//                                 <input type="tel" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} />
//                             </div>
//                             <div className="form-group">
//                                 <label>Password<span className='warning-text'>*</span></label>
//                                 <input name="password" required value={formData.password} onChange={handleChange} autoComplete="new-password" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Rekening Atas Nama<span className='warning-text'>*</span></label>
//                                 <input type="text" name="accountHolderName" required value={formData.accountHolderName} onChange={handleChange} />
//                             </div>
//                         </div>
//                     </div>
//                     <p>NIK dan password digunakan untuk login</p>
//                     <div className="button-group">
//                         <button onClick={handleClose} type="button" className='warning-btn'>Batal</button>
//                         <button onClick={handleSubmit} type="submit" className='btn'>Simpan</button>
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
import axios from 'axios';
import { toast } from 'sonner';

const FormEmployee = ({ isOpen, onClose, employee, onSuccess }) => {
    const [shifts, setShifts] = useState([]);
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        fullName: '',
        nik: '',
        birthDate: '',
        gender: '',
        address: '',
        role: '',
        startDate: '',
        shift: '',
        phoneNumber: '',
        password: '',
        bankAccountNumber: '',
        accountHolderName: ''
    });

    const [errors, setErrors] = useState({
        fullName: false,
        nik: false,
        phoneNumber: false,
        bankAccountNumber: false,
        accountHolderName: false,
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

    useEffect(() => {
        if (isOpen) {
            // Fetch shifts and roles from API when the component mounts
            axios.get('http://localhost:5000/api/shifts')
                .then(response => setShifts(response.data))
                .catch(error => console.error('Error fetching shifts:', error));

            axios.get('http://localhost:5000/api/roles')
                .then(response => setRoles(response.data))
                .catch(error => console.error('Error fetching roles:', error));
        }
    }, [isOpen]);

    useEffect(() => {
        if (employee) {
            setFormData({
                fullName: employee.fullName,
                nik: employee.nik,
                birthDate: employee.birthDate.split('T')[0],
                gender: employee.gender,
                address: employee.address,
                role: employee.role._id,
                startDate: employee.startDate.split('T')[0],
                shift: employee.shift._id,
                phoneNumber: employee.phoneNumber,
                password: employee.password,
                bankAccountNumber: employee.bankAccountNumber,
                accountHolderName: employee.accountHolderName
            });
        }
    }, [employee]);

    const handleClose = () => {
        gsap.to(dialogRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: onClose
        });
    };

    const validateInputs = (name, value) => {
        let isValid = true;
        switch (name) {
            case 'fullName':
                isValid = /^[^\d]*$/.test(value);
                if (!isValid) toast.error("Full name cannot contain numbers.");
                break;
            case 'nik':
                isValid = /^\d+$/.test(value);
                if (!isValid) toast.error("NIK must contain only numbers.");
                break;
            case 'phoneNumber':
                isValid = /^\d+$/.test(value);
                if (!isValid) toast.error("Phone number must contain only numbers.");
                break;
            case 'bankAccountNumber':
                isValid = /^\d+$/.test(value);
                if (!isValid) toast.error("Bank account number must contain only numbers.");
                break;
            case 'accountHolderName':
                isValid = /^[^\d]*$/.test(value);
                if (!isValid) toast.error("Account holder name cannot contain numbers.");
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [name]: !isValid }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        validateInputs(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = employee ? `http://localhost:5000/api/employees/${employee._id}` : 'http://localhost:5000/api/employees';
        const method = employee ? 'put' : 'post';

        if (Object.values(errors).some(error => error)) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

        axios[method](url, formData)
            .then(response => {
                toast.success(employee ? 'Employee updated successfully!' : 'Employee added successfully!');
                setFormData({
                    fullName: '',
                    nik: '',
                    birthDate: '',
                    gender: '',
                    address: '',
                    role: '',
                    startDate: '',
                    shift: '',
                    phoneNumber: '',
                    password: '',
                    bankAccountNumber: '',
                    accountHolderName: ''
                });
                handleClose();
                if (onSuccess) {
                    onSuccess(); 
                }
            })
            .catch(error => {
                console.error(employee ? 'Error updating employee:' : 'Error adding employee:', error);
                toast.error(employee ? 'Failed to update employee.' : 'Failed to add employee.');
            });
    };

    if (!isOpen) return null;

    return (
        <div className="dialog-overlay" onClick={handleClose} ref={overlayRef} style={{ opacity: 0 }}>
            <div className="dialog" ref={dialogRef} style={{ transform: "scale(0)", opacity: 0 }} onClick={(e) => e.stopPropagation()}>
                <div className="add-employee">
                    <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
                    <p>Input marked with <span className='warning-text'>*</span> is required</p>

                    <div className="form-container">
                        <div className="form-left">
                            <div className="form-group">
                                <label>Full Name<span className='warning-text'>*</span></label>
                                <input 
                                    type="text" 
                                    name="fullName" 
                                    required 
                                    value={formData.fullName} 
                                    onChange={handleChange} 
                                    className={errors.fullName ? 'error' : ''} 
                                />
                            </div>
                            <div className="form-group">
                                <label>NIK<span className='warning-text'>*</span></label>
                                <input 
                                    type="text" 
                                    name="nik" 
                                    required 
                                    value={formData.nik} 
                                    onChange={handleChange} 
                                    className={errors.nik ? 'error' : ''} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Birth Date<span className='warning-text'>*</span></label>
                                <input type="date" name="birthDate" required value={formData.birthDate} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Gender<span className='warning-text'>*</span></label>
                                <select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Full Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Bank Account Number<span className='warning-text'>*</span></label>
                                <input 
                                    type="text" 
                                    name="bankAccountNumber" 
                                    required 
                                    value={formData.bankAccountNumber} 
                                    onChange={handleChange} 
                                    className={errors.bankAccountNumber ? 'error' : ''} 
                                />
                            </div>
                        </div>

                        <div className="form-right">
                            <div className="form-group">
                                <label>Role<span className='warning-text'>*</span></label>
                                <select name="role" required value={formData.role} onChange={handleChange}>
                                    <option value="">Select Role</option>
                                    {roles.map(role => (
                                        <option key={role._id} value={role._id}>{role.role}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Start Date<span className='warning-text'>*</span></label>
                                <input type="date" name="startDate" required value={formData.startDate} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Shift<span className='warning-text'>*</span></label>
                                <select name="shift" required value={formData.shift} onChange={handleChange}>
                                    <option value="">Select Shift</option>
                                    {shifts.map(shift => (
                                        <option key={shift._id} value={shift._id}>{shift.shiftName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Phone Number<span className='warning-text'>*</span></label>
                                <input 
                                    type="tel" 
                                    name="phoneNumber" 
                                    required 
                                    value={formData.phoneNumber} 
                                    onChange={handleChange} 
                                    className={errors.phoneNumber ? 'error' : ''} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Password<span className='warning-text'>*</span></label>
                                <input 
                                    name="password" 
                                    required 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    autoComplete="new-password" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Account Holder Name<span className='warning-text'>*</span></label>
                                <input 
                                    type="text" 
                                    name="accountHolderName" 
                                    required 
                                    value={formData.accountHolderName} 
                                    onChange={handleChange} 
                                    className={errors.accountHolderName ? 'error' : ''} 
                                />
                            </div>
                        </div>
                    </div>
                    <p>NIK and password are used for login</p>
                    <div className="button-group">
                        <button onClick={handleClose} type="button" className='warning-btn'>Cancel</button>
                        <button onClick={handleSubmit} type="submit" className='btn'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEmployee;

