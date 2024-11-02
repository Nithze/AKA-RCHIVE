// import './FormPayroll.scss';
// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import { toast } from 'sonner';
//
// const FormPayroll = ({ isOpen, onClose }) => {
//     const overlayRef = useRef(null);
//     const dialogRef = useRef(null);
//     const [deductions, setDeductions] = useState([{ title: 'deductionPerAlpha', amount: '' }]);
//     const [bonuses, setBonuses] = useState([{ title: '', amount: '' }]);
//     const deductionsRef = useRef(null);
//     const bonusesRef = useRef(null);
//     const [employees, setEmployees] = useState([]);
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
//         const fetchEmployees = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/employees');
//                 const data = await response.json();
//                 setEmployees(data);
//             } catch (error) {
//                 console.error("Error fetching employees:", error);
//                 toast.error("Failed to fetch employees!");
//             }
//         };
//
//         fetchEmployees();
//     }, []);
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
//     const addDeduction = () => {
//         if (deductions.length < 4) {
//             const newDeductions = [...deductions, { title: '', amount: '' }];
//             setDeductions(newDeductions);
//
//             gsap.fromTo(deductionsRef.current.lastChild, { height: 0, opacity: 0 }, {
//                 height: 'auto',
//                 opacity: 1,
//                 duration: 0.3,
//                 ease: "power2.out"
//             });
//         } else {
//             toast.error("You have reached the limit of 4 deductions!");
//         }
//     };
//
//     const removeDeduction = () => {
//         if (deductions.length > 1) {
//             const lastItem = deductionsRef.current.lastChild;
//
//             gsap.to(lastItem, {
//                 height: 0,
//                 opacity: 0,
//                 duration: 0.3,
//                 ease: "power2.in",
//                 onComplete: () => {
//                     setDeductions(deductions.slice(0, -1));
//                 }
//             });
//         }
//     };
//
//     const addBonus = () => {
//         if (bonuses.length < 4) {
//             const newBonuses = [...bonuses, { title: '', amount: '' }];
//             setBonuses(newBonuses);
//
//             gsap.fromTo(bonusesRef.current.lastChild, { height: 0, opacity: 0 }, {
//                 height: 'auto',
//                 opacity: 1,
//                 duration: 0.3,
//                 ease: "power2.out"
//             });
//         } else {
//             toast.error("You have reached the limit of 4 bonuses!");
//         }
//     };
//
//     const removeBonus = () => {
//         if (bonuses.length > 1) {
//             const lastItem = bonusesRef.current.lastChild;
//
//             gsap.to(lastItem, {
//                 height: 0,
//                 opacity: 0,
//                 duration: 0.3,
//                 ease: "power2.in",
//                 onComplete: () => {
//                     setBonuses(bonuses.slice(0, -1));
//                 }
//             });
//         }
//     };
//
//     return (
//         <div className="dialog-overlay" onClick={handleClose} ref={overlayRef} style={{ opacity: 0 }}>
//             <div className="dialog" ref={dialogRef} style={{ transform: "scale(0)", opacity: 0 }} onClick={(e) => e.stopPropagation()}>
//                 <div className="add-employee">
//                     <h2>Add Payroll</h2>
//                     <p>Input yang bertanda <span className='warning-text'>*</span> wajib di isi</p>
//
//                     <div className="form-container">
//                         <div className="form-left">
//                             <div className="form-group">
//                                 <label>Select Employee<span className='warning-text'>*</span></label>
//                                 <select name="employee" required>
//                                     <option value="">Select Employee</option>
//                                     {employees.map(employee => (
//                                         <option key={employee._id} value={employee._id}>
//                                             {employee.fullName}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//
//                             <div className="form-group">
//                                 <label>Potongan<span className='warning-text'>*</span></label>
//                                 <div className="multi-input" ref={deductionsRef}>
//                                     {deductions.map((deduction, index) => (
//                                         <div className="deduction-item" key={index}>
//                                             <input
//                                                 className='inputz'
//                                                 type="text"
//                                                 placeholder='Deduction Title'
//                                                 value={deduction.title}
//                                                 readOnly={index === 0} // Make the first deduction title read-only
//                                             />
//                                             <input
//                                                 className='inputx'
//                                                 type="text"
//                                                 placeholder='300000'
//                                                 value={deduction.amount}
//                                                 onChange={(e) => {
//                                                     const value = e.target.value;
//                                                     if (/^\d*$/.test(value)) {
//                                                         const newDeductions = [...deductions];
//                                                         newDeductions[index].amount = value;
//                                                         setDeductions(newDeductions);
//                                                     }
//                                                 }}
//                                             />
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="input-action">
//                                     <button className='btn-input-w' onClick={removeDeduction}>-</button>
//                                     <button className='btn-input' onClick={addDeduction}>+</button>
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div className="form-right">
//                             <div className="form-group">
//                                 <label>Tahun Bulan<span className='warning-text'>*</span></label>
//                                 <input
//                                     type="text"
//                                     placeholder="YYYY-M"
//                                     pattern="\d{4}-[1-9]{1,2}"
//                                     onInput={(e) => {
//                                         let value = e.target.value.replace(/[^0-9]/g, '');
//                                         if (value.length >= 6) {
//                                             value = value.slice(0, 4) + '-' + value.slice(4, 6);
//                                         } else if (value.length >= 4) {
//                                             value = value.slice(0, 4) + '-' + value.slice(4);
//                                         }
//                                         e.target.value = value;
//                                     }}
//                                     required
//                                 />
//                             </div>
//
//                             <div className="form-group">
//                                 <label>Bonus<span className='warning-text'>*</span></label>
//                                 <div className="multi-input" ref={bonusesRef}>
//                                     {bonuses.map((bonus, index) => (
//                                         <div className="bonus-item" key={index}>
//                                             <input className='inputz'
//                                                 type="text"
//                                                 placeholder='Bonus Title'
//                                                 value={bonus.title}
//                                                 onChange={(e) => {
//                                                     const newBonuses = [...bonuses];
//                                                     newBonuses[index].title = e.target.value;
//                                                     setBonuses(newBonuses);
//                                                 }}
//                                             />
//                                             <input className='inputx'
//                                                 type="text"
//                                                 placeholder='300000'
//                                                 value={bonus.amount}
//                                                 onChange={(e) => {
//                                                     const value = e.target.value;
//                                                     if (/^\d*$/.test(value)) {
//                                                         const newBonuses = [...bonuses];
//                                                         newBonuses[index].amount = value;
//                                                         setBonuses(newBonuses);
//                                                     }
//                                                 }}
//                                             />
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="input-action">
//                                     <button className='btn-input-w' onClick={removeBonus}>-</button>
//                                     <button className='btn-input' onClick={addBonus}>+</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
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
// export default FormPayroll;
//
import './FormPayroll.scss';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { toast } from 'sonner';

const FormPayroll = ({ isOpen, onClose }) => {
    const overlayRef = useRef(null);
    const dialogRef = useRef(null);
    const [deductions, setDeductions] = useState([{ title: 'deductionPerAlpha', amount: '' }]);
    const [bonuses, setBonuses] = useState([{ title: '', amount: '' }]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [yearMonth, setYearMonth] = useState('');

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
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/employees');
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
                toast.error("Failed to fetch employees!");
            }
        };

        fetchEmployees();
    }, []);

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

    const handleSave = async () => {
        const [year, month] = yearMonth.split('-');
        const formattedDeductions = deductions.map(d => ({ description: d.title, amount: parseInt(d.amount) || 0 }));
        const formattedBonuses = bonuses.map(b => ({ name: b.title, amount: parseInt(b.amount) || 0 }));

        const payload = {
            year: parseInt(year),
            month: parseInt(month),
            employeeId: selectedEmployee,
            deductions: formattedDeductions,
            bonuses: formattedBonuses,
            deductionPerAlpha: parseInt(deductions[0].amount) || 0,
        };

        try {
            const response = await fetch('http://localhost:5000/api/payroll/payroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success("Payroll entry saved successfully!");
                onClose();
            } else {
                toast.error("Failed to save payroll entry!");
            }
        } catch (error) {
            console.error("Error saving payroll entry:", error);
            toast.error("Failed to save payroll entry!");
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
                                <label>Select Employee<span className='warning-text'>*</span></label>
                                <select name="employee" required value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
                                    <option value="">Select Employee</option>
                                    {employees.map(employee => (
                                        <option key={employee._id} value={employee._id}>
                                            {employee.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Potongan<span className='warning-text'>*</span></label>
                                <div className="multi-input">
                                    {deductions.map((deduction, index) => (
                                        <div className="deduction-item" key={index}>
                                            <input
                                                className='inputz'
                                                type="text"
                                                placeholder='Deduction Title'
                                                value={deduction.title}
                                                readOnly={index === 0} 
                                            />
                                            <input
                                                className='inputx'
                                                type="text"
                                                placeholder='300000'
                                                value={deduction.amount}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (/^\d*$/.test(value)) {
                                                        const newDeductions = [...deductions];
                                                        newDeductions[index].amount = value;
                                                        setDeductions(newDeductions);
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
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
                                    value={yearMonth}
                                    onChange={(e) => setYearMonth(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Bonus<span className='warning-text'>*</span></label>
                                <div className="multi-input">
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
                                                    const value = e.target.value;
                                                    if (/^\d*$/.test(value)) {
                                                        const newBonuses = [...bonuses];
                                                        newBonuses[index].amount = value;
                                                        setBonuses(newBonuses);
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-group">
                        <button onClick={handleClose} className='warning-btn'>Batal</button>
                        <button onClick={handleSave} className='btn'>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormPayroll;

