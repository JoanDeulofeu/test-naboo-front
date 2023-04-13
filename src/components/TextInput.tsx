import Link from "next/link";

import { MdLocationPin, MdEuroSymbol } from "react-icons/md";

import i18n from "i18next";

import styles from "@/styles/components/TextInput.module.css";

interface TexpInputProps {
	label?: string | null;
	type?: string;
	icon?: string;
	placeholder?: string | null;
	style?: any;
}

const getIcon = (icon: string) => {
	if (icon === "location") return <MdLocationPin className={styles.icon} />;
	else if (icon === "euros") return <MdEuroSymbol className={styles.icon} />;
	return <></>;
};

const TextInput = ({
	label,
	type = "text",
	icon,
	placeholder,
	style,
}: TexpInputProps) => {
	return (
		<div className={styles.textInput} style={{ ...style }}>
			{label && <label>{label}</label>}
			<div className={styles.inputContainer}>
				{icon && getIcon(icon)}
				<input
					className={styles.input}
					type={type}
					placeholder={placeholder ?? ""}
					id="name"
				></input>
			</div>
		</div>
	);
};

export default TextInput;
