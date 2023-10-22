import React, { useState } from "react";
import styles from "./DetailTournament.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "../../../index.scss";
import ball from "../../../assets/images/ball.png";
import { TournamentBracket } from "../../TournamentBracket/TournamentBracket";

const DetailTournament = () => {
	const [lastGames, setLastGames] = useState([
		{
			team1: "team1",
			team2: "team2",
			date: new Date().toLocaleDateString(),
		},
		{
			team1: "team1",
			team2: "team2",
			date: new Date().toLocaleDateString(),
		},
		{
			team1: "team1",
			team2: "team2",
			date: new Date().toLocaleDateString(),
		},
		{
			team1: "team1",
			team2: "team2",
			date: new Date().toLocaleDateString(),
		},
		{
			team1: "team1",
			team2: "team2",
			date: new Date().toLocaleDateString(),
		},
	]);

	return (
		<>
			<Header></Header>
			<main className={styles.detailTournament}>
				<div className="container">
					<div className={styles.detailTournament__inner}>
						<div className={styles.detailTournament__panel}>
							<h1>Название турнира</h1>
							<div className={styles.detailTournament__status}>Статус: Opened</div>
						</div>
						<div>
							<h2>Последение игры</h2>
							<LastGames data={lastGames}></LastGames>
						</div>
						<TournamentBracket></TournamentBracket>
					</div>
				</div>
			</main>
			<Footer></Footer>
		</>
	);
};

export const LastGames = ({ data }) => {
	return (
		<div className={styles.table}>
			<div className={`${styles.table__rowLastGame} ${styles.table__head}`}>
				<div data-bold="" className={styles.table__item}>
					1 Команда
				</div>
				<div data-bold="" className={styles.table__item}></div>
				<div data-bold="" className={styles.table__item}>
					2 Команда
				</div>
				<div data-bold="" className={styles.table__item}>
					Победитель
				</div>
				<div data-bold="" data-right="" className={styles.table__item}>
					Дата проведения
				</div>
			</div>
			{data.map((e, i) => (
				<div key={i} className={`${styles.table__rowLastGame} ${styles.table__body}`}>
					<div data-bold="" className={styles.table__item}>
						<img src={ball} />
						{e.team1}
					</div>
					<div data-bold="" className={styles.table__item}>
						ПРОТИВ
					</div>
					<div data-bold="" className={styles.table__item}>
						<img src={ball} />
						{e.team2}
					</div>
					<div data-bold="" className={styles.table__item}>
						<img src={ball} />
						{e.team2}
					</div>
					<div data-right="" className={styles.table__item}>
						{e.date}
					</div>
				</div>
			))}
			<a href="#" className={styles.table__showMore}>
				{" "}
				Показать все
			</a>
		</div>
	);
};

export default DetailTournament;
