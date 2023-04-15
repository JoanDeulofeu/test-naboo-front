import Image from "next/image";
import React from "react";

import i18n from "i18next";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import ActivityItem from "@/components/ActivityItem";
import Activity from "@/types/Activity";
import getActivityImage from "@/utils/getActivityImage";
import CreateActivityForm from "./components/CreateActivityForm";
import { useUser } from "@/contexts/UserContextProvider";
import { useActivities } from "@/contexts/ActivitiesContextProvider";

import styles from "@/styles/pages/Account.module.css";

const Account = () => {
	const { user } = useUser();
	const {
		createActivity,
		userActivities,
	}: {
		createActivity: (form: any) => Promise<boolean>;
		userActivities: Activity[];
	} = useActivities();

	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	return (
		<div className={styles.accountPage}>
			<div className={styles.account}>
				<p className={styles.accountTitle}>
					{user
						? `${user.firstName} ${user.lastName} - ${i18n.t("Account.title")}`
						: `${i18n.t("Account.title")}`}
				</p>
				<div className={styles.activitiesContainer}>
					{userActivities.length === 0 && (
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
					{userActivities.map((activity) => {
						return <ActivityItem key={activity.id} activity={activity} />;
					})}
				</div>
				{userActivities.length !== 0 && (
					<Button
						onClick={() => setIsOpen(true)}
						label={i18n.t(`Account.createActivity`)}
					/>
				)}
			</div>
			{isOpen && (
				<Modal
					title={i18n.t(`Account.createActivity`)}
					onClose={() => setIsOpen(false)}
				>
					<CreateActivityForm
						onClose={() => setIsOpen(false)}
						createActivity={createActivity}
					/>
				</Modal>
			)}
		</div>
	);
};

export default Account;
