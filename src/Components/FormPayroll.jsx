import './FormPayroll.scss';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const FormEmployee = ({ isOpen, onClose }) => {
    const overlayRef = useRef(null);
    const dialogRef = useRef(null);
    const [deductions, setDeductions] = useState([{ title: '', amount: '' }]);
    const [bonuses, setBonuses] = useState([{ title: '', amount: '' }]);
    const deductionsRef = useRef(null); 
    const bonusesRef = useRef(null); // ref kontol

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

    const addDeduction = () => {
        const newDeductions = [...deductions, { title: '', amount: '' }];
        setDeductions(newDeductions);

        // Animasi untuk menambah item
        gsap.fromTo(deductionsRef.current.lastChild, { height: 0, opacity: 0 }, {
            height: 'auto',
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const removeDeduction = () => {
        if (deductions.length > 1) {
            const lastItem = deductionsRef.current.lastChild;

            gsap.to(lastItem, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    setDeductions(deductions.slice(0, -1));
                }
            });
        }
    };

    const addBonus = () => {
        const newBonuses = [...bonuses, { title: '', amount: '' }];
        setBonuses(newBonuses);

        // Animasi untuk menambah item
        gsap.fromTo(bonusesRef.current.lastChild, { height: 0, opacity: 0 }, {
            height: 'auto',
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const removeBonus = () => {
        if (bonuses.length > 1) {
            const lastItem = bonusesRef.current.lastChild;

            gsap.to(lastItem, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    setBonuses(bonuses.slice(0, -1));
                }
            });
        }
    };

    return (
        <div className="dialog-overlay" onClick={handleClose} ref={overlayRef} style={{ opacity: 0 }}>
            <div className="dialog" ref={dialogRef} style={{ transform: "scale(0)", opacity: 0 }} onClick={(e) => e.stopPropagation()}>
                <div className="add-employee">
                    <h2>Add Payroll</h2>
                    <p>Input yang bertanda <span className='warning-text'>*</span> wajib di isi</p>

                    <div className="form-container">
                        <div className="form-left">
                            <div className="form-group">
                                <label>Nama Lengkap<span className='warning-text'>*</span></label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Potongan<span className='warning-text'>*</span></label>
                                <div className="multi-input" ref={deductionsRef}>
                                    {deductions.map((deduction, index) => (
                                        <div className="deduction-item" key={index}>
                                            <input className='inputz' 
                                                type="text" 
                                                placeholder='Bonus Title' 
                                                value={deduction.title}
                                                onChange={(e) => {
                                                    const newDeductions = [...deductions];
                                                    newDeductions[index].title = e.target.value;
                                                    setDeductions(newDeductions);
                                                }} 
                                            />
                                            <input className='inputx' 
                                                type="text" 
                                                placeholder='300000' 
                                                value={deduction.amount}
                                                onChange={(e) => {
                                                    const newDeductions = [...deductions];
                                                    newDeductions[index].amount = e.target.value;
                                                    setDeductions(newDeductions);
                                                }} 
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="input-action">
                                    <button className='btn-input-w' onClick={removeDeduction}>-</button>
                                    <button className='btn-input' onClick={addDeduction}>+</button>
                                </div>
                            </div>
                        </div>

                        <div className="form-right">
                            <div className="form-group">
                                <label>Tahun Bulan<span className='warning-text'>*</span></label>
                                <input
                                    type="text"
                                    placeholder="YYYY-M"
                                    pattern="\d{4}-[1-9]{1,2}"
                                    onInput={(e) => {
                                        let value = e.target.value.replace(/[^0-9]/g, '');
                                        if (value.length >= 6) {
                                            value = value.slice(0, 4) + '-' + value.slice(4, 6);
                                        } else if (value.length >= 4) {
                                            value = value.slice(0, 4) + '-' + value.slice(4);
                                        }
                                        e.target.value = value;
                                    }}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Bonus<span className='warning-text'>*</span></label>
                                <div className="multi-input" ref={bonusesRef}>
                                    {bonuses.map((bonus, index) => (
                                        <div className="bonus-item" key={index}>
                                            <input className='inputz' 
                                                type="text" 
                                                placeholder='Bonus Title' 
                                                value={bonus.title}
                                                onChange={(e) => {
                                                    const newBonuses = [...bonuses];
                                                    newBonuses[index].title = e.target.value;
                                                    setBonuses(newBonuses);
                                                }} 
                                            />
                                            <input className='inputx' 
                                                type="text" 
                                                placeholder='300000' 
                                                value={bonus.amount}
                                                onChange={(e) => {
                                                    const newBonuses = [...bonuses];
                                                    newBonuses[index].amount = e.target.value;
                                                    setBonuses(newBonuses);
                                                }} 
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="input-action">
                                    <button className='btn-input-w' onClick={removeBonus}>-</button>
                                    <button className='btn-input' onClick={addBonus}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
                    <div className="button-group">
                        <button onClick={handleClose} className='warning-btn'>Batal</button>
                        <button className='btn'>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEmployee;

