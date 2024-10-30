import "./Shipment.scss";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import Sidebar from "../../Components/Sidebar.jsx";
import FormShipment from "../../Components/FormShipment.jsx";
import DetailsModal from "../../Components/DetailsModal.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Shipment = () => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [isDetailsOpen, setDetailsOpen] = useState(false);
	const [shipments, setShipments] = useState([]);
	const [filteredShipments, setFilteredShipments] = useState([]);
	const [selectedShipment, setSelectedShipment] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const handleOpenDialog = (shipment) => {
		setSelectedShipment(shipment);
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
		setSelectedShipment(null);
	};

	const handleOpenDetails = (shipment) => {
		setSelectedShipment(shipment);
		setDetailsOpen(true);
	};

	const handleCloseDetails = () => {
		setDetailsOpen(false);
		setSelectedShipment(null);
	};

	const fetchShipments = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/history/");
			setShipments(response.data);
			setFilteredShipments(response.data);
		} catch (error) {
			console.error("Error fetching shipments:", error);
		}
	};

	useEffect(() => {
		fetchShipments();
	}, []);

	const handleAddShipment = async () => {
		await fetchShipments();
		setDialogOpen(false);
	};

	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
		filterData(query, startDate, endDate);
	};

	const handleDateChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		filterData(searchQuery, start, end);
	};

	const filterData = (query, start, end) => {
		let filtered = shipments;
		if (query) {
			filtered = filtered.filter((shipment) =>
				shipment.user_id.name.toLowerCase().includes(query)
			);
		}
		if (start && end) {
			filtered = filtered.filter((shipment) => {
				const shipmentDate = new Date(shipment.date);
				return shipmentDate >= start && shipmentDate <= end;
			});
		}
		setFilteredShipments(filtered);
	};

	const handleDelete = async (id) => {
		// Use browser's confirmation dialog
		const isConfirmed = window.confirm(
			"Are you sure you want to delete this shipment?"
		);
		if (isConfirmed) {
			try {
				await axios.delete(`http://localhost:5000/api/history/${id}`);
				toast.success("Shipment deleted successfully");
				fetchShipments(); // Refresh the shipment list after deletion
			} catch (error) {
				console.error("Error deleting shipment:", error);
				toast.error("Error deleting shipment");
			}
		}
	};

	return (
		<>
			<FormShipment
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				item={selectedShipment}
				onAddShipment={handleAddShipment}
				onSubmit={() => {}}
			/>

			<DetailsModal
				isOpen={isDetailsOpen}
				onClose={handleCloseDetails}
				shipment={selectedShipment}
			/>

			<div className="container">
				<Sidebar className="sidebar" />
				<div className="content">
					<header className="header">
						<div className="header-left">
							<h1>Manage Shipments</h1>
							<p>
								Keep track of all your shipments, including items and quantity.
							</p>
						</div>
						<div className="header-right">
							<button className="btn">
								<i className="bx bx-download icon"></i>
								Download CSV
							</button>
							<button className="btn" onClick={() => handleOpenDialog()}>
								<i className="bx bx-user-plus icon"></i>
								New Shipment
							</button>
						</div>
					</header>

					<div className="main-container">
						<div className="main">
							<div className="toolbar">
								<div className="left">
									<div className="filter">
										<DatePicker
											selected={startDate}
											onChange={handleDateChange}
											startDate={startDate}
											endDate={endDate}
											selectsRange
											placeholderText="Filter by Date Range"
											className="date-picker"
										/>
									</div>
								</div>
							</div>

							<div className="list-employees">
								<div className="table-container">
									<table>
										<colgroup>
											<col style={{ width: "20%" }} />
											<col style={{ width: "15%" }} />
											<col style={{ width: "20%" }} />
											<col style={{ width: "25%" }} />
										</colgroup>
										<thead>
											<tr>
												<th className="name">Shipment Date</th>
												<th className="supplier">Shipped Received</th>
												<th className="stock">Number of Items</th>
												<th className="action">Action</th>
											</tr>
										</thead>
										<tbody>
											{filteredShipments.map((shipment) => (
												<tr key={shipment._id}>
													<td className="name">
														<div>
															{new Date(shipment.date).toLocaleDateString()}
														</div>
													</td>
													<td className="supplier">
														<span className="role-chip">
															{shipment.user_id.name}
														</span>
													</td>
													<td className="stock">
														<div>{shipment.items.length}</div>
													</td>
													<td className="action">
														<button
															className="btn"
															onClick={() => handleOpenDetails(shipment)}
														>
															Details
														</button>
														<button
															className="warning-btn"
															onClick={() => handleDelete(shipment._id)}
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

export default Shipment;
