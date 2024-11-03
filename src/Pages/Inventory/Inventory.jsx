import "./Inventory.scss";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import Sidebar from "../../Components/Sidebar.jsx";
import FormItem from "../../Components/FormItem.jsx";

export const Inventory = () => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [items, setItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [sortField, setSortField] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [searchQuery, setSearchQuery] = useState(""); // State for search input

	const handleOpenDialog = (item) => {
		setSelectedItem(item);
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
		setSelectedItem(null);
	};

	// Fetch items from the API
	const fetchItems = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/item/");
			setItems(response.data.items);
		} catch (error) {
			console.error("Error fetching items:", error);
		}
	};

	// Fetch items on component mount
	useEffect(() => {
		fetchItems();
	}, []);

	const handleDelete = (index) => {
		const itemId = items[index]._id;
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this item?"
		);
		if (confirmDelete) {
			axios
				.delete(`http://localhost:5000/api/item/${itemId}`)
				.then((response) => {
					toast.success("Item berhasil dihapus!");
					fetchItems(); // Refetch items after deletion
				})
				.catch((error) => {
					toast.error("Something went wrong !");
					console.error("Error deleting item:", error);
				});
		}
	};

	// Sort items with a three-click system for sorting, where the third click clears the sorting
	const sortItems = (field) => {
		if (sortField === field) {
			const newOrder =
				sortOrder === "asc" ? "desc" : sortOrder === "desc" ? "none" : "asc";
			setSortOrder(newOrder);
			if (newOrder === "none") {
				setSortField(""); // Clear sorting if clicked the third time
				setItems([...items]); // Reset to initial order
				return;
			}
		} else {
			setSortField(field);
			setSortOrder("asc");
		}

		const sortedItems = [...items].sort((a, b) => {
			if (field === "item_name" || field === "supplier") {
				return sortOrder === "asc"
					? a[field].localeCompare(b[field])
					: b[field].localeCompare(a[field]);
			} else if (field === "stock") {
				return sortOrder === "asc" ? b.stock - a.stock : a.stock - b.stock;
			} else if (field === "reorder_level") {
				return sortOrder === "asc"
					? a.reorder_level - b.reorder_level
					: b.reorder_level - a.reorder_level;
			}
			return 0;
		});
		setItems(sortedItems);
	};

	const handleUpdateItem = async (updatedItem) => {
		try {
			await axios.put(
				`http://localhost:5000/api/item/${updatedItem._id}`,
				updatedItem
			);
			toast.success("Item berhasil diupdate!");
			handleCloseDialog();
			fetchItems(); // Refetch items after updating
		} catch (error) {
			toast.error("Something went wrong !");
			console.error("Error updating item:", error);
		}
	};

	// Filter items based on search query
	const filteredItems = items.filter((item) =>
		Object.values(item).some((value) =>
			value.toString().toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	return (
		<>
			<FormItem
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				item={selectedItem}
				onSubmit={handleUpdateItem}
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
										<input
											type="text"
											placeholder="Search Here ..."
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
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
											<col style={{ width: "20%" }} />
											<col style={{ width: "25%" }} />
										</colgroup>
										<thead>
											<tr>
												<th
													className={`name ${
														sortField === "item_name" ? "sorted" : ""
													}`}
												>
													<button onClick={() => sortItems("item_name")}>
														Item Name{" "}
														{sortField === "item_name" &&
															(sortOrder === "asc"
																? "▲"
																: sortOrder === "desc"
																? "▼"
																: "")}
													</button>
												</th>
												<th
													className={`stock ${
														sortField === "stock" ? "sorted" : ""
													}`}
												>
													<button onClick={() => sortItems("stock")}>
														Stock{" "}
														{sortField === "stock" &&
															(sortOrder === "asc"
																? "▲"
																: sortOrder === "desc"
																? "▼"
																: "")}
													</button>
												</th>
												<th
													className={`supplier ${
														sortField === "supplier" ? "sorted" : ""
													}`}
												>
													<button onClick={() => sortItems("supplier")}>
														Supplier{" "}
														{sortField === "supplier" &&
															(sortOrder === "asc"
																? "▲"
																: sortOrder === "desc"
																? "▼"
																: "")}
													</button>
												</th>
												<th
													className={`reorder ${
														sortField === "reorder_level" ? "sorted" : ""
													}`}
												>
													<button onClick={() => sortItems("reorder_level")}>
														Re-order Status{" "}
														{sortField === "reorder_level" &&
															(sortOrder === "asc"
																? "▲"
																: sortOrder === "desc"
																? "▼"
																: "")}
													</button>
												</th>
												<th className="action">Action</th>
											</tr>
										</thead>
										<tbody>
											{filteredItems.map((item, index) => (
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
													<td
														className={`reorder ${
															item.reorder_level === 1
																? "immediate"
																: item.reorder_level === 2
																? "caution"
																: "plentiful"
														}`}
													>
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
															className="btn del"
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
