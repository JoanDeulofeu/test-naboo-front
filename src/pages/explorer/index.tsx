import Image from "next/image";
import Link from "next/link";

import i18n from "i18next";

import capitalize from "@/utils/capitalize";
import getCityImage from "@/utils/getCityImage";

import styles from "@/styles/pages/Explorer.module.css";

const cities = ["paris", "lyon", "marseille", "montpellier"]; //TODO request

const ExplorerItem = ({ city }: { city: string }) => {
	return (
		<Link
			href={{
				pathname: "activities",
				query: {
					filter: city,
					filterType: "city",
				},
			}}
			className={styles.cityItem}
		>
			<Image
				src={getCityImage(city)}
				alt={`Picture of ${city}`}
				className={styles.cityImage}
				priority
			/>
			<p className={styles.cityTitle}>{capitalize(city)}</p>
			<p className={styles.cityDescription}>
				{city === "paris" || city === "lyon"
					? i18n.t(`City.Description.${city}`)
					: i18n.t(`City.Description.default`)}
			</p>
		</Link>
	);
};

const Explorer = () => {
	return (
		<div className={styles.explorerPage}>
			<div className={styles.explorer}>
				<p className={styles.explorerTitle}>{i18n.t(`City.title`)}</p>
				<div className={styles.cityContainer}>
					{cities.map((city) => {
						return <ExplorerItem key={city} city={city} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default Explorer;
