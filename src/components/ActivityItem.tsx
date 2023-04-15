import Image from "next/image";

import i18n from "i18next";

import Activity from "@/types/Activity";
import capitalize from "@/utils/capitalize";
import getActivityImage from "@/utils/getActivityImage";

import styles from "@/styles/components/ActivityItem.module.css";

const ActivityItem = ({ activity }: { activity: Activity }) => {
	return (
		<div className={styles.activityItem}>
			<Image
				src={getActivityImage("activity-square")}
				alt={`Picture of activity (${activity.id})`}
				width={200}
			/>
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
		</div>
	);
};

export default ActivityItem;
