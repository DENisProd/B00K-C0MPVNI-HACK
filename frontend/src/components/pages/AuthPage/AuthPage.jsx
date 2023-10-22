import React, {useEffect} from "react";
import styles from "../RegisterPage/RegisterPage.module.scss";
import { useForm } from "react-hook-form";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../../../redux/authSlice";
import { setUserData } from "../../../redux/authSlice";

const AuthPage = () => {
	const [loginUser, result] = useLoginUserMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuth = useSelector((state) => state.auth.isAuth);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		// if (isAuth) navigate('/profile');
	}, [isAuth])

	const onSubmit = (data) => {
		const user = {
			email: data.email,
			password: data.password,
		};

		loginUser(user).then((res) => {
			console.log(res.error);

			if (res.error) {
				console.log("Неверный логин или пароль!");
			} else {
				console.log(res.data);
				navigate("/");
				localStorage.setItem("token", res.data.token);
				dispatch(setIsAuth(true));
				dispatch(setUserData(res.data));
			}
		});
	};

	return (
		<>
			<Header />
			<main className={styles.auth}>
				<div className={styles.auth__inner}>
					<h2>Вход в Наш Футбол!</h2>
					<form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
						<div>
							<input type="text" placeholder="Введите email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
							{errors?.email?.type === "required" && <p className={styles.auth__warning}>Введите вашу почту!</p>}
						</div>
						<div>
							<input type="password" placeholder="Введите ваш пароль" {...register("password", { required: true, minLength: 2, maxLength: 20 })} />
							{errors?.password?.type === "required" && <p className={styles.auth__warning}>Введите ваш пароль!</p>}
						</div>
						<div className={`${styles.auth__bottom} ${styles.auth__bottomAuth}`}>
							<button type="submit">Войти</button>
							<Link to={"/register"}>У меня нет аккаунта</Link>
						</div>
					</form>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default AuthPage;
