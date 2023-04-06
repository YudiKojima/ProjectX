import styles from "./Date.module.css";

function Date({ type, text, name, handleOnChange, value }) {
    return (
        <div className={styles.date_control}>
            <label htmlFor={name}>{text}:</label>
            <input
                type={type}
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    );
}

export default Date;
