import './Dashboard.scss';
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Sidebar from '../../Components/Sidebar.jsx';
import axios from 'axios';

export const Dashboard = () => {
    const cardLeftRef = useRef(null);
    const cardRightRef = useRef(null);
    const [shiftData, setShiftData] = useState([]); // State untuk menyimpan data shift
    const [cesData, setCesData] = useState({}); // State untuk menyimpan data CES
    const [inventoryData, setInventoryData] = useState({}); // State untuk menyimpan data inventory
    const [isHighlight, setIsHighlight] = useState(false); // State untuk menentukan mode

    useEffect(() => {
        // Animasi
        gsap.to(cardLeftRef.current, {
            x: '0%',  
            duration: 0.8,  
            opacity: 1,   
            ease: "cubic-bezier(0.4, 0, 0.2, 1)"  
        });

        gsap.to(cardRightRef.current, {
            x: '0%',  
            duration: 0.8,  
            opacity: 1,   
            ease: "cubic-bezier(0.4, 0, 0.2, 1)"  
        });

        // Panggilan API untuk data shift
        const fetchShiftData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/attendance/current-shift');
                setShiftData(response.data); // Simpan data ke dalam state
            } catch (error) {
                console.error("Error fetching shift data:", error);
            }
        };

        // Panggilan API untuk data CES
        const fetchCesData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees/ces');
                setCesData(response.data); // Simpan data CES ke dalam state
            } catch (error) {
                console.error("Error fetching CES data:", error);
            }
        };
        // Panggilan API untuk data Inventory
		const fetchInventoryData = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/item"); // Adjust this URL to your API endpoint
				setInventoryData(response.data); // Simpan data inventory ke dalam state
				console.log(setInventoryData);
			} catch (error) {
				console.error("Error fetching inventory data:", error);
			}
		};

        fetchShiftData();
        fetchInventoryData();
        fetchCesData();
    }, []);

    // Fungsi untuk mendapatkan kelas CSS berdasarkan status kehadiran
    const getPresenceClass = (status) => {
        if (isHighlight) {
            switch (status.toLowerCase()) {
                case 'absent':
                    return 'absent-highlight'; // Orange
                case 'alpha':
                    return 'alpha-highlight'; // Merah
                case 'present':
                    return 'present-highlight'; // Hijau
                case 'awaiting':
                    return 'awaiting-highlight'; // Grey
                default:
                    return '';
            }
        } else {
            return ''; // Kembali ke warna normal
        }
    };

    // Handler untuk radio button
    const handleSwitchChange = (event) => {
        setIsHighlight(event.target.value === 'Highlight');
    };

    return (
        <>
            <div className="container">
                <Sidebar className="sidebar" />
                {/* Content */}
                <div className="content">
                    {/* Header */}
                    <header className="header">
                        <div className="header-left">
                            <h1>Dashboard</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                            <div className="switches-container">
                                <input
                                    type="radio"
                                    id="switchNormal"
                                    name="switchPlan"
                                    value="Normal"
                                    defaultChecked
                                    onChange={handleSwitchChange}
                                />
                                <input
                                    type="radio"
                                    id="switchHighlight"
                                    name="switchPlan"
                                    value="Highlight"
                                    onChange={handleSwitchChange}
                                />
                                <label htmlFor="switchNormal">Normal View</label>
                                <label htmlFor="switchHighlight">Highlight View</label>
                                <div className="switch-wrapper">
                                    <div className="switch">
                                        <div>Normal View</div>
                                        <div>Highlight View</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-right">
                        </div>
                    </header>

                    {/* Card */}
                    {/* card CES */}
                    <div className="card-container">
                        <div className="card-left" ref={cardLeftRef}>
                            <div className="card-title">
                                <div>Total salary distribution for this month</div>
                                <div>Total Employees</div>
                            </div>
                            <div className="card-value">
                                <div>{cesData.totalSalaryDistribution?.toLocaleString('id-ID') || '0'}</div>
                                <div>{cesData.totalEmployees || '0'}</div>
                            </div>
                            <div className="card-description">
                                <div>not include deductions or bonuses</div>
                                <div>+{cesData.employeeOfTheMonthCount || 0} employee of the month</div>
                            </div>
                        </div>
                    {/* end card CES */}

                        {/* <div className="card-right" ref={cardRightRef}> */}
                        {/*     <div className="card-title"> */}
                        {/*         <div>Inventory</div> */}
                        {/*     </div> */}
                        {/*     <div className="card-value"> */}
                        {/*         <div>170</div> */}
                        {/*     </div> */}
                        {/*     <div className="card-description"> */}
                        {/*         <div>total inventory of 20 items</div> */}
                        {/*     </div> */}
                        {/* </div> */}
                        
						<div className="card-right" ref={cardRightRef}>
							<div className="card-title">
								<div>Inventory</div>
							</div>
							<div className="card-value">
								<div>{inventoryData.totalStock || "0"}</div>{" "}
								{/* Render total stock */}
							</div>
							<div className="card-description">
								<div>
									total inventory of {inventoryData.totalItems || "0"} items
								</div>{" "}
								{/* Render total items */}
							</div>
						</div>
                    </div>

                    {/* Main Table */}
                    <div className="main-container">
                        <div className="main-left">
                            <div className="title-csv">
                                <div>Shift Now</div>
                                <button className='btn-CSV'>Download CSV</button>
                            </div>
                            <div className="list-shift">
                                <div className="table-container">
                                    <table>
                                        <colgroup>
                                            <col style={{ width: '35%' }} />
                                            <col style={{ width: '15%' }} />
                                            <col style={{ width: '15%' }} />
                                            <col style={{ width: '10%' }} />
                                            <col style={{ width: '10%' }} />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th className="name-col">Name</th>
                                                <th className="presence-col">Presence</th>
                                                <th className="late-col">Late Time</th>
                                                <th className="role-col">Role</th>
                                                <th className="shift-col">Shift</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {shiftData.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="name-col">
                                                        <div>{item.employeeName}</div>
                                                        <div className="phone-number">{item.phoneNumber}</div>
                                                    </td>
                                                    <td className={`presence-col ${getPresenceClass(item.attendance[0]?.status)}`}>
                                                        <div>{item.attendance[0]?.status || 'Unknown'}</div>
                                                        <div className="presence-time">{item.attendance[0]?.checkInTime || 'N/A'}</div>
                                                    </td>
                                                    <td className={`late-col ${getPresenceClass(item.attendance[0]?.status)}`}>
                                                        <div>{item.attendance[0]?.lateTime || '0 '}min</div>
                                                    </td>
                                                    <td className="role-col"><span className="role-chip">{item.roleName}</span></td>
                                                    <td className="shift-col">
                                                        <div>{item.shiftName}</div>
                                                        <div className="shift-time">{item.shiftStart} - {item.shiftEnd}</div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="main-right">
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Dashboard;

