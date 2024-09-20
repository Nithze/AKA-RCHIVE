import './FormAddEmployee.scss';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FormAddEmployee = ({ isOpen, onClose }) => {
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
            <div className="dialog" ref={dialogRef} style={{ transform: "scale(0)", opacity: 0 }}>
                <div className="add-employee">
                    <h2>Add Employee</h2>
                    <p>Input yang bertanda <span className='warning-text'>*</span> wajib di isi</p>

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
                        <label>Nomor Telepon<span className='warning-text'>*</span></label>
                        <input type="number" required />
                    </div>
                    <div className="form-group">
                        <label>Password<span className='warning-text'>*</span></label>
                        <input type="password" />
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

export default FormAddEmployee;

