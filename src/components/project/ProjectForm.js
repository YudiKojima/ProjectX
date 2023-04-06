import { useEffect, useState } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import Submit from "../form/Submit";
import Date from "../form/Date";
import SobreInput from "../form/SobreInput";

import styles from "./ProjectForm.module.css";

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const submit = (e) => {
        e.preventDefault();
        //console.log(project);
        handleSubmit(project);
    };

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
        console.log(project);
    }

    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o Nome do Projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ""}
            />
            <Input
                type="number"
                text="Orçamento Total"
                name="orcamento"
                placeholder="Insira o Orçamento Total"
                handleOnChange={handleChange}
                value={project.orcamento ? project.orcamento : ""}
            />
            <Select
                name="category_id"
                text="Selecione a Categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ""}
            />
            <Date
                type="date"
                text="Insira a Data Atual"
                name="date"
                handleOnChange={handleChange}
                value={project.date ? project.date : ""}
            />
            <SobreInput
                type="text"
                text="Comente um Pouco Sobre o Projeto"
                name="sobre"
                placeholder="Insira Observações Para Detalhar Melhor o Planejamento"
                handleOnChange={handleChange}
                value={project.sobre ? project.sobre : ""}
                rows="5"
            />
            <Submit text={btnText} />
        </form>
    );
}

export default ProjectForm;
