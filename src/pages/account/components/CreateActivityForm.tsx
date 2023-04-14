import React from "react";

import i18n from "i18next";

import Button from "@/components/Button";
import Select from "@/components/Select";
import TextInput from "@/components/TextInput";
import activities from "@/utils/activities";

import styles from "@/styles/components/Header/Form.module.css";

interface CreateActivityFormProps {
	onClose: () => void;
}
interface Form {
	city: string;
	club: string;
	description: string;
	price: number;
	type: string;
}

const CreateActivityFormField = ["city", "price", "description", "club"];

const CreateActivityForm = ({ onClose }: CreateActivityFormProps) => {
	const [form, setForm] = React.useState<Form>({
		type: "",
		city: "",
		price: 1,
		description: "",
		club: "",
	});
	const [error, setError] = React.useState<string | undefined | null>();

	const handleChange = (field: string, value: string) => {
		setError(undefined);
		setForm((oldForm) => ({ ...oldForm, [field]: value }));
	};

	const handleRegister = () => {
		if (form.type === "" || form.city === "")
			setError(i18n.t(`Account.formError`));
		if (form.price < 0) setError(i18n.t(`Account.formPriceError`));
		else {
			// ----- LOG to test. Remove it ! -----
			console.log("test", form);
		}
	};

	return (
		<>
			<div className={styles.formContainer}>
				<Select
					label={i18n.t(`Account.type`)}
					options={activities.map((activity) => ({
						field: activity,
						value: i18n.t(`Discover.${activity}.title`),
					}))}
					onChange={(e) => handleChange("type", e.currentTarget.value)}
				/>
				{CreateActivityFormField.map((field) => (
					<TextInput
						key={field}
						label={i18n.t(`Account.${field}`)}
						placeholder={i18n.t(`Account.placeholder`)}
						onChange={(e: any) => handleChange(field, e.currentTarget.value)}
						value={(form as any)[field] ?? ""}
						type={field === "price" ? "number" : "text"}
						min={field === "price" ? "1" : ""}
					/>
				))}
			</div>
			{error && <p className={styles.errorText}>{error}</p>}
			<div className={styles.footer}>
				<Button
					onClick={handleRegister}
					label={i18n.t(`Account.createActivity`)}
				/>
			</div>
		</>
	);
};

export default CreateActivityForm;
