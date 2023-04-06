import styles from "./Home.module.css";
import savings from "../../img/savings.svg";
import LinkButton from "../layout/LinkButton";

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>
                Seja bem-vindo ao <span>ProjectX</span>
            </h1>
            <p>
                O site que irá te ajudar a organizar, planejar e monitorar seu
                Projeto! Experimente agora mesmo...
            </p>
            <LinkButton to="/newproject" text="Criar Projeto" />
            <img src={savings} alt="Project" />
        </section>
    );
}

export default Home;
