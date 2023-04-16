"use client";

import PropTypes from "prop-types";
import * as React from "react";

import { useApi } from "./ApiContextProvider";

const CitiesContext = React.createContext();

/**
 * This context provider allows to manage Oauth & connection state
 */
const CitiesContextProvider = ({ children }) => {
	const { api } = useApi();

	const [cities, setCities] = React.useState([]);

	const getCities = React.useCallback(async () => {
		try {
			const allCities = await api(`/cities`, "get");
			if (!allCities?.data) setCities([]);

			setCities(allCities.data);
		} catch (e) {
			setCities([]);
		}
	}, [api]);

	React.useEffect(() => {
		getCities();
	}, [getCities]);

	const value = { cities, getCities };

	return (
		<CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
	);
};

CitiesContextProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export const useCities = () => React.useContext(CitiesContext);

export default CitiesContextProvider;
