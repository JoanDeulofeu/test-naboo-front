import { RxCross2 } from "react-icons/rx";

import styles from "@/styles/components/Modal.module.css";

interface ModalProps {
	title: string;
	children?: any;
	onClose: () => void;
}

const Modal = ({ title, children, onClose }: ModalProps) => {
	var width = window.innerWidth;

	var body = document.body;

	var height = Math.max(body.scrollHeight, window.innerHeight);

	return (
		<div
			onClick={onClose}
			className={styles.modalBackground}
			style={{ width, height }}
		>
			<div onClick={(e) => e.stopPropagation()} className={styles.modal}>
				<div className={styles.header}>
					<p className={styles.headerTitle}>{title}</p>
					<RxCross2 onClick={onClose} className={styles.rightEmoji} />
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
