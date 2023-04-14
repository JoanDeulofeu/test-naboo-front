import Image from "next/image";
import React from "react";

import i18n from "i18next";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import getActivityImage from "@/utils/getActivityImage";
import CreateActivityForm from "./components/CreateActivityForm";

import styles from "@/styles/pages/Account.module.css";

const Account = () => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const [activities, setActivities] = React.useState([]);

	return (
		<div className={styles.accountPage}>
			<div className={styles.account}>
				<p className={styles.accountTitle}>{i18n.t(`Account.title`)}</p>
				<div className={styles.activitiesContainer}>
					{activities.length === 0 && (
						<div className={styles.noActivity}>
							<Image
								src={getActivityImage("noActivity")}
								alt={`Picture of noActivity`}
								className={styles.noActivityImage}
								priority
							/>
							<p className={styles.noActivityText}>
								{i18n.t(`Account.noActivity`)}
							</p>

							<Button
								onClick={() => setIsOpen(true)}
								label={i18n.t(`Account.createActivity`)}
							/>
						</div>
					)}
					{activities.map((city) => {
						// return <ExplorerItem key={city} city={city} />;
						return <></>;
					})}
				</div>
			</div>
			{isOpen && (
				<Modal
					title={i18n.t(`Account.createActivity`)}
					onClose={() => setIsOpen(false)}
				>
					<CreateActivityForm onClose={() => setIsOpen(false)} />
				</Modal>
			)}
		</div>
	);
};

export default Account;
