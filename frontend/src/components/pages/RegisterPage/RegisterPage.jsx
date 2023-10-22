import React, { useState, useEffect } from "react";
import styles from "./RegisterPage.module.scss";
import { useForm } from "react-hook-form";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../../redux";
import { useSelector } from "react-redux";

const RegisterPage = () => {
	const [registerUser, { error }] = useRegisterUserMutation();
	const navigate = useNavigate();
	const isAuth = useSelector((state) => state.auth.isAuth);
	const [emailIsBusy, setEmailIsBusy] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (isAuth) navigate('/profile');
	}, [isAuth])

	const onSubmit = (data) => {
		const user = {
			firstName: data.name,
			email: data.email,
			password: data.password,
			lastName: "aa",
			patronomic: "aa",
		};

		console.log(user);

		registerUser(user)
			.then((data) => {
				if ((data.message = "Error: Email is already in use!")) {
					setEmailIsBusy(true);
				}
				console.log(data);
			})
			.catch((er) => {
				console.log(er);
			});
	};
	// console.log(errors);

	return (
		<>
			<Header />
			<main className={styles.auth}>
				<div className={styles.auth__inner}>
					<h2>Регистрация в Наш Футбол!</h2>
					<form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
						<div>
							<input type="text" placeholder="Введите имя" {...register("name", { required: true, maxLength: 100 })} />
							{errors?.name?.type === "required" && <p className={styles.auth__warning}>Введите ваше имя!</p>}
						</div>
						<div>
							<input type="email" placeholder="Введите email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
							{errors?.email?.type === "required" && <p className={styles.auth__warning}>Введите вашу почту!</p>}
						</div>
						<div>
							<input type="password" placeholder="Придумайте пароль" {...register("password", { required: true, minLength: 6, maxLength: 12 })} />
							{errors?.password?.type === "required" && <p className={styles.auth__warning}>Придумайте пароль!</p>}
						</div>
						{emailIsBusy && <p className={styles.auth__warning}>Emai уже занят!</p>}
						<div className={styles.auth__bottom}>
							<button type="submit">Далее</button>
							<Link to={"/auth"}>У меня уже есть аккаунт</Link>
						</div>
					</form>
					{/* <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
						<div>
							<input type="text" placeholder="Введите код из письма" {...register("code", { required: true, maxLength: 100 })} />
							{errors?.code?.type === "required" && <p className={styles.auth__warning}>Введите код!</p>}
						</div>
						<div className={styles.auth__bottom}>
							<button type="submit">Завершить регистрацию</button>
						</div>
					</form> */}
				</div>
			</main>
			<Footer />
		</>
	);
};

export default RegisterPage;
