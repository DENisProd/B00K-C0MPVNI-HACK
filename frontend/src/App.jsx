import React, { useEffect, useState } from "react";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import TeamPage from "./components/pages/TeamPage/TeamPage";
import CreateTeamPage from "./components/pages/CreateTeamPage/CreateTeamPage";
import CreateTournamentPage from "./components/pages/CreateTournamentPage/CreateTournamentPage";
import TournamentPage from "./components/pages/TournamentPage/TournamentPage";
import DetailTournament from "./components/pages/DetailTournament/DetailTournament";
import { useDispatch, useSelector } from "react-redux";
import { useGetAuthMutation } from "./redux";
import axios from "axios";
import { setUserData, setIsAuth } from "./redux/authSlice";

const routerAuth = [
	{
		path: "/",
		element: <ProfilePage />,
		errorElement: <Navigate to="/" replace />,
	},
	{
		path: "/teams",
		element: <TeamPage />,
	},
	{
		path: "/teams/createTeam",
		element: <CreateTeamPage />,
	},
	{
		path: "/tournament",
		element: <TournamentPage />,
	},
	{
		path: "/tournament/:tournamentId",
		element: <DetailTournament />,
	},
	{
		path: "/tournaments/createTournament",
		element: <CreateTournamentPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/auth",
		element: <AuthPage />,
	},
];

const routerNotAuth = [
	{
		path: "/",
		element: <Navigate to="/register" replace />,
		errorElement: <Navigate to="/register" replace />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/auth",
		element: <AuthPage />,
	},
];

const App = () => {
	// const [isAuth, setIsAuth] = useState(true);
	const isAuth = useSelector((state) => state.auth.isAuth);
	const data = useSelector((state) => state.auth.data);

	const [getAuth, result] = useGetAuthMutation();
	const dispatch = useDispatch()

	// console.log(isAuth);

	// console.log(data);

	useEffect(() => {
		// if (isAuth) window.location.href = '/profile';
	}, [isAuth])

	useEffect(() => {
		if (!isAuth) {
			getAuth()
				.then((res) => {
					console.log(res)
					// if (res.status === 200) {
						// console.log(res.status)
						dispatch(setIsAuth(true));
						dispatch(setUserData(res.data));
					// } else {
						// console.log(res.status);
					// }
				})
				.catch(() => {
					console.log('catch');
					// if (!window.location.href.includes('auth') && !window.location.href.includes('register')) {
					// 	window.location.href = "/auth";
					// }
				});
		}
	}, [isAuth, dispatch, getAuth]);

	// const router = createBrowserRouter(isAuth ? routerAuth : routerNotAuth);
	const router = createBrowserRouter(routerAuth);
	return (
		<>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
};

export default App;
