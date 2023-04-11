import Head from "next/head";

import Discover from "./Discover";

import styles from "@/styles/pages/Home.module.css";

const Home = () => {
	return (
		<>
			<Head>
				<title>Gehin - Candidator</title>
				<meta name="description" content="Tech test by Gehin Joan" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<Discover />
			</main>
		</>
	);
};

export default Home;
