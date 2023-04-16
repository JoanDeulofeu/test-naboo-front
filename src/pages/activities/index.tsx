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

interface PageFilters {
	type: string;
	city: string;
	maxPrice?: number;
}

const Activities = () => {
	const { getActivities } = useActivities();

	const [filter, setFilter] = React.useState();
	const [filterType, setFilterType] = React.useState();
	const [activitiesList, setActivitiesList] = React.useState<Activity[]>([]);
	const [activitiesFiltered, setActivitiesFiltered] = React.useState<
		Activity[]
	>([]);
	const [pageFilters, setPageFilters] = React.useState<PageFilters>({
		type: "",
		city: "",
	});

	const getActivitiesFiltered = React.useCallback(async () => {
		let result = [...activitiesList];

		if (pageFilters.type !== "" && filterType !== "type") {
			result = result.filter(
				(activity) =>
					activity?.type.search(pageFilters.type.toLocaleLowerCase()) !== -1
			);
		}
		if (pageFilters.city !== "" && filterType !== "city") {
			result = result.filter(
				(activity) =>
					activity?.city.search(pageFilters.city.toLocaleLowerCase()) !== -1
			);
		}
		if (pageFilters?.maxPrice && pageFilters?.maxPrice > 0) {
			result = result.filter(
				(activity) =>
					pageFilters?.maxPrice && activity?.price < pageFilters?.maxPrice
			);
		}

		setActivitiesFiltered(result);
	}, [filterType, pageFilters, activitiesList]);

	const getActivitiesList = React.useCallback(
		async () => setActivitiesList(await getActivities({ filter, filterType })),
		[getActivities, filter, filterType]
	);

	const handleChange = (field: string, value: string | number | undefined) => {
		setPageFilters((oldFilters) => ({ ...oldFilters, [field]: value }));
	};

	// Get page filter
	React.useEffect(() => {
		const queryParams = getQueryParams(window.location.search);
		setFilter(queryParams?.filter);
		setFilterType(queryParams?.filterType);
	}, []);

	// Get activities on database, filtered page filter
	React.useEffect(() => {
		if (filter && filterType) {
			getActivitiesList();
		}
	}, [filter, filterType, getActivitiesList]);

	// Filter activities by filter
	React.useEffect(() => {
		getActivitiesFiltered();
	}, [activitiesList, pageFilters, getActivitiesFiltered]);

	// Prevents maxPrice from being a negative number
	React.useEffect(() => {
		if (pageFilters?.maxPrice && pageFilters?.maxPrice < 1)
			handleChange("maxPrice", 1);
	}, [pageFilters]);

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
					{filterType === "city" ? (
						<TextInput
							icon="activity"
							placeholder={i18n.t(`Activities.filter.searchActivity`) ?? ""}
							onChange={(e: any) => handleChange("type", e.currentTarget.value)}
							value={pageFilters.type}
						/>
					) : (
						<TextInput
							icon="location"
							placeholder={i18n.t(`Activities.filter.searchLocation`) ?? ""}
							onChange={(e: any) => handleChange("city", e.currentTarget.value)}
							value={pageFilters.city}
						/>
					)}
					<TextInput
						icon="euros"
						placeholder={i18n.t(`Activities.filter.price`) ?? ""}
						onChange={(e: any) =>
							handleChange("maxPrice", e.currentTarget.value)
						}
						type="number"
						value={pageFilters.maxPrice}
					/>
				</div>
			</div>
			<div className={styles.activitiesContainer}>
				{activitiesFiltered.map((activity) => (
					<ActivityItem key={activity.id} activity={activity} />
				))}
				{activitiesFiltered.length === 0 && (
					<p className={styles.noActivityText}>
						{filterType === "city"
							? `${i18n.t(`Activities.noActivityFoundCity`)} ${capitalize(
									filter
							  )}`
							: `${i18n.t("Activities.noActivityFound.part1")} ${i18n.t(
									`Discover.${filter}.title`
							  )} ${i18n.t("Activities.noActivityFound.part2")}`}
					</p>
				)}
			</div>
		</div>
	);
};

export default Activities;
