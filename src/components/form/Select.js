import styles from "./Select.module.css";

function Select({ text, name, options, handleOnChange, value }) {
    return (
        <div className={styles.select_control}>
            <label htmlFor={name}>{text}:</label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ""}
            >
                <option>Selecione Uma Opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
