import styles from "./SobreInput.module.css";

function SobreInput({
    type,
    text,
    name,
    placeholder,
    handleOnChange,
    value,
    rows,
}) {
    return (
        <div className={styles.sobre_control}>
            <label htmlFor={name}>{text}:</label>
            <textarea
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                rows={rows}
            />
        </div>
    );
}

export default SobreInput;
