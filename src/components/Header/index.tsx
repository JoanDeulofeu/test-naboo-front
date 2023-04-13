import Link from "next/link";
import React from "react";

import { BsEmojiWink } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

import i18n from "i18next";

import Modal from "@/components/Modal";
import InscriptionForm from "./components/InscriptionForm";
import ConnectionForm from "./components/ConnectionForm";

import styles from "@/styles/components/Header/Header.module.css";

const Header = () => {
	const [connectionModalIsOpen, setConnectionModalIsOpen] = React.useState<
		string | undefined
	>();
	const [headerConnectionModalIsOpen, setHeaderConnectionModalIsOpen] =
		React.useState<boolean>(false);

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
				{headerConnectionModalIsOpen && (
					<div className={styles.connectionModal}>
						<p
							onClick={() => setConnectionModalIsOpen("Inscription")}
							className={styles.inscription}
						>
							{i18n.t(`Login.Inscription`)}
						</p>
						<p
							onClick={() => setConnectionModalIsOpen("Connection")}
							className={styles.connection}
						>
							{i18n.t(`Login.Connection`)}
						</p>
					</div>
				)}
				<MdAccountCircle
					onClick={() => setHeaderConnectionModalIsOpen((e) => !e)}
					className={styles.rightEmoji}
				/>
			</div>
			{connectionModalIsOpen && (
				<Modal
					title={i18n.t(`Login.${connectionModalIsOpen}`)}
					onClose={() => setConnectionModalIsOpen(undefined)}
				>
					{connectionModalIsOpen === "Inscription" && (
						<InscriptionForm
							switchToConnection={() => setConnectionModalIsOpen("Connection")}
						/>
					)}
					{connectionModalIsOpen === "Connection" && (
						<ConnectionForm
							switchToInscription={() =>
								setConnectionModalIsOpen("Inscription")
							}
						/>
					)}
				</Modal>
			)}
		</div>
	);
};

export default Header;
