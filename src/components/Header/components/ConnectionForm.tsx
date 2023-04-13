import React from "react";

import i18n from "i18next";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

import styles from "@/styles/components/Header/Form.module.css";

interface ConnectionFormProps {
	switchToInscription: () => void;
}

const ConnectionForm = ({ switchToInscription }: ConnectionFormProps) => {
	return (
		<>
			<div className={styles.formContainer}>
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
				<p onClick={switchToInscription} className={styles.footerText}>
					{i18n.t(`Login.notRegistered`)}
				</p>
				<Button
					onClick={() => console.log("test")}
					label={i18n.t(`Login.connect`)}
				/>
			</div>
		</>
	);
};

export default ConnectionForm;
