import { parse, v4 as uuidv4 } from "uuid";

import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function Project() {
    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data);
                    setServices(data.services);
                })
                .catch((err) => console.log);
        }, 300);
    }, [id]);

    function editPost(project) {
        setMessage("");

        if (project.orcamento < project.cost) {
            setMessage(
                "O Orçamento não pode ser menor que o cursto do projeto"
            );
            setType("error");
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setShowProjectForm(false);
                setMessage("Projeto Atualizado!");
                setType("success");
            })
            .catch((err) => console.log(err));
    }

    function createService() {
        setMessage("");
        // last service
        const lastService = project.services[project.services.length - 1];

        lastService.id = uuidv4();

        const lasteServiceCost = lastService.cost;

        const newCost = parseFloat(project.cost) + parseFloat(lasteServiceCost);
        if (newCost > parseFloat(project.orcamento)) {
            setMessage(
                "Orçamento ultrapassado, verifique o valor do serviço!!"
            );
            setType("error");
            project.services.pop();
            return false;
        }

        // add service cost to project total cost
        project.cost = newCost;
        // update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setServices(data.services);
                setShowServiceForm(false);
                setMessage("Serviço criado com sucesso!");
                setType("success");
            })
            .catch((err) => console.log(err));
    }

    function removeService(id, cost) {
        setMessage("");

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        );

        const projectUpdated = project;

        projectUpdated.services = servicesUpdated;
        projectUpdated.cost =
            parseFloat(projectUpdated.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectUpdated),
        })
            .then((resp) => resp.json)
            .then((data) => {
                setProject(projectUpdated);
                setServices(servicesUpdated);
                setMessage("Serviço removido com sucesso!");
                setType("error");
            })
            .catch((err) => console.log(err));
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_datails}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button
                                className={styles.btn}
                                onClick={toggleProjectForm}
                            >
                                {!showProjectForm ? "Editar Projeto" : "Fechar"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Nome:</span> {project.name}
                                    </p>
                                    <p>
                                        <span>Categoria:</span>{" "}
                                        {project.category.name}
                                    </p>
                                    <p>
                                        <span>Data:</span> {project.date}
                                    </p>
                                    <p>
                                        <span>Sobre:</span> {project.sobre}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R$
                                        {project.orcamento}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R$
                                        {project.cost}
                                    </p>
                                    <p>
                                        <span>Orçamento Restante:</span> R$
                                        {project.orcamento - project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir edição"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um seriviço:</h2>
                            <button
                                className={styles.btn}
                                onClick={toggleServiceForm}
                            >
                                {!showServiceForm
                                    ? "Adicionar Serviço"
                                    : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviço</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))}
                            {services.length === 0 && (
                                <p>Não há serviçõs cadastrados.</p>
                            )}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Project;
