import "./Shipment.scss";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import Sidebar from "../../Components/Sidebar.jsx";
import FormItem from "../../Components/FormItem.jsx";
import DetailsModal from "../../Components/DetailsModal.jsx";

export const Shipment = () => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [isDetailsOpen, setDetailsOpen] = useState(false); // State for the Details modal
	const [shipments, setShipments] = useState([]);
	const [selectedShipment, setSelectedShipment] = useState(null); // State to store the selected shipment for editing or details
	const [sortOrder, setSortOrder] = useState("asc");

	const handleOpenDialog = (shipment) => {
		setSelectedShipment(shipment);
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
		setSelectedShipment(null); // Clear the selected shipment when closing
	};

	// Handle opening the details modal
	const handleOpenDetails = (shipment) => {
		setSelectedShipment(shipment);
		setDetailsOpen(true); // Open the details modal
	};

	// Close the details modal
	const handleCloseDetails = () => {
		setDetailsOpen(false);
		setSelectedShipment(null); // Clear selected shipment when closing details
	};

	// Fetch shipments from the API
	useEffect(() => {
		const fetchShipments = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/history/");
				setShipments(response.data);
			} catch (error) {
				console.error("Error fetching shipments:", error);
			}
		};

		fetchShipments();
	}, []);

	// Function to handle sorting by date (ASC or DSC)
	const handleSortChange = (e) => {
		const order = e.target.value;
		setSortOrder(order);

		const sortedShipments = [...shipments].sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);

			if (order === "asc") {
				return dateA - dateB; // Ascending order (earlier to later)
			} else if (order === "dsc") {
				return dateB - dateA; // Descending order (later to earlier)
			}
			return 0;
		});

		setShipments(sortedShipments);
	};

	return (
		<>
			<FormItem
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				item={selectedShipment}
				onSubmit={() => {}} // Empty function for now
			/>

			<DetailsModal
				isOpen={isDetailsOpen}
				onClose={handleCloseDetails}
				shipment={selectedShipment} // Pass the selected shipment to the details modal
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
									<div className="search-bar">
										<input type="text" placeholder="Search Here ..." />
									</div>
									<div className="filter">
										<select value={sortOrder} onChange={handleSortChange}>
											<option value="asc">ASC</option>
											<option value="dsc">DSC</option>
										</select>
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
												<th className="supplier">Shipped Recived</th>
												<th className="stock">Number of Items</th>
												<th className="action">Action</th>
											</tr>
										</thead>
										<tbody>
											{shipments.map((shipment, index) => (
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
															onClick={() => handleOpenDetails(shipment)} // Handle details click
														>
															Details
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
				</div>
			</div>
		</>
	);
};

export default Shipment;
