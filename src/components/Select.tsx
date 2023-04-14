import styles from "@/styles/components/Select.module.css";

interface Options {
	field: string;
	value: string;
}

interface SelectProps {
	label?: string | null;
	options: Options[];
	onChange: (e: any) => void;
}

const Select = ({ label, options, onChange }: SelectProps) => {
	return (
		<div className={styles.selectWithLabel}>
			{label && <p>{label}</p>}

			<div className={styles.selectContainer}>
				<select
					className={styles.select}
					name="pets"
					id="pet-select"
					onChange={onChange}
				>
					{options?.map((option) => (
						<option key={option.field} value={option.field}>
							{option.value}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Select;
