import Link from "next/link";
import React from "react";

import i18n from "i18next";

import ActivityItem from "@/components/ActivityItem";
import TextInput from "@/components/TextInput";

import Activity from "@/types/Activity";
import capitalize from "@/utils/capitalize";
import getQueryParams from "@/utils/getQueryParams";
import { useActivities } from "@/contexts/ActivitiesContextProvider";

import { IoIosArrowBack } from "react-icons/io";

import styles from "@/styles/pages/Activities.module.css";

const Activities = () => {
	const { getActivities } = useActivities();

	const [filter, setFilter] = React.useState();
	const [filterType, setFilterType] = React.useState();
	const [activitiesList, setActivitiesList] = React.useState<Activity[]>([]);

	const getActivitiesFiltered = React.useCallback(
		async () => setActivitiesList(await getActivities({ filter, filterType })),
		[getActivities, filter, filterType]
	);

	React.useEffect(() => {
		const queryParams = getQueryParams(window.location.search);
		setFilter(queryParams?.filter);
		setFilterType(queryParams?.filterType);
	}, []);

	React.useEffect(() => {
		if (filter && filterType) {
			getActivitiesFiltered();
		}
	}, [filter, filterType, getActivitiesFiltered]);

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
							filterType === "type"
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
