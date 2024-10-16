import "./Inventory.scss";
import { useState } from "react";
// import React from 'react';
import Sidebar from "../../Components/Sidebar.jsx";
import FormEmployee from "../../Components/FormEmployee.jsx";

const shiftData = [
	{
		name: "Keju",
		stock: "100",
		supplier: "Blue Band",
		reorder: "3",
		reorder_msg: "Plentiful",
	},
	{
		name: "Ban Motor",
		stock: "5",
		supplier: "Danlop",
		reorder: "1",
		reorder_msg: "Re-order Immediately",
	},
	{
		name: "Choclat",
		stock: "50",
		supplier: "Abadi",
		reorder: "2",
		reorder_msg: "Caution",
	},
];

export const Inventory = () => {
	const [isDialogOpen, setDialogOpen] = useState(false);

	const handleOpenDialog = () => setDialogOpen(true);
	const handleCloseDialog = () => setDialogOpen(false);
	return (
		<>
			<FormEmployee isOpen={isDialogOpen} onClose={handleCloseDialog} />
			<div className="container">
				<Sidebar className="sidebar" />
				{/* Content */}
				<div className="content">
					{/* -------------------------------- */}
					{/* Header */}
					{/* -------------------------------- */}
					<header className="header">
						<div className="header-left">
							<h1>Manage Inventory</h1>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Eveniet.
							</p>
						</div>
						<div className="header-right">
							<button className="btn" onClick={() => handleEdit()}>
								<i className="bx bx-download icon"></i>
								Download CSV
							</button>
							<button className="btn" onClick={handleOpenDialog}>
								<i className="bx bx-user-plus icon"></i>
								Add Employee
							</button>
						</div>
					</header>
					{/* -------------------------------- */}
					{/*End Header */}
					{/* -------------------------------- */}

					{/* -------------------------------- */}
					{/* Main Table & card maybe */}
					{/* -------------------------------- */}

					<div className="main-container">
						<div className="main">
							<div className="toolbar">
								<div className="left">
									<div className="search-bar">
										<input type="text" placeholder="Search Here ..." />
									</div>
									<div className="filter">
										<select>
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
									</div>
								</div>

								<div className="right"></div>
							</div>
							<div className="list-employees">
								<div className="table-container">
									<table>
										<colgroup>
											<col style={{ width: "10%" }} />
											<col style={{ width: "10%" }} />
											<col style={{ width: "10%" }} />
											<col style={{ width: "10%" }} />
											<col style={{ width: "15%" }} />
										</colgroup>
										<thead>
											<tr>
												<th className="name">Name</th>
												<th className="date-add">Stock</th>
												<th className="role">Supplier</th>
												<th className="shift">Re-order</th>
												<th className="action">Action</th>
											</tr>
										</thead>
										<tbody>
											{shiftData.map((item, index) => (
												<tr key={index}>
													<td className="name">
														<div>{item.name}</div>
													</td>
													<td
														className={`date-add ${item.stock
															.replace(" ", "-")
															.toLowerCase()}`}
													>
														<div>{item.presence}</div>
														<div className="date-add">{item.stock}</div>
													</td>
													<td className="role">
														<span className="role-chip">{item.supplier}</span>
													</td>
													<td className="shift">
														<div>{item.reorder}</div>
														<div className="shift-time">{item.reorder_msg}</div>
													</td>
													<td className="action">
														<button
															className="btn"
															onClick={() => handleEdit(index)}
														>
															Detail
														</button>
														<button
															className="btn"
															onClick={() => handleEdit(index)}
														>
															Edit
														</button>
														<button
															className="warning-btn"
															onClick={() => handleDelete(index)}
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

					{/* -------------------------------- */}
					{/* Main Table & card maybe */}
					{/* -------------------------------- */}
					{/* Form Dialog */}
				</div>
				{/* Content */}
			</div>
		</>
	);

	// Handler function untuk edit
	function handleEdit(index) {
		console.log(`Edit employee at index ${index}`);
		// Tambahkan logic untuk proses edit di sini
	}

	// Handler function untuk delete
	function handleDelete(index) {
		console.log(`Delete employee at index ${index}`);
		// Tambahkan logic untuk proses delete di sini
	}
};

export default Inventory;
