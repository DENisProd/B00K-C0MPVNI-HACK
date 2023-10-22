import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import styles from "./ProfilePage.module.scss";
import "../../../index.scss";
import { useSelector } from "react-redux";

const ProfilePage = () => {
	const [name, setName] = useState("Андрей Браун");
	const [styleShoot, setStyleShoot] = useState("");
	const [homeTable, setHomeTable] = useState("");
	const userData = useSelector((state) => state.auth.data);

	useEffect(() => {
		if (userData) {
			setName(userData.lastName);
		}
	}, [userData])

	return (
		<>
			<Header></Header>
			<main className={styles.profile}>
				<div className="container">
					<div className={styles.profile__inner}>
						<h2>Профиль ID {userData?.userId}</h2>
						<div className={styles.profile__main}>
							<h3>Основное</h3>
							<div className={styles.profile__top}>
								<h5>Загрузка аватара</h5>
								<div className={styles.profile__topContent}>
									<div className={styles.profile__topAvatar}>
										<img src="" alt="" />
										<div>
											<span>Загрузить фото</span>
											<span>Удалить фото</span>
										</div>
									</div>
									<div>
										<h5>Отображаемое имя</h5>
										<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
									</div>
								</div>
							</div>
							<div className={styles.profile__mid}>
								<h5>Дополнительные сведенья</h5>
								<div>
									<input type="text" placeholder="Стиль стрельбы" value={styleShoot} onChange={(e) => setStyleShoot(e.target.value)} />
									<input type="text" placeholder="Домашний стол" value={homeTable} onChange={(e) => setHomeTable(e.target.value)} />
								</div>
							</div>
							<div className={styles.profile__bot}>
								<button>Сохранить</button>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer></Footer>
		</>
	);
};

export default ProfilePage;
