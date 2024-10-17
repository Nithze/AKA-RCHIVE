import "./FormItem.scss";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

// eslint-disable-next-line react/prop-types
const FormItem = ({ isOpen, onClose, item, onSubmit }) => {
	const overlayRef = useRef(null);
	const dialogRef = useRef(null);
	const [formData, setFormData] = useState({
		item_name: "",
		stock: "",
		supplier: "",
		reorder_level: "",
	});

	useEffect(() => {
		if (item) {
			setFormData(item); // Pre-fill form data if editing
		}
	}, [item]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData); // Trigger the update in Inventory component
	};

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
				style={{ transform: "scale(0)", opacity: 0 }}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="add-employee">
					<h2>Edit Item</h2>
					<form onSubmit={handleSubmit}>
						<div className="form-control">
							<label htmlFor="item_name">Item Name</label>
							<input
								type="text"
								id="item_name"
								name="item_name"
								value={formData.item_name}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className="form-control">
							<label htmlFor="stock">Stock</label>
							<input
								type="number"
								id="stock"
								name="stock"
								value={formData.stock}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className="form-control">
							<label htmlFor="supplier">Supplier</label>
							<input
								type="text"
								id="supplier"
								name="supplier"
								value={formData.supplier}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className="form-control">
							<label htmlFor="reorder_level">Reorder Level</label>
							<select
								id="reorder_level"
								name="reorder_level"
								value={formData.reorder_level}
								onChange={handleInputChange}
								required
							>
								<option value="1">Re-order Immediately</option>
								<option value="2">Caution</option>
								<option value="3">Plentiful</option>
							</select>
						</div>

						<button type="submit" className="submit-btn">
							Save Changes
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FormItem;
