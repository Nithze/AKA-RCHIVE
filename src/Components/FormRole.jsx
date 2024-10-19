// import './FormRole.scss';
// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import axios from 'axios'; // Pastikan axios sudah terinstall
//
// const FormRole = ({ isOpen, onClose }) => {
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
//                     <h2>Add Role</h2>
//                     <p>Input yang bertanda <span className='warning-text'>*</span> wajib di isi</p>
//
//                     <div className="form-container">
//                         <div className="form-left">
//                             <div className="form-group">
//                                 <label>Name Role<span className='warning-text'>*</span></label>
//                                 <input type="text" required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Description<span className='warning-text'>*</span></label>
//                                 <input type="text" required />
//                             </div>
//                         </div>
//
//                         <div className="form-right">
//                             <div className="form-group">
//                                 <label>Salary<span className='warning-text'>*</span></label>
//                                 <input type="text" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Gaji Diatur Berdasarkan Role</label>
//                                 <label>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed.</label>
//                                 {/* <input type="date" /> */}
//                             </div>
//                         </div>
//                     </div>
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
//
// export default FormRole;
import './FormRole.scss';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { toast } from 'sonner';

const FormRole = ({ isOpen, onClose, role, onSave }) => {
    const overlayRef = useRef(null);
    const dialogRef = useRef(null);
    const [formData, setFormData] = React.useState({
        role: '',
        salary: '',
        description: '',
    });

    useEffect(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
            gsap.to(dialogRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
            if (role) {
                setFormData({
                    role: role.role,
                    salary: role.salary,
                    description: role.description,
                });
            } else {
                setFormData({ role: '', salary: '', description: '' });
            }
        } else {
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.inOut" });
            gsap.to(dialogRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
        }
    }, [isOpen, role]);

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
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.role || !formData.salary || !formData.description) {
            toast.error('All fields are required!');
            return;
        }
        onSave(formData); // Pass the form data to parent component
    };

    if (!isOpen) return null;

    return (
        <div className="dialog-overlay" onClick={handleClose} ref={overlayRef} style={{ opacity: 0 }}>
            <div className="dialog" ref={dialogRef} style={{ transform: "scale(0)", opacity: 0 }} onClick={(e) => e.stopPropagation()}>
                <div className="add-employee">
                    <h2>{role ? 'Edit Role' : 'Add Role'}</h2>
                    <p>Input yang bertanda <span className='warning-text'>*</span> wajib di isi</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-container">
                            <div className="form-left">
                                <div className="form-group">
                                    <label>Name Role<span className='warning-text'>*</span></label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description<span className='warning-text'>*</span></label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-right">
                                <div className="form-group">
                                    <label>Salary<span className='warning-text'>*</span></label>
                                    <input
                                        type="text"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="button-group">
                            <button type="button" className="warning-btn" onClick={handleClose}>Cancel</button>
                            <button type="submit" className="btn">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormRole;

