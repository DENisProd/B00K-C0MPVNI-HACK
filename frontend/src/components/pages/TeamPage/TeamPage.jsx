import React, { useState, useEffect } from "react";
import "../../../index.scss";
import styles from "./TeamPage.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { TeamCard } from "./TeamCard";
import searchIcon from "../../../assets/images/search.svg";
import { Link } from "react-router-dom";
import axios from 'axios'

const TeamPage = () => {
	const [allTeams, setAllTeams] = useState([])
	const [myTeams, setMyTeams] = useState([])

	useEffect(() => {
		axios.get('https://dev.darksecrets.ru/api/teams/', { headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		  }}).then(res => {
			setAllTeams(res.data)
		  })

		  
	}, [])

	return (
		<>
			<Header />
			<main className={styles.team}>
				<div className="container">
					<div className={styles.team__inner}>
						<div className={styles.team__panel}>
							<h2>Мои команды</h2>
							<div className={styles.team__panelRight}>
								<button>
									<img src={searchIcon} alt="" />
								</button>
								<Link to={"/teams/createTeam"}>Зарегистрировать команду</Link>
							</div>
						</div>
						<div className={styles.team__list}>
							<TeamCard></TeamCard>
							<TeamCard></TeamCard>
						</div>
						<div className={styles.team__panel}>
							<h2>Все команды</h2>
						</div>
						<div className={styles.team__list}>
							{Array.isArray(allTeams) && allTeams.map(team =>
								<TeamCard team={team}/>
								)}
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default TeamPage;
