import './FormRole.scss';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import axios from 'axios'; // Pastikan axios sudah terinstall

const FormRole = ({ isOpen, onClose }) => {

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
                    <h2>Add Role</h2>
                    <p>Input yang bertanda <span className='warning-text'>*</span> wajib di isi</p>

                    <div className="form-container">
                        <div className="form-left">
                            <div className="form-group">
                                <label>Name Role<span className='warning-text'>*</span></label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Description<span className='warning-text'>*</span></label>
                                <input type="text" required />
                            </div>
                        </div>

                        <div className="form-right">
                            <div className="form-group">
                                <label>Salary<span className='warning-text'>*</span></label>
                                <input type="text" />
                            </div>
                            <div className="form-group">
                                <label>Gaji Diatur Berdasarkan Role</label>
                                <label>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed.</label>
                                {/* <input type="date" /> */}
                            </div>
                        </div>
                    </div>
                    <div className="button-group">
                        <button onClick={handleClose} className='warning-btn'>Batal</button>
                        <button className='btn'>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FormRole;
