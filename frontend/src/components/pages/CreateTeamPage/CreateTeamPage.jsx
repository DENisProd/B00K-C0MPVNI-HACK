import React, {useState} from "react";
import styles from "./CreateTeamPage.module.scss";
import "../../../index.scss";
import { useForm } from "react-hook-form";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import teamIcon from "../../../assets/images/team2.jpg";
import axios from 'axios'
import logo from "../../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

const CreateTeamPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate()
	const [isTeamCreated, setIsTeamCreated] = useState(false)

	const onSubmit = (data) => {
		const _data = {
			name: data.teamName,
			image: "",
			homeTable: data.homeTable,
			shootStyle: data.styleShoot,
			user1: data.player1,
			user2: data.player2,
		}
		axios.post('https://dev.darksecrets.ru/api/teams/', _data, { headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		  }}).then(res => {
			setIsTeamCreated(true)
			setTimeout(() => {
				navigate('/teams')
			}, 1500)
		  }).catch(err => {
			setIsTeamCreated(false)
		  })
	}
	console.log(errors);

	return (
		<>
			<Header></Header>
			<main className={styles.createTeam}>
				<div className="container">
					<div className={styles.createTeam__inner}>
						<h2>Регистрация команды</h2>
						{isTeamCreated ?
						<div style={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
						}}>
							<img style={{
								width: '300px',
								height: '300px',
								margin: '10vh auto 2rem auto'
							}} src={logo}></img>
							<p>Команда создана</p>
						</div>
						:
						<form onSubmit={handleSubmit(onSubmit)} className={styles.createTeam__form}>
							<div className={styles.createTeam__main}>
								<h5>Основное</h5>
								<div className={styles.createTeam__mainContent}>
									<div className={styles.createTeam__photo}>
										<img src={teamIcon} alt="" />
										<div className={styles.createTeam__photoBtns}>
											<span>Загрузить фото</span>
											<span>Удалить фото</span>
										</div>
									</div>
									<div>
										<input type="text" placeholder="Название команды" {...register("teamName", { required: true, maxLength: 100 })} />
										{errors?.teamName?.type === "required" && <p className={styles.createTeam__warning}>Укажите название команды!</p>}
									</div>
								</div>
							</div>
							<div className={styles.createTeam__dop}>
								<h5>Дополнительные сведенья</h5>
								<div className={styles.createTeam__dopContent}>
									<div>
										<input type="text" placeholder="Стиль стрельбы" {...register("styleShoot", { required: true, maxLength: 100 })} />
										{errors?.styleShoot?.type === "required" && <p className={styles.createTeam__warning}>Укажите стиль стрельбы!</p>}
									</div>
									<div>
										<input type="text" placeholder="Домашний стол" {...register("homeTable", { required: true, maxLength: 100 })} />
										{errors?.homeTable?.type === "required" && <p className={styles.createTeam__warning}>Укажите домашний стол!</p>}
									</div>
								</div>
							</div>
							<div className={styles.createTeam__structure}>
								<h5>Состав команды</h5>
								<div className={styles.createTeam__structureContent}>
									<div>
										<input type="text" placeholder="Участник #1" {...register("player1", { required: true, maxLength: 100 })} />
										{errors?.player1?.type === "required" && <p className={styles.createTeam__warning}>Укажите первого участника!</p>}
									</div>
									<div>
										<input type="text" placeholder="Участник #2" {...register("player2", { required: true, maxLength: 100 })} />
										{errors?.player2?.type === "required" && <p className={styles.createTeam__warning}>Укажите второго участника!</p>}
									</div>
								</div>
							</div>
							<div className={styles.createTeam__bottom}>
								<button type="submit">Зарегистрировать команду</button>
							</div>
						</form>
						}
					</div>
				</div>
			</main>
			<Footer></Footer>
		</>
	);
};

export default CreateTeamPage;
