import Link from "next/link";
import React from "react";

import i18n from "i18next";

import ActivityItem from "@/components/ActivityItem";
import TextInput from "@/components/TextInput";

import Activity from "@/types/Activity";
import capitalize from "@/utils/capitalize";
import getQueryParams from "@/utils/getQueryParams";

import { IoIosArrowBack } from "react-icons/io";

import styles from "@/styles/pages/Activities.module.css";

const activitiesList: Activity[] = [
	{
		id: "acti-id-1",
		userId: "user-id-1",
		type: "hiking",
		city: "paris",
		price: 840.99,
		description: "i love hiking",
		club: "Hiking Big Club",
	},
	{
		id: "acti-id-2",
		userId: "user-id-2",
		type: "bike",
		city: "marseille",
		price: 99.99,
		description: "i love marseille",
	},
	{
		id: "acti-id-3",
		userId: "user-id-3",
		type: "surf",
		city: "paris",
		price: 170,
		club: "Surf your life",
	},
	{
		id: "acti-id-11",
		userId: "user-id-1",
		type: "hiking",
		city: "paris",
		price: 840.99,
		description: "i love hiking",
		club: "Hiking Big Club",
	},
	{
		id: "acti-id-21",
		userId: "user-id-2",
		type: "bike",
		city: "marseille",
		price: 99.99,
		description: "i love marseille",
	},
	{
		id: "acti-id-31",
		userId: "user-id-3",
		type: "surf",
		city: "paris",
		price: 170,
		club: "Surf your life",
	},
	{
		id: "acti-id-12",
		userId: "user-id-1",
		type: "hiking",
		city: "paris",
		price: 840.99,
		description: "i love hiking",
		club: "Hiking Big Club",
	},
	{
		id: "acti-id-22",
		userId: "user-id-2",
		type: "bike",
		city: "marseille",
		price: 99.99,
		description: "i love marseille",
	},
	{
		id: "acti-id-32",
		userId: "user-id-3",
		type: "surf",
		city: "paris",
		price: 170,
		club: "Surf your life",
	},
];

const Activities = () => {
	const [props, setProps] = React.useState({
		filter: "bike",
		filterType: "activity",
	});

	const { filter, filterType } = props;

	React.useEffect(() => {
		setProps(getQueryParams(window.location.search));
	}, []);

	return (
		<div className={styles.activities}>
			<div className={styles.leftPart}>
				<Link
					href={"javascript:history.back()"}
					className={styles.returnButton}
				>
					<>
						<IoIosArrowBack className={styles.returnIcon} />
						{capitalize(
							filterType === "activity"
								? i18n.t(`Discover.${filter}.title`)
								: filter
						)}
					</>
				</Link>
				<div className={styles.filtersContainer}>
					<TextInput
						icon="location"
						placeholder={i18n.t(`Activities.filter.searchLocation`) ?? ""}
						onChange={() => {}}
						value={""}
					/>
					<TextInput
						icon="euros"
						placeholder={i18n.t(`Activities.filter.price`) ?? ""}
						onChange={() => {}}
						value={""}
					/>
				</div>
			</div>
			<div className={styles.activitiesContainer}>
				{activitiesList.map((activity) => (
					<ActivityItem key={activity.id} activity={activity} />
				))}
			</div>
		</div>
	);
};

export default Activities;
