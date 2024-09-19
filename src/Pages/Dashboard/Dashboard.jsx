import React from 'react';
import './Dashboard.css';
import Sidebar from '../../Components/Sidebar.jsx';


const shiftData = [
    { name: 'Azhar', phone: '08123456789', presence: 'Presence', presenceTime: '09:00 - 17:00', role: 'Barista', shift: 'Morning Shift', shiftTime: '07:00 AM - 03:00 PM' },
    { name: 'Azhar', phone: '08123456789', presence: 'Presence', presenceTime: '09:00 - 17:00', role: 'Barista', shift: 'Morning Shift', shiftTime: '07:00 AM - 03:00 PM' },
    { name: 'Azhar', phone: '08123456789', presence: 'Presence', presenceTime: '09:00 - 17:00', role: 'Barista', shift: 'Morning Shift', shiftTime: '07:00 AM - 03:00 PM' },
    { name: 'Azhar', phone: '08123456789', presence: 'Presence', presenceTime: '09:00 - 17:00', role: 'Barista', shift: 'Morning Shift', shiftTime: '07:00 AM - 03:00 PM' },
    { name: 'Azhar', phone: '08123456789', presence: 'Presence', presenceTime: '09:00 - 17:00', role: 'Barista', shift: 'Morning Shift', shiftTime: '07:00 AM - 03:00 PM' },
    { name: 'Ilham', phone: '08987654321', presence: 'No Presence', presenceTime: '', role: 'Waiter', shift: 'Afternoon Shift', shiftTime: '03:00 PM - 11:00 PM' },
    { name: 'Ceyo', phone: '08765432109', presence: 'Presence', presenceTime: '12:00 - 20:00', role: 'Cook', shift: 'Evening Shift', shiftTime: '05:00 PM - 01:00 AM' },
    { name: 'Edgar', phone: '08234567890', presence: 'No Presence', presenceTime: '', role: 'Cleaner', shift: 'Night Shift', shiftTime: '09:00 PM - 05:00 AM' },
    { name: 'Ilham', phone: '08987654321', presence: 'No Presence', presenceTime: '', role: 'Waiter', shift: 'Afternoon Shift', shiftTime: '03:00 PM - 11:00 PM' },
    { name: 'Ceyo', phone: '08765432109', presence: 'Presence', presenceTime: '12:00 - 20:00', role: 'Cook', shift: 'Evening Shift', shiftTime: '05:00 PM - 01:00 AM' },
    { name: 'Edgar', phone: '08234567890', presence: 'No Presence', presenceTime: '', role: 'Cleaner', shift: 'Night Shift', shiftTime: '09:00 PM - 05:00 AM' },
    { name: 'Ilham', phone: '08987654321', presence: 'No Presence', presenceTime: '', role: 'Waiter', shift: 'Afternoon Shift', shiftTime: '03:00 PM - 11:00 PM' },
    { name: 'Ceyo', phone: '08765432109', presence: 'Presence', presenceTime: '12:00 - 20:00', role: 'Cook', shift: 'Evening Shift', shiftTime: '05:00 PM - 01:00 AM' },
    { name: 'Edgar', phone: '08234567890', presence: 'No Presence', presenceTime: '', role: 'Cleaner', shift: 'Night Shift', shiftTime: '09:00 PM - 05:00 AM' },
    { name: 'Ilham', phone: '08987654321', presence: 'No Presence', presenceTime: '', role: 'Waiter', shift: 'Afternoon Shift', shiftTime: '03:00 PM - 11:00 PM' },
    { name: 'Ceyo', phone: '08765432109', presence: 'Presence', presenceTime: '12:00 - 20:00', role: 'Cook', shift: 'Evening Shift', shiftTime: '05:00 PM - 01:00 AM' },
    { name: 'Edgar', phone: '08234567890', presence: 'No Presence', presenceTime: '', role: 'Cleaner', shift: 'Night Shift', shiftTime: '09:00 PM - 05:00 AM' },
    { name: 'Ilham', phone: '08987654321', presence: 'No Presence', presenceTime: '', role: 'Waiter', shift: 'Afternoon Shift', shiftTime: '03:00 PM - 11:00 PM' },
    { name: 'Ceyo', phone: '08765432109', presence: 'Presence', presenceTime: '12:00 - 20:00', role: 'Cook', shift: 'Evening Shift', shiftTime: '05:00 PM - 01:00 AM' },
    { name: 'Edgar', phone: '08234567890', presence: 'No Presence', presenceTime: '', role: 'Cleaner', shift: 'Night Shift', shiftTime: '09:00 PM - 05:00 AM' },
];

export const Dashboard = () => {
    return (
        <div className="container">
            <Sidebar className="sidebar" />
            {/* Content */}
            <div className="content">
                {/* -------------------------------- */}
                {/* Header */}
                {/* -------------------------------- */}
                <header className="header">
                    <div className="header-left">
                        <h1>Dashboard</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                        <div className="switches-container">
                            <input
                                type="radio"
                                id="switchNormal"
                                name="switchPlan"
                                value="Monthly"
                                defaultChecked
                            />
                            <input
                                type="radio"
                                id="switchHighlight"
                                name="switchPlan"
                                value="Yearly"
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
                {/* -------------------------------- */}
                {/*End Header */}
                {/* -------------------------------- */}

                {/* -------------------------------- */}
                {/*Card */}
                {/* -------------------------------- */}
                <div className="card-container">
                    <div className="card-left">
                        <div className="card-title">
                            <div>Total Salary</div>
                            <div>Total Employees</div>
                        </div>
                        <div className="card-value">
                            <div>15.000.000</div>
                            <div>17</div>
                        </div>
                        <div className="card-description">
                            <div>Total salary distribution for this month</div>
                            <div>+1 employee of the month</div>
                        </div>

                    </div>
                    <div className="card-right">
                        <div className="card-title">
                            <div>Inventory</div>
                        </div>
                        <div className="card-value">
                            <div>170</div>
                        </div>
                        <div className="card-description">
                            <div>total inventory of 20 items</div>
                        </div>
                    </div>
                </div>
                {/* -------------------------------- */}
                {/* End Card */}
                {/* -------------------------------- */}


                {/* -------------------------------- */}
                {/* Main Table & card maybe */}
                {/* -------------------------------- */}

                <div className="main-container">
                    <div className="main-left">
                        <div className="title-csv">
                            <div>shift now</div>
                            <button className='btn-CSV'>Download CSV</button>
                        </div>
                        <div className="list-shift">
                            <div className="table-container">
                                <table>
                                    <colgroup>
                                        <col style={{ width: '25%' }} />
                                        <col style={{ width: '20%' }} />
                                        <col style={{ width: '5%' }} />
                                        <col style={{ width: '30%' }} />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th className="name-col">Name</th>
                                            <th className="presence-col">Presence</th>
                                            <th className="role-col">Role</th>
                                            <th className="shift-col">Shift</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shiftData.map((item, index) => (
                                            <tr key={index}>
                                                <td className="name-col">
                                                    <div>{item.name}</div>
                                                    <div className="phone-number">{item.phone}</div>
                                                </td>
                                                <td className={`presence-col ${item.presence.replace(' ', '-').toLowerCase()}`}>
                                                    <div>{item.presence}</div>
                                                    <div className="presence-time">{item.presenceTime}</div>
                                                </td>
                                                <td className="role-col"><span className="role-chip">{item.role}</span></td>
                                                <td className="shift-col">
                                                    <div>{item.shift}</div>
                                                    <div className="shift-time">{item.shiftTime}</div>
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

                {/* -------------------------------- */}
                {/* Main Table & card maybe */}
                {/* -------------------------------- */}

            </div>
            {/* Content */}
        </div>
    );
}

export default Dashboard;

