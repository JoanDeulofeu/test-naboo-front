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

	const value = { userActivities, createActivity };

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
