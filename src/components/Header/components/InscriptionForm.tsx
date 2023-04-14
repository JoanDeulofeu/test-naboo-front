import React from "react";

import i18n from "i18next";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { useOauth } from "@/contexts/OauthContextProvider";

import styles from "@/styles/components/Header/Form.module.css";

interface InscriptionFormProps {
	switchToConnection: () => void;
	onClose: () => void;
}
interface Form {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const inscriptionFormField = ["firstName", "lastName", "email", "password"];

const InscriptionForm = ({
	switchToConnection,
	onClose,
}: InscriptionFormProps) => {
	const { createAccount } = useOauth();

	const [form, setForm] = React.useState<Form>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = React.useState<string | undefined | null>();

	const handleChange = (field: string, value: string) => {
		setError(undefined);
		setForm((oldForm) => ({ ...oldForm, [field]: value }));
	};

	const handleRegister = () => {
		if (Object.values(form).includes("")) setError(i18n.t(`Login.formError`));
		else if (form.password.length < 6)
			setError(i18n.t(`Login.formPasswordError`));
		else {
			createAccount(form).then((isCreated: boolean) => {
				if (isCreated) onClose();
				else setError(i18n.t(`Login.createAccountError`));
			});
		}
	};

	return (
		<>
			<div className={styles.formContainer}>
				{inscriptionFormField.map((field) => (
					<TextInput
						key={field}
						label={i18n.t(`Login.${field}`)}
						placeholder={i18n.t(`Login.placeholder`)}
						onChange={(e: any) => handleChange(field, e.currentTarget.value)}
						value={(form as any)[field] ?? ""}
						type={field === "password" ? "password" : "text"}
					/>
				))}
			</div>
			{error && <p className={styles.errorText}>{error}</p>}
			<div className={styles.footer}>
				<p onClick={switchToConnection} className={styles.footerText}>
					{i18n.t(`Login.alreadyRegistered`)}
				</p>
				<Button onClick={handleRegister} label={i18n.t(`Login.register`)} />
			</div>
		</>
	);
};

export default InscriptionForm;
