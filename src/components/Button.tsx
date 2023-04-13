import Link from "next/link";

import { MdLocationPin, MdEuroSymbol } from "react-icons/md";

import i18n from "i18next";

import styles from "@/styles/components/Button.module.css";

interface ButtonProps {
	label?: string | null;
	icon?: string;
	onClick: () => void;
}

const getIcon = (icon: string) => {
	if (icon === "location") return <MdLocationPin className={styles.icon} />;
	else if (icon === "euros") return <MdEuroSymbol className={styles.icon} />;
	return <></>;
};

const Button = ({ label = "Click here", icon, onClick }: ButtonProps) => {
	return (
		<div className={styles.primaryButton} onClick={onClick}>
			{label}
		</div>
	);
};

export default Button;
