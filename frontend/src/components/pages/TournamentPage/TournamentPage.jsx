import React, { useState } from "react";
import styles from "./TournamentPage.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "../../../index.scss";
import search from "../../../assets/images/search.svg";
import ball from "../../../assets/images/ball.png";
import { Link } from "react-router-dom";

const TournamentPage = () => {
	const [isVisible, setIsVisible] = useState(false);

	const [isPopupActive, setIsPopupActive] = useState(false);

	const [items, setItems] = useState([
		{
			name: "test",
			amountTeams: 1,
			date: new Date().getTime(),
		},
		{
			name: "test2",
			amountTeams: 2,
			date: new Date().getTime(),
		},
		{
			name: "test3",
			amountTeams: 3,
			date: new Date().getTime(),
		},
		{
			name: "test4",
			amountTeams: 4,
			date: new Date().getTime(),
		},
	]);

	return (
		<>
			<Header></Header>
			<main className={styles.tournament}>
				<div className="container">
					<div className={styles.tournament__inner}>
						<div className={styles.tournament__panel}>
							<h2>Актуальные чемпионаты</h2>
							<div className={styles.tournament__search}>
								<button
									onClick={() => {
										setIsVisible(!isVisible);
									}}>
									<img src={search} alt="Поиск" />
								</button>
								{isVisible && <input type="text" placeholder="поиск" />}
							</div>
						</div>
						<TournamentList items={items}></TournamentList>
					</div>
				</div>
			</main>
			{/* <TournamentPopup></TournamentPopup> */}
			<Footer></Footer>
		</>
	);
};

export const TournamentList = ({ items }) => {
	return (
		<div className={styles.table}>
			<div className={`${styles.table__row} ${styles.table__head}`}>
				<div data-bold="" className={styles.table__item}>
					Название чемпионата
				</div>
				<div data-bold="" data-center="" className={styles.table__item}>
					Количество команд
				</div>
				<div data-bold="" data-center="" className={styles.table__item}>
					Дата проведения
				</div>
				<div data-bold="" data-center="" className={styles.table__item}>
					Действие
				</div>
			</div>
			{items.map((e, i) => (
				<div key={i} className={`${styles.table__row} ${styles.table__body}`}>
					<div data-bold="" className={styles.table__item}>
						<img src={ball} />
						{e.name}
					</div>
					<div data-center="" className={styles.table__item}>
						{e.amountTeams}
					</div>
					<div data-center="" className={styles.table__item}>
						{new Date(e.date).toLocaleDateString()}
					</div>
					<div data-center="" className={styles.table__item}>
						<Link to={"/tournament/1"}>Подробнее</Link>
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

export const TournamentPopup = ({ isPopupActive, setIsPopupActive }) => {
	const [activeTab, setActiveTab] = useState("tab1");

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

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
		<div className={styles.tournamentPopup}>
			<div className={styles.tournamentPopup__inner}>
				<div className={styles.tournamentPopup__panel}>
					<div className={styles.tournamentPopup__panelLeft}>
						<img src={ball} alt="" />
						<h3>Супер крутой чемпионат</h3>
						<time>20.01.2024 — 27.01.2024</time>
						<p>8 команд</p>
					</div>
					<div className={styles.tournamentPopup__panelRight}>
						<button onClick={() => setIsPopupActive(false)}>Свернуть</button>
					</div>
				</div>
				<div className={styles.tournamentPopup__tabs}>
					<button onClick={() => handleTabClick("tab1")} className={activeTab === "tab1" ? styles.tournamentPopup__tabsActive : ""}>
						Турнирная таблица
					</button>
					<button onClick={() => handleTabClick("tab2")} className={activeTab === "tab2" ? styles.tournamentPopup__tabsActive : ""}>
						Последние игры
					</button>
					<button onClick={() => handleTabClick("tab3")} className={activeTab === "tab3" ? styles.tournamentPopup__tabsActive : ""}>
						Близжайшие игры
					</button>
				</div>
				<div className={styles.tournamentPopup__tabsContent}>
					{activeTab === "tab1" && <div>Содержимое таба 1</div>}
					{activeTab === "tab2" && <TournamentLastGame data={lastGames}></TournamentLastGame>}
					{activeTab === "tab3" && <div>Содержимое таба 3</div>}
				</div>
			</div>
		</div>
	);
};

export default TournamentPage;
