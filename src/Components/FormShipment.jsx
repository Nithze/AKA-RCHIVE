/* eslint-disable react/prop-types */
import "./FormShipment.scss";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { toast } from "sonner";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const FormEmployee = ({ isOpen, onClose, onAddShipment }) => {
	const overlayRef = useRef(null);
	const dialogRef = useRef(null);
	const [deductions, setDeductions] = useState([
		{ item_name: "", quantity: "", supplier: "" },
	]);
	const [suppliers, setSuppliers] = useState([]);
	const [items, setItems] = useState([]); // State to store all items
	const deductionsRef = useRef(null);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [showItemSuggestions, setShowItemSuggestions] = useState(false); // State for item suggestions
	const [userId, setUserId] = useState(null);
	const [focusedItemIndex, setFocusedItemIndex] = useState(null);
	const [focusedSupplierIndex, setFocusedSupplierIndex] = useState(null);

	// Animation for showing/hiding modal
	useEffect(() => {
		if (isOpen) {
			gsap.to(overlayRef.current, {
				opacity: 1,
				duration: 0.3,
				ease: "power2.inOut",
			});
			gsap.to(dialogRef.current, {
				scale: 1,
				opacity: 1,
				duration: 0.3,
				ease: "power2.out",
			});
		} else {
			gsap.to(overlayRef.current, {
				opacity: 0,
				duration: 0.3,
				ease: "power2.inOut",
			});
			gsap.to(dialogRef.current, {
				scale: 0,
				opacity: 0,
				duration: 0.3,
				ease: "power2.in",
			});
		}
	}, [isOpen]);

	// Fetch unique suppliers from API
	useEffect(() => {
		const fetchSuppliers = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/item/suppliers"
				);
				setSuppliers(response.data);
			} catch (error) {
				console.error("Error fetching suppliers:", error);
				toast.error("Failed to load suppliers");
			}
		};

		// Fetch all items from API
		const fetchItems = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/item");
				setItems(response.data.items);
			} catch (error) {
				console.error("Error fetching items:", error);
				toast.error("Failed to load items");
			}
		};

		fetchSuppliers();
		fetchItems();
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decoded = jwtDecode(token);
				setUserId(decoded.id);
			} catch (error) {
				console.error("Invalid token", error);
				toast.error("Failed to authenticate");
			}
		}
	}, []);

	if (!isOpen) return null;

	const handleClose = () => {
		gsap.to(dialogRef.current, {
			scale: 0,
			opacity: 0,
			duration: 0.3,
			ease: "power2.in",
		});
		gsap.to(overlayRef.current, {
			opacity: 0,
			duration: 0.3,
			ease: "power2.inOut",
			onComplete: onClose,
		});
	};

	const addDeduction = () => {
		setDeductions([
			...deductions,
			{ item_name: "", quantity: "", supplier: "" },
		]);

		gsap.fromTo(
			deductionsRef.current.lastChild,
			{ height: 0, opacity: 0 },
			{
				height: "auto",
				opacity: 1,
				duration: 0.3,
				ease: "power2.out",
			}
		);
	};

	const removeDeduction = () => {
		if (deductions.length > 1) {
			const lastItem = deductionsRef.current.lastChild;
			gsap.to(lastItem, {
				height: 0,
				opacity: 0,
				duration: 0.3,
				ease: "power2.in",
				onComplete: () => {
					setDeductions(deductions.slice(0, -1));
				},
			});
		}
	};

	// Filter suppliers as the user types
	const handleSupplierInputChange = (index, value) => {
		const updatedDeductions = [...deductions];
		updatedDeductions[index].supplier = value;
		setDeductions(updatedDeductions);
	};

	// Filter item names as the user types
	const handleItemInputChange = (index, value) => {
		const updatedDeductions = [...deductions];
		updatedDeductions[index].item_name = value;
		setDeductions(updatedDeductions);
	};

	// Show suggestions with animation
	const showSuggestionsDropdown = (type, index) => {
		if (type === "item") {
			setFocusedItemIndex(index);
			setShowItemSuggestions(true);
		} else {
			setFocusedSupplierIndex(index);
			setShowSuggestions(true);
		}

		gsap.fromTo(
			".suggestions",
			{ height: 0, opacity: 0 },
			{ height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
		);
	};

	// Hide suggestions with animation
	const hideSuggestionsDropdown = (type) => {
		gsap.to(".suggestions", {
			height: 0,
			opacity: 0,
			duration: 0.3,
			ease: "power2.in",
			onComplete: () => {
				if (type === "item") {
					setFocusedItemIndex(null);
					setShowItemSuggestions(false);
				} else {
					setFocusedSupplierIndex(null);
					setShowSuggestions(false);
				}
			},
		});
	};

	const handleSave = async () => {
		// Aggregate quantities for duplicate items
		const aggregatedDeductions = deductions.reduce((acc, curr) => {
			const existingIndex = acc.findIndex(
				(item) =>
					item.item_name === curr.item_name && item.supplier === curr.supplier
			);

			if (existingIndex > -1) {
				// Add quantity if item already exists
				acc[existingIndex].quantity += parseInt(curr.quantity, 10);
			} else {
				// Otherwise, push the item with parsed quantity
				acc.push({
					...curr,
					quantity: parseInt(curr.quantity, 10), // Ensure quantity is a number
				});
			}

			return acc;
		}, []);

		const newShipment = {
			user_id: userId,
			date: new Date().toISOString().split("T")[0],
			items: aggregatedDeductions,
		};

		try {
			await axios.post("http://localhost:5000/api/history", newShipment);
			toast.success("Shipment saved successfully!");
			onAddShipment(newShipment);
			onClose();
		} catch (error) {
			console.error("Error saving shipment:", error);
			toast.error("Failed to save shipment.");
		}
	};

	return (
		<div
			className="dialog-overlay"
			onClick={handleClose}
			ref={overlayRef}
			style={{ opacity: 0 }}
		>
			<div
				className="dialog"
				ref={dialogRef}
				style={{
					transform: "scale(0)",
					opacity: 0,
					overflowY: "scroll",
					maxHeight: "80vh",
				}}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="add-employee">
					<h2>New Shipment</h2>
					<p>
						Input yang bertanda <span className="warning-text">*</span> wajib di
						isi
					</p>

					<div className="form-container">
						<div className="form-ship">
							<div className="form-group">
								<label>
									Tanggal<span className="warning-text">*</span>
								</label>
								<input type="date" name="startDate" required />
							</div>
							<div className="form-group">
								<label>
									Items<span className="warning-text">*</span>
								</label>
								<div className="multi-input" ref={deductionsRef}>
									{deductions.map((deduction, index) => (
										<div className="deduction-item" key={index}>
											{/* Item Name Auto-suggestion */}
											<div className="autosuggest-container">
												<input
													className="inputz"
													type="text"
													placeholder="Nama Item"
													value={deduction.item_name}
													onFocus={() => showSuggestionsDropdown("item", index)}
													onBlur={() => hideSuggestionsDropdown("item")}
													onChange={(e) =>
														handleItemInputChange(index, e.target.value)
													}
												/>
												{showItemSuggestions && focusedItemIndex === index && (
													<div className="suggestions">
														{items
															.filter((item) =>
																item.item_name
																	.toLowerCase()
																	.includes(deduction.item_name.toLowerCase())
															)
															.slice(0, 3) // Limit to top 3 suggestions
															.map((suggestion, i) => (
																<div
																	key={i}
																	className="suggestion"
																	onClick={() =>
																		handleItemInputChange(
																			index,
																			suggestion.item_name
																		)
																	}
																>
																	{suggestion.item_name}
																</div>
															))}
													</div>
												)}
											</div>

											<input
												className="inputx"
												type="number"
												placeholder="Quantity"
												value={deduction.quantity}
												onChange={(e) => {
													const updatedDeductions = [...deductions];
													updatedDeductions[index].quantity = e.target.value;
													setDeductions(updatedDeductions);
												}}
											/>
											{/* Supplier Auto-suggestion */}
											<div className="autosuggest-container">
												<input
													className="inputz"
													type="text"
													placeholder="Enter Supplier"
													value={deduction.supplier}
													onFocus={() =>
														showSuggestionsDropdown("supplier", index)
													}
													onBlur={() => hideSuggestionsDropdown("supplier")}
													onChange={(e) =>
														handleSupplierInputChange(index, e.target.value)
													}
												/>
												{showSuggestions && focusedSupplierIndex === index && (
													<div className="suggestions">
														{suppliers
															.filter((supplier) =>
																supplier
																	.toLowerCase()
																	.includes(deduction.supplier.toLowerCase())
															)
															.slice(0, 3) // Limit to top 3 suggestions
															.map((suggestion, i) => (
																<div
																	key={i}
																	className="suggestion"
																	onClick={() =>
																		handleSupplierInputChange(index, suggestion)
																	}
																>
																	{suggestion}
																</div>
															))}
													</div>
												)}
											</div>
										</div>
									))}
								</div>
								<div className="input-action">
									<button className="btn-input-w" onClick={removeDeduction}>
										-
									</button>
									<button className="btn-input" onClick={addDeduction}>
										+
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="button-group">
						<button onClick={handleClose} className="warning-btn">
							Batal
						</button>
						<button onClick={handleSave} className="btn">
							Simpan
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormEmployee;
