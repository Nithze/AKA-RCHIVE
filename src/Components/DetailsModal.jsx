/* eslint-disable react/prop-types */
import "./DetailsModal.scss"; // Import the associated styles
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// eslint-disable-next-line react/prop-types
const DetailsModal = ({ isOpen, onClose, shipment }) => {
	const overlayRef = useRef(null);
	const dialogRef = useRef(null);

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

	if (!isOpen || !shipment) return null;

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
				<div className="details-modal">
					<h2>Shipment Details</h2>
					<p>
						<strong>Shipment Date:</strong>{" "}
						{new Date(shipment.date).toLocaleDateString()}
					</p>
					<p>
						<strong>Shipped Received:</strong> {shipment.user_id.name}
					</p>
					<h3>Items:</h3>
					<div className="items-list">
						{shipment.items.map((item) => (
							<div key={item._id} className="item">
								<p>
									<strong>
										{item.item_id ? item.item_id.item_name : "Deleted Item"}
									</strong>{" "}
									: {item.quantity}
								</p>
								<p>
									<strong>Supplier:</strong>{" "}
									{item.item_id ? item.item_id.supplier : "Deleted Supplier"}
								</p>
							</div>
						))}
					</div>
					<button className="close-btn" onClick={handleClose}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default DetailsModal;
