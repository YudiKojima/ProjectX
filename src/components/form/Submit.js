import styles from "./Submit.module.css";

function Submit({ text }) {
    return (
        <div>
            <button className={styles.submit_control}>{text}</button>
        </div>
    );
}

export default Submit;
