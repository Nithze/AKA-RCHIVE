// import './FormShift.scss';
// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import axios from 'axios'; // Pastikan axios sudah terinstall
//
// const FormShift = ({ isOpen, onClose }) => {
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
//                     <h2>Add Shift</h2>
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
//                         </div>
//
//                         <div className="form-right">
//                             <div className="form-group">
//                                 <label>Tanggal Mulai Bekerja<span className='warning-text'>*</span></label>
//                                 <input type="date" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Tanggal Mulai Bekerja<span className='warning-text'>*</span></label>
//                                 <input type="date" />
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
//
// // export default FormShift;
// import './FormShift.scss';
// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import axios from 'axios';
//
// const FormShift = ({ isOpen, onClose, shift, refreshShifts }) => {
//     const overlayRef = useRef(null);
//     const dialogRef = useRef(null);
//     const [shiftData, setShiftData] = useState({
//         shiftName: '',
//         startTime: '',
//         endTime: '',
//         description: ''
//     });
//
//     useEffect(() => {
//         if (shift) {
//             setShiftData(shift);
//         } else {
//             setShiftData({
//                 shiftName: '',
//                 startTime: '',
//                 endTime: '',
//                 description: ''
//             });
//         }
//     }, [shift]);
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
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (shift) {
//                 await axios.put(`http://localhost:5000/api/shifts/${shift._id}`, shiftData);
//             } else {
//                 await axios.post('http://localhost:5000/api/shifts', shiftData);
//             }
//             refreshShifts();
//             handleClose();
//         } catch (error) {
//             console.error('Error submitting shift data:', error);
//         }
//     };
//
//     return (
//         <div className="dialog-overlay" onClick={handleClose} ref={overlayRef} style={{ opacity: 0 }}>
//             <div className="dialog" ref={dialogRef} style={{ transform: "scale(0)", opacity: 0 }} onClick={(e) => e.stopPropagation()}>
//                 <div className="add-employee">
//                     <h2>{shift ? 'Edit Shift' : 'Add Shift'}</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-container">
//                             <div className="form-left">
//                                 <div className="form-group">
//                                     <label>Shift Name<span className='warning-text'>*</span></label>
//                                     <input 
//                                         type="text" 
//                                         value={shiftData.shiftName}
//                                         onChange={(e) => setShiftData({ ...shiftData, shiftName: e.target.value })}
//                                         required 
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Start Time<span className='warning-text'>*</span></label>
//                                     <input 
//                                         type="time" 
//                                         value={shiftData.startTime}
//                                         onChange={(e) => setShiftData({ ...shiftData, startTime: e.target.value })}
//                                         required 
//                                     />
//                                 </div>
//                             </div>
//                             <div className="form-right">
//                                 <div className="form-group">
//                                     <label>End Time<span className='warning-text'>*</span></label>
//                                     <input 
//                                         type="time" 
//                                         value={shiftData.endTime}
//                                         onChange={(e) => setShiftData({ ...shiftData, endTime: e.target.value })}
//                                         required 
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Description</label>
//                                     <input 
//                                         type="text" 
//                                         value={shiftData.description}
//                                         onChange={(e) => setShiftData({ ...shiftData, description: e.target.value })}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="button-group">
//                             <button type="button" onClick={handleClose} className='warning-btn'>Cancel</button>
//                             <button type="submit" className='btn'>Save</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };
import './FormShift.scss';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
import { toast } from 'sonner'; // Import Sonner toast

const FormShift = ({ isOpen, onClose, shift, refreshShifts }) => {
    const overlayRef = useRef(null);
    const dialogRef = useRef(null);
    const [shiftData, setShiftData] = useState({
        shiftName: '',
        startTime: '',
        endTime: '',
        description: ''
    });

    useEffect(() => {
        if (shift) {
            setShiftData(shift);
        } else {
            setShiftData({
                shiftName: '',
                startTime: '',
                endTime: '',
                description: ''
            });
        }
    }, [shift]);

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

    const validateTime = (time) => {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Regex for HH:MM format
        return timeRegex.test(time);
    };

    const handleTimeChange = (e, field) => {
        const input = e.target.value.replace(/[^0-9]/g, ''); // Hanya ambil angka
        let formattedTime = input;

        if (input.length >= 2) {
            formattedTime = input.slice(0, 2); // Ambil dua karakter pertama
            if (input.length > 2) {
                formattedTime += ':' + input.slice(2, 4); // Tambahkan : dan ambil dua karakter berikutnya
            }
        }

        setShiftData({ ...shiftData, [field]: formattedTime });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateTime(shiftData.startTime) || !validateTime(shiftData.endTime)) {
            toast.error('Please enter time in HH:MM format.'); // Show error toast
            return;
        }
        try {
            if (shift) {
                await axios.put(`http://localhost:5000/api/shifts/${shift._id}`, shiftData);
                toast.success('Shift updated successfully!'); // Show success toast
            } else {
                await axios.post('http://localhost:5000/api/shifts', shiftData);
                toast.success('Shift added successfully!'); // Show success toast
            }
            refreshShifts();
            handleClose();
        } catch (error) {
            console.error('Error submitting shift data:', error);
            toast.error('Error submitting shift data. Please try again.'); // Show error toast
        }
    };

    return (
        <div className="dialog-overlay" onClick={handleClose} ref={overlayRef} style={{ opacity: 0 }}>
            <div className="dialog" ref={dialogRef} style={{ transform: "scale(0)", opacity: 0 }} onClick={(e) => e.stopPropagation()}>
                <div className="add-employee">
                    <h2>{shift ? 'Edit Shift' : 'Add Shift'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-container">
                            <div className="form-left">
                                <div className="form-group">
                                    <label>Shift Name<span className='warning-text'>*</span></label>
                                    <input 
                                        type="text" 
                                        value={shiftData.shiftName}
                                        onChange={(e) => setShiftData({ ...shiftData, shiftName: e.target.value })}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Start Time<span className='warning-text'>*</span></label>
                                    <input 
                                        type="text" 
                                        placeholder="HH:MM"
                                        value={shiftData.startTime}
                                        onChange={(e) => handleTimeChange(e, 'startTime')}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-right">
                                <div className="form-group">
                                    <label>Description</label>
                                    <input 
                                        type="text" 
                                        value={shiftData.description}
                                        onChange={(e) => setShiftData({ ...shiftData, description: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>End Time<span className='warning-text'>*</span></label>
                                    <input 
                                        type="text" 
                                        placeholder="HH:MM"
                                        value={shiftData.endTime}
                                        onChange={(e) => handleTimeChange(e, 'endTime')}
                                        required 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="button-group">
                            <button type="button" onClick={handleClose} className='warning-btn'>Cancel</button>
                            <button type="submit" className='btn'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormShift;

