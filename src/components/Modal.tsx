import Image from "next/image";

import { RxCross2 } from "react-icons/rx";

import styles from "@/styles/components/Modal.module.css";

interface ModalProps {
	title?: string | null;
	image?: any;
	children?: any;
	onClose: () => void;
}

const Modal = ({ title, image, children, onClose }: ModalProps) => {
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
				<div className={image ? styles.headerWithImage : styles.header}>
					{title && !image && <p className={styles.headerTitle}>{title}</p>}
					{!title && image && (
						<Image
							src={image}
							alt={`Picture of modal header`}
							className={styles.modalImage}
							priority
						/>
					)}
					<RxCross2 onClick={onClose} className={styles.rightEmoji} />
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
