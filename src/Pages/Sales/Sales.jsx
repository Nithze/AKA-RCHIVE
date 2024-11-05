import "./Sales.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Components/Sidebar.jsx";
import { gsap } from "gsap";

export const Sales = () => {
	const [sales, setSales] = useState([]);
	const [frequentlySoldSales, setFrequentlySoldSales] = useState([]);
	const [sortField, setSortField] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [searchQuery, setSearchQuery] = useState("");
	const [isFrequentlySoldFilter, setFrequentlySoldFilter] = useState(false);
	const [timeRange, setTimeRange] = useState("weekly");
	const [expandedRows, setExpandedRows] = useState({}); // State for expanded rows

	const toggleRow = (id) => {
		setExpandedRows((prev) => {
			const isExpanded = prev[id];
			// Animate row expansion
			if (isExpanded) {
				gsap.to(`#details-${id}`, { height: 0, opacity: 0, duration: 0.3 });
				setTimeout(() => {
					setExpandedRows((prevState) => ({ ...prevState, [id]: false }));
				}, 300);
				return { ...prev, [id]: false };
			} else {
				setExpandedRows((prevState) => ({ ...prevState, [id]: true }));
				gsap.fromTo(
					`#details-${id}`,
					{ height: 0, opacity: 0 },
					{ height: "auto", opacity: 1, duration: 0.3 }
				);
				return { ...prev, [id]: true };
			}
		});
	};

	// Fetch all sales from the API
	const fetchSales = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/sales");
			const data = response.data || [];
			const mappedSales = data.map((item) => ({
				_id: item._id,
				user_name: item.user_id.name,
				date: item.date,
				items: item.items.map((i) => ({
					item_id: {
						_id: i.item_id._id,
						item_name: i.item_id.item_name,
						supplier: i.item_id.supplier, // Add supplier information
					},
					quantity: i.quantity,
				})),
			}));
			setSales(mappedSales);
		} catch (error) {
			console.error("Error fetching sales:", error);
		}
	};

	// Fetch frequently sold items
	const fetchFrequentlySoldSales = async () => {
		try {
			const response = await axios.get(
				"http://localhost:5000/api/sales/frequently-sold"
			);
			const data = response.data[timeRange] || [];
			if (Array.isArray(data)) {
				const mappedSales = data.map((item) => ({
					_id: item._id,
					user_name: item.user_name,
					date: null,
					items: [
						{
							item_id: {
								_id: item._id,
								item_name: item.item_name,
							},
							quantity: item.totalQuantitySold,
						},
					],
				}));
				setFrequentlySoldSales(mappedSales);
			} else {
				console.error(
					"Unexpected data format for frequently sold sales:",
					data
				);
				setFrequentlySoldSales([]);
			}
		} catch (error) {
			console.error("Error fetching frequently sold sales:", error);
		}
	};

	// Toggle frequently sold filter
	const toggleFrequentlySoldFilter = () => {
		setFrequentlySoldFilter((prev) => !prev);
	};

	// Fetch sales data based on the filter status
	useEffect(() => {
		if (isFrequentlySoldFilter) {
			fetchFrequentlySoldSales();
		} else {
			fetchSales();
		}
	}, [isFrequentlySoldFilter, timeRange]);

	// Sort sales with a three-click sorting mechanism
	const sortSales = (field) => {
		const order = sortOrder === "asc" ? "desc" : "asc";
		setSortField(field);
		setSortOrder(order);
		const sortedSales = [
			...(isFrequentlySoldFilter ? frequentlySoldSales : sales),
		].sort((a, b) => {
			if (field === "date") {
				return order === "asc"
					? new Date(a.date) - new Date(b.date)
					: new Date(b.date) - new Date(a.date);
			}
			if (order === "asc") {
				return a[field].localeCompare(b[field]);
			} else {
				return b[field].localeCompare(a[field]);
			}
		});
		if (isFrequentlySoldFilter) {
			setFrequentlySoldSales(sortedSales);
		} else {
			setSales(sortedSales);
		}
	};

	// Filter sales based on search query
	const filteredSales = (
		isFrequentlySoldFilter ? frequentlySoldSales : sales
	).filter((sale) =>
		Object.values(sale).some(
			(value) =>
				value &&
				value.toString().toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	return (
		<>
			<div className="container">
				<Sidebar className="sidebar" />
				<div className="content">
					<header className="header">
						<div className="header-left">
							<h1>View Sales</h1>
							<p>
								Monitor all sales transactions and track frequently sold items.
							</p>
						</div>
						<div className="header-right">
							<button className="btn">
								<i className="bx bx-download icon"></i>
								Download CSV
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
											placeholder="Search Sales..."
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
										/>
									</div>
									<div className="filter-bar">
										<button
											className={`btn ${
												isFrequentlySoldFilter ? "active" : ""
											}`}
											onClick={toggleFrequentlySoldFilter}
											style={{
												color: isFrequentlySoldFilter ? "orange" : "",
											}}
										>
											Frequently Sold
										</button>
									</div>

									{/* Dropdown for time range */}
									<select
										className="time-range-dropdown"
										value={timeRange}
										onChange={(e) => setTimeRange(e.target.value)}
									>
										<option value="weekly">Weekly</option>
										<option value="monthly">Monthly</option>
										<option value="yearly">Yearly</option>
									</select>
								</div>
							</div>

							{/* Table for sales data */}
							<div className="list-employees">
								<div className="table-container">
									<table>
										<colgroup>
											<col style={{ width: "25%" }} />
											<col style={{ width: "20%" }} />
											<col style={{ width: "30%" }} />
										</colgroup>
										<thead>
											<tr>
												<th
													className={`name ${
														sortField === "user_name" ? "sorted" : ""
													}`}
												>
													<button onClick={() => sortSales("user_name")}>
														Salesperson{" "}
														{sortField === "user_name" &&
															(sortOrder === "asc"
																? "▲"
																: sortOrder === "desc"
																? "▼"
																: "")}
													</button>
												</th>
												<th
													className={`date ${
														sortField === "date" ? "sorted" : ""
													}`}
												>
													<button onClick={() => sortSales("date")}>
														Date{" "}
														{sortField === "date" &&
															(sortOrder === "asc"
																? "▲"
																: sortOrder === "desc"
																? "▼"
																: "")}
													</button>
												</th>
												<th className="items">Items Sold</th>
											</tr>
										</thead>
										<tbody>
											{filteredSales.map((sale) => (
												<>
													<tr key={sale._id}>
														<td>{sale.user_name}</td>
														<td>{new Date(sale.date).toLocaleDateString()}</td>
														<td>
															{sale.items.length}
															<button
																className="btn view-btn"
																onClick={() => toggleRow(sale._id)} // Toggle dropdown on button click
															>
																View
															</button>
														</td>
													</tr>
													{/* Expanded row for item details */}
													<tr
														id={`details-${sale._id}`}
														style={{
															display: expandedRows[sale._id]
																? "table-row"
																: "none",
														}}
													>
														<td colSpan="3">
															{" "}
															{/* Span across 3 columns, leaving the last column empty */}
															<div className="item-details">
																<h3>Item Details</h3>
																<ul>
																	{sale.items.map((item, index) => (
																		<li key={index}>
																			{item.item_id.item_name}: {item.quantity}
																		</li>
																	))}
																</ul>
															</div>
														</td>
													</tr>
												</>
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

export default Sales;
