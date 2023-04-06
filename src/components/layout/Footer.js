import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <a href="https://github.com/YudiKojima">
                        <FaGithub />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/yuudi.m/">
                        <FaInstagram />
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/marcosyudikojima/">
                        <FaLinkedin />
                    </a>
                </li>
            </ul>
            <p className={styles.copy_right}>
                <span>YudiKojima</span> &copy; 2023
            </p>
        </footer>
    );
}

export default Footer;
