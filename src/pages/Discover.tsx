import Image from "next/image";

import i18n from "i18next";

import activities from "@/utils/activities";
import getActivityImage from "@/utils/getActivityImage";

import styles from "@/styles/pages/Home.module.css";

const DiscoverItem = ({ activity }: { activity: string }) => {
	return (
		<div className={styles.activityItem}>
			<Image
				src={getActivityImage(activity)}
				alt={`Picture of ${activity}`}
				width={360}
			/>
			<p className={styles.activityTitle}>
				{i18n.t(`Discover.${activity}.title`)}
			</p>
			<p className={styles.activityDescription}>
				{i18n.t(`Discover.${activity}.description`)}
			</p>
		</div>
	);
};

const Discover = () => {
	return (
		<div className={styles.discover}>
			<p className={styles.discoverTitle}>{i18n.t(`DiscoverActivity`)}</p>
			<div className={styles.activityContainer}>
				{activities.map((activity) => {
					return <DiscoverItem key={activity} activity={activity} />;
				})}
			</div>
		</div>
	);
};

export default Discover;
