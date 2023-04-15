"use client";

import PropTypes from "prop-types";
import * as React from "react";

import { useApi } from "./ApiContextProvider";
import { useOauth } from "./OauthContextProvider";

const ActivitiesContext = React.createContext();

/**
 * This context provider allows to manage Oauth & connection state
 */
const ActivitiesContextProvider = ({ children }) => {
	const { api } = useApi();
	const { userId } = useOauth();

	const [userActivities, setUserActivities] = React.useState([]);

	const createActivity = React.useCallback(
		async (activity) => {
			try {
				const newActivity = await api(`/activities`, "post", {
					...activity,
					userId,
				});
				if (!newActivity?.data) return false;

				setUserActivities((oldActivities) => [
					...oldActivities,
					newActivity.data,
				]);

				return true;
			} catch (e) {
				return false;
			}
		},
		[api, userId]
	);

	const getActivities = React.useCallback(
		async ({ filter, filterType }) => {
			try {
				const allActivities = await api(
					`/activities?filterType=${filterType}&filter=${filter}`,
					"get"
				);
				if (!allActivities?.data) return [];

				return allActivities.data;
			} catch (e) {
				return [];
			}
		},
		[api]
	);

	React.useEffect(() => {
		if (userId)
			getActivities({ filter: userId, filterType: "userId" }).then(
				(activities) => setUserActivities(activities)
			);
	}, [getActivities, userId]);

	const value = { userActivities, createActivity, getActivities };

	return (
		<ActivitiesContext.Provider value={value}>
			{children}
		</ActivitiesContext.Provider>
	);
};

ActivitiesContextProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export const useActivities = () => React.useContext(ActivitiesContext);

export default ActivitiesContextProvider;
