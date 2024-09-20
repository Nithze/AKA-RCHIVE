import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import './Alert.scss';

// Menggunakan forwardRef untuk menangani ref di functional component
const Alert = forwardRef(({ message, type }, ref) => {
    const [isOpen, setAlertOpen] = useState(false); // State di dalam komponen
    const alertRef = useRef(null); // Referensi untuk elemen alert

    // Fungsi untuk membuka alert
    const showAlert = () => {
        setAlertOpen(true);
        setTimeout(() => {
            setAlertOpen(false); // Tutup alert otomatis setelah beberapa detik
        }, 3000); // 3 detik
    };

    useImperativeHandle(ref, () => ({
        showAlert, // Ekspor fungsi showAlert ke luar komponen
    }));

    useEffect(() => {
        if (isOpen) {
            // Animasi masuk saat alert muncul
            gsap.to(alertRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        } else {
            // Animasi keluar saat alert ditutup
            gsap.to(alertRef.current, { opacity: 0, y: -50, duration: 0.5, ease: 'power2.in' });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div ref={alertRef} className={`alert alert-${type}`} style={{ opacity: 0, transform: 'translateY(-50px)' }}>
            <span>{message}</span>
            <button onClick={() => setAlertOpen(false)} className="close-btn">&times;</button>
        </div>
    );
});

export const useAlert = () => {
    const alertInstance = useRef(null);

    return {
        showAlert: (message, type) => {
            if (alertInstance.current) {
                alertInstance.current.message = message;
                alertInstance.current.type = type;
                alertInstance.current.showAlert();
            }
        },
        AlertComponent: () => <Alert ref={alertInstance} />
    };
};

export default Alert;

