import React from "react";
import styles from "./Footer.module.scss";
import "../../index.scss";
import logo from "../../assets/images/logo.svg";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className="container">
				<div className={styles.footer__inner}>
					<div className={styles.footer__logo}>
						<img src={logo} alt="" />
						<p>Наш Футбол!</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
