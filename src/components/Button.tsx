import Link from "next/link";

import { FiPlusCircle } from "react-icons/fi";

import i18n from "i18next";

import styles from "@/styles/components/Button.module.css";

interface ButtonProps {
	label?: string | null;
	variant?: string;
	icon?: string;
	onClick: () => void;
}

const getIcon = (icon: string) => {
	if (icon === "plus") return <FiPlusCircle className={styles.icon} />;
	return <></>;
};

const Button = ({
	label = "Click here",
	variant = "primary",
	icon,
	onClick,
}: ButtonProps) => {
	return (
		<div
			className={
				variant === "primary" ? styles.primaryButton : styles.secondaryButton
			}
			onClick={onClick}
		>
			{icon && getIcon(icon)}
			{label}
		</div>
	);
};

export default Button;
