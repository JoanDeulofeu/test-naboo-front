import Link from "next/link";

import { BsEmojiWink } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

import i18n from "i18next";

import styles from "@/styles/components/Header.module.css";

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.leftPart}>
				<BsEmojiWink className={styles.leftEmoji} />
				{i18n.t(`Candidator`)}
			</div>
			<div className={styles.rightPart}>
				<Link className={styles.rightLink} href="http://localhost:3000">
					{i18n.t(`DiscoverActivity`)}
				</Link>
				<Link
					className={styles.rightLink}
					href="http://localhost:3000/explorer"
				>
					{i18n.t(`Explorer`)}
				</Link>
				<MdAccountCircle className={styles.rightEmoji} />
			</div>
		</div>
	);
};

export default Header;
