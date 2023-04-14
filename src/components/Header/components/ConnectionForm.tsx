import React from "react";

import i18n from "i18next";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { useOauth } from "@/contexts/OauthContextProvider";

import styles from "@/styles/components/Header/Form.module.css";

interface ConnectionFormProps {
	switchToInscription: () => void;
	onClose: () => void;
}

interface Form {
	email: string;
	password: string;
}

const connectionFormField = ["email", "password"];

const ConnectionForm = ({
	switchToInscription,
	onClose,
}: ConnectionFormProps) => {
	const { signIn } = useOauth();

	const [form, setForm] = React.useState<Form>({
		email: "",
		password: "",
	});
	const [error, setError] = React.useState<string | undefined | null>();

	const handleChange = (field: string, value: string) => {
		setError(undefined);
		setForm((oldForm) => ({ ...oldForm, [field]: value }));
	};

	const handleSignIn = () => {
		if (Object.values(form).includes("")) setError(i18n.t(`Login.formError`));
		else {
			signIn(form).then((isLogged: boolean) => {
				if (isLogged) onClose();
				else setError(i18n.t(`Login.signInError`));
			});
		}
	};

	return (
		<>
			<div className={styles.formContainer}>
				{connectionFormField.map((field) => (
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
				<p onClick={switchToInscription} className={styles.footerText}>
					{i18n.t(`Login.notRegistered`)}
				</p>
				<Button onClick={handleSignIn} label={i18n.t(`Login.connect`)} />
			</div>
		</>
	);
};

export default ConnectionForm;
