// import "./Employees.scss";
// import { useEffect, useState } from "react";
// import Sidebar from "../../Components/Sidebar.jsx";
// import FormEmployee from "../../Components/FormEmployee";
// import axios from "axios";
// import { toast } from "sonner";
//
// export const Employees = () => {
// 	const [isDialogOpen, setDialogOpen] = useState(false);
// 	const [employees, setEmployees] = useState([]);
// 	const [selectedEmployee, setSelectedEmployee] = useState(null); // For editing employees
//
// 	// // Fetch employees when the component mounts
// 	// useEffect(() => {
// 	//     const fetchEmployees = async () => {
// 	//         try {
// 	//             const response = await axios.get('http://localhost:5000/api/employees');
// 	//             setEmployees(response.data);
// 	//         } catch (error) {
// 	//             console.error('Error fetching employees:', error);
// 	//         }
// 	//     };
// 	//
// 	//     fetchEmployees();
// 	// }, []);
// 	// Fetch employees saat komponen dimuat
// 	useEffect(() => {
// 		fetchEmployees();
// 	}, []);
//
// 	// Fungsi untuk mem-fetch ulang data karyawan
// 	const fetchEmployees = async () => {
// 		try {
// 			const response = await axios.get("http://localhost:5000/api/employees");
// 			setEmployees(response.data);
// 		} catch (error) {
// 			console.error("Error fetching employees:", error);
// 		}
// 	};
//
// 	const handleOpenDialog = (employee = null) => {
// 		setSelectedEmployee(employee); // Set the employee to be edited
// 		setDialogOpen(true);
// 	};
//
// 	const handleCloseDialog = () => {
// 		setSelectedEmployee(null); // Reset the selected employee
// 		setDialogOpen(false);
// 	};
//
// 	const handleAddEmployee = (newEmployee) => {
// 		setEmployees((prev) => [...prev, newEmployee]);
// 		handleCloseDialog();
// 	};
//
// 	const handleEditEmployee = (updatedEmployee) => {
// 		setEmployees((prev) =>
// 			prev.map((employee) =>
// 				employee._id === updatedEmployee._id ? updatedEmployee : employee
// 			)
// 		);
// 		handleCloseDialog();
// 	};
//
// 	const handleDeleteEmployee = async (employeeId) => {
// 		try {
// 			await axios.delete(`http://localhost:5000/api/employees/${employeeId}`);
// 			setEmployees((prev) =>
// 				prev.filter((employee) => employee._id !== employeeId)
// 			);
// 			toast.success("Karyawan berhasil dihapus!");
// 			fetchEmployees();
// 		} catch (error) {
// 			console.error("Error deleting employee:", error);
// 		}
// 	};
//
// 	return (
// 		<>
// 			<FormEmployee
// 				isOpen={isDialogOpen}
// 				onClose={handleCloseDialog}
// 				onAddEmployee={handleAddEmployee}
// 				onEditEmployee={handleEditEmployee}
// 				employee={selectedEmployee} // Pass selected employee for editing
// 				onSuccess={fetchEmployees}
// 			/>
// 			<div className="container">
// 				<Sidebar className="sidebar" />
// 				<div className="content">
// 					<header className="header">
// 						<div className="header-left">
// 							<h1>Manage your employees</h1>
// 							<p>Easily manage and organize employee information.</p>
// 						</div>
// 						<div className="header-right">
// 							<button className="btn" onClick={() => handleOpenDialog()}>
// 								<i className="bx bx-user-plus icon"></i>
// 								Add Employee
// 							</button>
// 						</div>
// 					</header>
//
// 					<div className="main-container">
// 						<div className="main">
// 							<div className="toolbar">
// 								<div className="left">
// 									<div className="search-bar">
// 										<input type="text" placeholder="Search Here ..." />
// 									</div>
// 									<div className="filter">
// 										<select>
// 											<option value="role">Role</option>
// 										</select>
// 										<select>
// 											<option value="shift">Shift</option>
// 										</select>
// 									</div>
// 								</div>
//
// 								<div className="right">
// 									<div className="alert">
// 										<i className="bx bx-error"></i>
// 										<a href="/employees">
// 											This is data for all employees, be careful in changing the
// 											data
// 										</a>
// 									</div>
// 								</div>
// 							</div>
//
// 							<div className="list-employees">
// 								<div className="table-container">
// 									<table>
// 										<colgroup>
// 											<col style={{ width: "15%" }} />
// 											<col style={{ width: "10%" }} />
// 											<col style={{ width: "15%" }} />
// 											<col style={{ width: "15%" }} />
// 											<col style={{ width: "15%" }} />
// 										</colgroup>
// 										<thead>
// 											<tr>
// 												<th className="name">Name</th>
// 												<th className="date-add">Date added</th>
// 												<th className="role">Role</th>
// 												<th className="shift">Shift</th>
// 												<th className="action">Action</th>
// 											</tr>
// 										</thead>
// 										<tbody>
// 											{employees.map((employee) => (
// 												<tr key={employee._id}>
// 													<td className="name">
// 														<div>{employee.fullName}</div>
// 														<div className="phone-number">
// 															{employee.phoneNumber}
// 														</div>
// 													</td>
// 													<td className="date-add">
// 														<div>
// 															{new Date(
// 																employee.startDate
// 															).toLocaleDateString()}
// 														</div>
// 													</td>
// 													<td className="role">
// 														<span className="role-chip">
// 															{employee.role.role}
// 														</span>
// 													</td>
// 													<td className="shift">
// 														<div>{employee.shift.shiftName}</div>
// 														<div className="shift-time">
// 															{employee.shift.startTime} -{" "}
// 															{employee.shift.endTime}
// 														</div>
// 													</td>
// 													<td className="action">
// 														<button
// 															className="btn"
// 															onClick={() => handleOpenDialog(employee)}
// 														>
// 															Edit
// 														</button>
// 														{/* <button */}
// 														{/*     className="warning-btn" */}
// 														{/*     onClick={() => handleDeleteEmployee(employee._id)} */}
// 														{/* > */}
// 														{/*     Delete */}
// 														{/* </button> */}
// 														<button
// 															className="warning-btn"
// 															onClick={() => {
// 																if (
// 																	window.confirm(
// 																		"Apakah Anda yakin ingin menghapus karyawan ini?"
// 																	)
// 																) {
// 																	handleDeleteEmployee(employee._id);
// 																}
// 															}}
// 														>
// 															Delete
// 														</button>
// 													</td>
// 												</tr>
// 											))}
// 										</tbody>
// 									</table>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };
//
// export default Employees;
import "./Employees.scss";
import { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar.jsx";
import FormEmployee from "../../Components/FormEmployee";
import axios from "axios";
import { toast } from "sonner";

export const Employees = () => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [employees, setEmployees] = useState([]);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
	const [filteredEmployees, setFilteredEmployees] = useState([]); // State untuk karyawan yang difilter
	const [selectedRole, setSelectedRole] = useState(""); // State untuk filter berdasarkan role
	const [selectedShift, setSelectedShift] = useState(""); // State untuk filter berdasarkan shift
	const [roles, setRoles] = useState([]); // State untuk menyimpan data role
	const [shifts, setShifts] = useState([]); // State untuk menyimpan data shift

	useEffect(() => {
		fetchEmployees();
		fetchRoles();
		fetchShifts();
	}, []);

	const fetchEmployees = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/employees");
			setEmployees(response.data);
			setFilteredEmployees(response.data); // Set filtered employees saat fetch
		} catch (error) {
			console.error("Error fetching employees:", error);
		}
	};

	const fetchRoles = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/roles");
			setRoles(response.data);
		} catch (error) {
			console.error("Error fetching roles:", error);
		}
	};

	const fetchShifts = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/shifts");
			setShifts(response.data);
		} catch (error) {
			console.error("Error fetching shifts:", error);
		}
	};

	useEffect(() => {
		const result = employees.filter(employee => {
			const matchesSearchTerm = employee.fullName.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesRole = selectedRole ? employee.role._id === selectedRole : true;
			const matchesShift = selectedShift ? employee.shift._id === selectedShift : true;
			return matchesSearchTerm && matchesRole && matchesShift;
		});
		setFilteredEmployees(result);
	}, [searchTerm, selectedRole, selectedShift, employees]);

	const handleOpenDialog = (employee = null) => {
		setSelectedEmployee(employee);
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setSelectedEmployee(null);
		setDialogOpen(false);
	};

	const handleAddEmployee = (newEmployee) => {
		setEmployees((prev) => [...prev, newEmployee]);
		handleCloseDialog();
	};

	const handleEditEmployee = (updatedEmployee) => {
		setEmployees((prev) =>
			prev.map((employee) =>
				employee._id === updatedEmployee._id ? updatedEmployee : employee
			)
		);
		handleCloseDialog();
	};

	const handleDeleteEmployee = async (employeeId) => {
		try {
			await axios.delete(`http://localhost:5000/api/employees/${employeeId}`);
			setEmployees((prev) =>
				prev.filter((employee) => employee._id !== employeeId)
			);
			toast.success("Karyawan berhasil dihapus!");
			fetchEmployees();
		} catch (error) {
			console.error("Error deleting employee:", error);
		}
	};

	return (
		<>
			<FormEmployee
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				onAddEmployee={handleAddEmployee}
				onEditEmployee={handleEditEmployee}
				employee={selectedEmployee}
				onSuccess={fetchEmployees}
			/>
			<div className="container">
				<Sidebar className="sidebar" />
				<div className="content">
					<header className="header">
						<div className="header-left">
							<h1>Manage your employees</h1>
							<p>Easily manage and organize employee information.</p>
						</div>
						<div className="header-right">
							<button className="btn" onClick={() => handleOpenDialog()}>
								<i className="bx bx-user-plus icon"></i>
								Add Employee
							</button>
						</div>
					</header>

					<div className="main-container">
						<div className="main">
							<div className="toolbar">
								<div className="left">
									<div className="search-bar">
										<input 
											type="text" 
											placeholder="Search Here ..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)} // Update state saat mengetik
										/>
									</div>
									<div className="filter">
										<select 
											value={selectedRole} 
											onChange={(e) => setSelectedRole(e.target.value)} // Update role filter
										>
											<option value="">All Roles</option>
											{roles.map(role => (
												<option key={role._id} value={role._id}>
													{role.role}
												</option>
											))}
										</select>
										<select 
											value={selectedShift} 
											onChange={(e) => setSelectedShift(e.target.value)} // Update shift filter
										>
											<option value="">All Shifts</option>
											{shifts.map(shift => (
												<option key={shift._id} value={shift._id}>
													{shift.shiftName}
												</option>
											))}
										</select>
									</div>
								</div>

								<div className="right">
									<div className="alert">
										<i className="bx bx-error"></i>
										<a href="/employees">
											This is data for all employees, be careful in changing the
											data
										</a>
									</div>
								</div>
							</div>

							<div className="list-employees">
								<div className="table-container">
									<table>
										<colgroup>
											<col style={{ width: "15%" }} />
											<col style={{ width: "10%" }} />
											<col style={{ width: "15%" }} />
											<col style={{ width: "15%" }} />
											<col style={{ width: "15%" }} />
										</colgroup>
										<thead>
											<tr>
												<th className="name">Name</th>
												<th className="date-add">Date added</th>
												<th className="role">Role</th>
												<th className="shift">Shift</th>
												<th className="action">Action</th>
											</tr>
										</thead>
										<tbody>
											{filteredEmployees.map((employee) => (
												<tr key={employee._id}>
													<td className="name">
														<div>{employee.fullName}</div>
														<div className="phone-number">
															{employee.phoneNumber}
														</div>
													</td>
													<td className="date-add">
														<div>
															{new Date(
																employee.startDate
															).toLocaleDateString()}
														</div>
													</td>
													<td className="role">
														<span className="role-chip">
															{employee.role.role}
														</span>
													</td>
													<td className="shift">
														<div>{employee.shift.shiftName}</div>
														<div className="shift-time">
															{employee.shift.startTime} -{" "}
															{employee.shift.endTime}
														</div>
													</td>
													<td className="action">
														<button
															className="btn"
															onClick={() => handleOpenDialog(employee)}
														>
															Edit
														</button>
														<button
															className="warning-btn"
															onClick={() => {
																if (
																	window.confirm(
																		"Apakah Anda yakin ingin menghapus karyawan ini?"
																	)
																) {
																	handleDeleteEmployee(employee._id);
																}
															}}
														>
															Delete
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Employees;

