import React from "react";
import styles from "./TournamentBracket.module.scss";
import matchIcon from "../../assets/images/matchIcon.svg";

export const TournamentBracket = () => {
	return (
		<div className={styles.tournamentBracket}>
			<div className={styles.tournamentBracket__inner}>
				<div className={styles.stage}>
					<Event></Event>
					<Event></Event>
					<Event></Event>
					<Event></Event>
				</div>
				<div className={styles.stage2}>
					<Event></Event>
					<Event></Event>
				</div>
				<div className={styles.stage3}>
					<Event></Event>
				</div>
			</div>
		</div>
	);
};

const Match = () => {
	return (
		<div className={styles.match}>
			<div className={styles.match__left}>
				<img src={matchIcon} alt="" />
				<p>Россия</p>
			</div>
			<div className={styles.match__right}>L</div>
		</div>
	);
};

const Event = () => {
	return (
		<div className={styles.event}>
			<Match></Match>
			<Match></Match>
		</div>
	);
};
