import "./Inventory.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Components/Sidebar.jsx";
import FormItem from "../../Components/FormItem.jsx";

export const Inventory = () => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [items, setItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item for editing
	const [sortOrder, setSortOrder] = useState("asc");

	const handleOpenDialog = (item) => {
		setSelectedItem(item);
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
		setSelectedItem(null); // Clear the selected item when closing
	};

	// Fetch items from the API
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/item/");
				setItems(response.data.items);
			} catch (error) {
				console.error("Error fetching items:", error);
			}
		};

		fetchItems();
	}, []);

	function handleDelete(index) {
		const itemId = items[index]._id;
		const confirmDelete = window.confirm(
			`Are you sure you want to delete this item?`
		);

		if (confirmDelete) {
			axios
				.delete(`http://localhost:5000/api/item/${itemId}`)
				.then((response) => {
					console.log("Item deleted:", response.data);
					const updatedItems = items.filter((item, idx) => idx !== index);
					setItems(updatedItems);
				})
				.catch((error) => {
					console.error("Error deleting item:", error);
				});
		}
	}

	// Function to handle sorting
	const handleSortChange = (e) => {
		const order = e.target.value;
		setSortOrder(order);

		const sortedItems = [...items].sort((a, b) => {
			if (order === "dsc") {
				return a.stock - b.stock;
			} else if (order === "asc") {
				return b.stock - a.stock;
			}
			return 0;
		});

		setItems(sortedItems);
	};

	const handleUpdateItem = async (updatedItem) => {
		try {
			// Send the updated item data to the server
			await axios.put(
				`http://localhost:5000/api/item/${updatedItem._id}`,
				updatedItem
			);

			// Update the local state
			const updatedItems = items.map((item) =>
				item._id === updatedItem._id ? updatedItem : item
			);
			setItems(updatedItems);
			handleCloseDialog();
		} catch (error) {
			console.error("Error updating item:", error);
		}
	};

	return (
		<>
			{/* Pass selectedItem to FormItem */}
			<FormItem
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				item={selectedItem}
				onSubmit={handleUpdateItem} // Handle the form submission
			/>
			<div className="container">
				<Sidebar className="sidebar" />
				<div className="content">
					<header className="header">
						<div className="header-left">
							<h1>Manage Inventory</h1>
							<p>
								Keep track of all the items in your inventory. Manage stock,
								reorder levels, and suppliers.
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
											<col style={{ width: "20%" }} />
											<col style={{ width: "25%" }} />
										</colgroup>
										<thead>
											<tr>
												<th className="name">Item Name</th>
												<th className="stock">Stock</th>
												<th className="supplier">Supplier</th>
												<th className="reorder">Re-order Status</th>
												<th className="action">Action</th>
											</tr>
										</thead>
										<tbody>
											{items.map((item, index) => (
												<tr key={item._id}>
													<td className="name">
														<div>{item.item_name}</div>
													</td>
													<td className="stock">
														<div>{item.stock}</div>
													</td>
													<td className="supplier">
														<span className="role-chip">{item.supplier}</span>
													</td>
													<td className="reorder">
														{item.reorder_level === 1
															? "Re-order Immediately"
															: item.reorder_level === 2
															? "Caution"
															: "Plentiful"}
													</td>
													<td className="action">
														<button
															className="btn"
															onClick={() => handleOpenDialog(item)}
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
				</div>
			</div>
		</>
	);
};

export default Inventory;
