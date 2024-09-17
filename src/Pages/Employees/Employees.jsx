import React from 'react'
import Sidebar from '../../Components/Sidebar.jsx';
import './Employees.css';


const shiftData = [
    { name: 'Azhar', phone: '08123456789', dateAdded: 'Presence', presenceTime: '09:00 - 17:00', role: 'Barista', shift: 'Morning Shift', shiftTime: '07:00 AM - 03:00 PM' },
];


export const Employees = () => {
    return (
        <div className="container">
            <Sidebar className="sidebar" />
            {/* Content */}
            <div className="content">
                {/* -------------------------------- */}
                {/* Header */}
                {/* -------------------------------- */}
                <header className="header">
                    <h1>Manage your employees</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet.</p>
                </header>
                {/* -------------------------------- */}
                {/*End Header */}
                {/* -------------------------------- */}


                {/* -------------------------------- */}
                {/* Main Table & card maybe */}
                {/* -------------------------------- */}

                <div className="main-container">
                    <div className="main">
                        <div className="list-employees">
                            <div className="table-container">
                                <table>
                                    <colgroup>
                                        <col style={{ width: '15%' }} />
                                        <col style={{ width: '20%' }} />
                                        <col style={{ width: '5%' }} />
                                        <col style={{ width: '30%' }} />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th className="name">Name</th>
                                            <th className="date-add">Date added</th>
                                            <th className="role">Role</th>
                                            <th className="shift">Shift</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shiftData.map((item, index) => (
                                            <tr key={index}>
                                                <td className="name">
                                                    <div>{item.name}</div>
                                                    <div className="phone-number">{item.phone}</div>
                                                </td>
                                                <td className={`date-add ${item.dateAdded.replace(' ', '-').toLowerCase()}`}>
                                                    <div>{item.presence}</div>
                                                    <div className="presence-time">{item.presenceTime}</div>
                                                </td>
                                                <td className="role"><span className="role-chip">{item.role}</span></td>
                                                <td className="shift">
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

                </div>

                {/* -------------------------------- */}
                {/* Main Table & card maybe */}
                {/* -------------------------------- */}

            </div>
            {/* Content */}
        </div>

    )
}
export default Employees

