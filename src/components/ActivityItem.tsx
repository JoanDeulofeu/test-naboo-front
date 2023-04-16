import Image from "next/image";
import React from "react";

import i18n from "i18next";

import Activity from "@/types/Activity";
import capitalize from "@/utils/capitalize";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import getActivityImage from "@/utils/getActivityImage";

import styles from "@/styles/components/ActivityItem.module.css";

const ActivityInformation = (activity: Activity) => {
	return (
		<div className={styles.ActivityInformationsContainer}>
			<p className={styles.activityText}>{`${i18n.t(
				`Activities.type`
			)} : ${capitalize(activity.type)}`}</p>
			<p className={styles.activityText}>{`${i18n.t(
				`Activities.city`
			)} : ${capitalize(activity.city)}`}</p>
			<p className={styles.activityText}>{`${i18n.t(`Activities.club`)} : ${
				activity.club
					? capitalize(activity.club)
					: i18n.t(`Activities.notSupplied`)
			}`}</p>
			<p className={styles.activityText}>
				{`${i18n.t(`Activities.description`)} : ${
					activity.description
						? capitalize(activity.description)
						: i18n.t(`Activities.notSupplied`)
				}`}
			</p>
			<p className={styles.activityText}>{`${i18n.t(`Activities.price`)} : ${
				activity.price
			} €`}</p>
		</div>
	);
};

const ActivityItem = ({ activity }: { activity: Activity }) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	return (
		<div className={styles.activityItem}>
			<Image
				src={getActivityImage("activity-square")}
				alt={`Picture of activity (${activity.id})`}
				width={200}
			/>
			{ActivityInformation(activity)}
			<Button
				onClick={() => setIsOpen(true)}
				variant="secondary"
				label={i18n.t(`Activities.seeMore`)}
			/>
			{isOpen && (
				<Modal
					image={getActivityImage("activity")}
					onClose={() => setIsOpen(false)}
				>
					<div className={styles.modalInformationContainer}>
						{ActivityInformation(activity)}
					</div>
				</Modal>
			)}
		</div>
	);
};

export default ActivityItem;
