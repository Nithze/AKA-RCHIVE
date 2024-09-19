import './FormAddEmployee.css';
import React, { useEffect, useState } from 'react';

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
            }, 200);
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

