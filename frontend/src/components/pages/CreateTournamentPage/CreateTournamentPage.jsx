import React from "react";
import styles from "./CreateTournamentPage.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { useForm } from "react-hook-form";
import teamIcon from "../../../assets/images/team2.jpg";
import "../../../index.scss";

const CreateTournamentPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => console.log(data);
	console.log(errors);

	return (
		<>
			<Header></Header>
			<main className={styles.createTournament}>
				<div className="container">
					<div className={styles.createTournament__inner}>
						<h2>Создание турнира</h2>
						<form onSubmit={handleSubmit(onSubmit)} className={styles.createTournament__form}>
							<div className={styles.createTournament__main}>
								<h5>Основное</h5>
								<div className={styles.createTournament__mainContent}>
									<div className={styles.createTournament__photo}>
										<img src={""} alt="" />
										<div className={styles.createTournament__photoBtns}>
											<span>Загрузить логотип</span>
											<span>Удалить логотип</span>
										</div>
									</div>
									<div>
										<input type="text" placeholder="Название турнира" {...register("tournamentName", { required: true, maxLength: 100 })} />
										{errors?.tournamentName?.type === "required" && <p className={styles.createTournament__warning}>Укажите название турнира!</p>}
									</div>
								</div>
							</div>
							<div className={styles.createTournament__dop}>
								<h5>Дополнительные сведенья</h5>
								<div className={styles.createTournament__dopContent}>
									<div>
										<input type="text" placeholder="Стиль стрельбы" {...register("styleShoot", { required: true, maxLength: 100 })} />
										{errors?.styleShoot?.type === "required" && <p className={styles.createTournament__warning}>Укажите стиль стрельбы!</p>}
									</div>
									<div>
										<input type="text" placeholder="Домашний стол" {...register("homeTable", { required: true, maxLength: 100 })} />
										{errors?.homeTable?.type === "required" && <p className={styles.createTournament__warning}>Укажите домашний стол!</p>}
									</div>
								</div>
								<div className={styles.createTournament__dopBottom}>
									<input type="text" placeholder="Дата проведения" {...register("date", { required: true, maxLength: 100 })} />
									{errors?.date?.type === "required" && <p className={styles.createTournament__warning}>Укажите дату проведения!</p>}
								</div>
							</div>
							<div className={styles.createTournament__structure}>
								<h5>Выбор команд</h5>
								<div className={styles.createTournament__structureContent}>
									<div>
										<input type="text" placeholder="Выберите команду #1" {...register("command1", { required: true, maxLength: 100 })} />
										{errors?.command1?.type === "required" && <p className={styles.createTournament__warning}>Укажите первую команду!</p>}
									</div>
									<div>
										<input type="text" placeholder="Выберите команду #2" {...register("command2", { required: true, maxLength: 100 })} />
										{errors?.command2?.type === "required" && <p className={styles.createTournament__warning}>Укажите вторую команду!</p>}
									</div>
								</div>
							</div>
							<div className={styles.createTournament__bottom}>
								<button type="submit">Создать турнир</button>
							</div>
						</form>
					</div>
				</div>
			</main>
			<Footer></Footer>
		</>
	);
};

export default CreateTournamentPage;
