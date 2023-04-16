import { MdEuroSymbol, MdLocationPin } from "react-icons/md";
import { GiTennisRacket } from "react-icons/gi";

import styles from "@/styles/components/TextInput.module.css";

interface TexpInputProps {
	label?: string | null;
	type?: string;
	icon?: string;
	placeholder?: string | null;
	style?: any;
	min?: string;
	onChange: (e: any) => void;
	value: string | number | undefined;
}

const getIcon = (icon: string) => {
	if (icon === "location") return <MdLocationPin className={styles.icon} />;
	else if (icon === "euros") return <MdEuroSymbol className={styles.icon} />;
	else if (icon === "activity")
		return <GiTennisRacket className={styles.icon} />;
	return <></>;
};

const TextInput = ({
	label,
	type = "text",
	icon,
	placeholder,
	style,
	min,
	onChange,
	value,
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
					id={label ?? ""}
					onChange={onChange}
					value={value}
					min={min}
				></input>
			</div>
		</div>
	);
};

export default TextInput;
