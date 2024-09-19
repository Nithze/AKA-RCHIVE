// import React, { useEffect, useState } from 'react';
// import './FormAddEmployee.css';
//
// const FormAddEmployee = ({ isOpen, onClose }) => {
//     const [isAnimating, setAnimating] = useState(false);
//     const [isExiting, setExiting] = useState(false);
//
//     useEffect(() => {
//         if (isOpen) {
//             setAnimating(true);
//             setExiting(false); // Reset saat dialog dibuka
//         } else if (!isOpen && isAnimating) {
//             setExiting(true); // Aktifkan animasi keluar
//             const timer = setTimeout(() => {
//                 setAnimating(false); // Sembunyikan dialog setelah animasi keluar
//                 onClose(); // Panggil fungsi onClose setelah animasi selesai
//             }, 300); // Waktu yang sama dengan durasi transisi
//
//             return () => clearTimeout(timer); // Bersihkan timer saat komponen unmount
//         }
//     }, [isOpen, isAnimating, onClose]);
//
//     if (!isOpen && !isAnimating) return null; // Tidak menampilkan dialog jika tidak terbuka dan tidak dalam animasi
//
//     return (
//         <div className="dialog-overlay">
//             <div className={`dialog ${isExiting ? 'dialog-exit' : isAnimating ? 'dialog-enter' : ''}`}>
//                 <h2>Add Employee</h2>
//                 <button onClick={onClose}>Close</button>
//                 {/* Tambahkan form input di sini */}
//             </div>
//         </div>
//     );
// };
//
// export default FormAddEmployee;
//
import React, { useEffect, useState } from 'react';
import './FormAddEmployee.css';

const FormAddEmployee = ({ isOpen, onClose }) => {
    const [isAnimating, setAnimating] = useState(false);
    const [isExiting, setExiting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAnimating(true);
            setExiting(false);
        } else if (!isOpen && isAnimating) {
            setExiting(true);
            const timer = setTimeout(() => {
                setAnimating(false);
                setExiting(false); // Reset exiting state
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [isOpen, isAnimating]);

    const handleClose = () => {
        if (isAnimating && !isExiting) {
            setExiting(true);
            setTimeout(() => {
                setAnimating(false);
                onClose();
            }, 300);
        } else {
            onClose();
        }
    };

    if (!isOpen && !isAnimating) return null;

    return (
        <div className="dialog-overlay">
            <div className={`dialog ${isExiting ? 'dialog-exit' : isAnimating ? 'dialog-enter' : ''}`}>
                <h2>Add Employee</h2>
                <button onClick={handleClose}>Close</button>
                {/* Tambahkan form input di sini */}
            </div>
        </div>
    );
};

export default FormAddEmployee;

