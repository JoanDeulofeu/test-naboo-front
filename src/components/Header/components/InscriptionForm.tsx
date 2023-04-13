import React from "react";

import i18n from "i18next";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

import styles from "@/styles/components/Header/Form.module.css";

interface InscriptionFormProps {
	switchToConnection: () => void;
}

const InscriptionForm = ({ switchToConnection }: InscriptionFormProps) => {
	return (
		<>
			<div className={styles.formContainer}>
				<TextInput
					label={i18n.t(`Login.firstName`)}
					placeholder={i18n.t(`Login.placeholder`)}
				/>
				<TextInput
					label={i18n.t(`Login.lastName`)}
					placeholder={i18n.t(`Login.placeholder`)}
				/>
				<TextInput
					label={i18n.t(`Login.email`)}
					placeholder={i18n.t(`Login.placeholder`)}
				/>
				<TextInput
					label={i18n.t(`Login.password`)}
					placeholder={i18n.t(`Login.placeholder`)}
				/>
			</div>
			<div className={styles.footer}>
				<p onClick={switchToConnection} className={styles.footerText}>
					{i18n.t(`Login.alreadyRegistered`)}
				</p>
				<Button
					onClick={() => console.log("test")}
					label={i18n.t(`Login.register`)}
				/>
			</div>
		</>
	);
};

export default InscriptionForm;
