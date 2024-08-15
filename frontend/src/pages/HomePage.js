import Card from "../components/generic/Card";
import {useMutation, useQuery} from "@tanstack/react-query";
import fetchProjects from "../queries/fetchProjects";
import {useNavigate} from "react-router-dom";
import {deleteProject} from "../queries/deleteProject";
import {createProject} from "../queries/createProject";
import {defaultBaseUrl} from "../global_vars";

const HomePage = () => {
    console.log(
        `url: ${process.env.REACT_APP_API_URL}`
    )

    console.log("efoiwrngwopirm")

    const { data: projects, error} = useQuery({
        queryKey: ['get_scenario'],
        queryFn: fetchProjects,
    });

    const {mutate: deleteMutate} = useMutation({
        mutationFn: deleteProject,
        retry: 1,
        onSuccess: () => window.location.reload(),
        onError: (error) => alert("Errore di connessione: " + error.message)
    })

    const {mutate: createMutate} = useMutation({
        mutationFn: createProject,
        retry: 1,
        onSuccess: () => window.location.reload(),
        onError: (error) => alert("Errore nella creazione!" + error.message)
    })

    const handleCreate = () => {
        let name = prompt("Nome del progetto?")
        createMutate({name})
    }

    const handleDelete = (id) => {
        if (!window.confirm('Si è sicuri di voler cancellare il progetto?')) return
        deleteMutate({id})
    };


    const EnterButton = ({id, name}) => (
        <a href={`/prj?id=${id}&name=${name}`} className="btn btn-primary m-2">
            Entra
        </a>
    )

    const DeleteButton = ({id}) => (
        <a onClick={() => {
            handleDelete(id)}
        } className="btn btn-danger m-2">Elimina</a>
    )

    const baseUrl = process.env.REACT_APP_API_URL || defaultBaseUrl
    const uploadUrl = baseUrl + "/fx_api/up/upload/"
    const adminUrl = baseUrl + '/admin/'


    if (error) return(
        <div>
            Errore! {error.message}
        </div>
    )

    return (
        <div>
            <div className={"h1 mx-5"}>
                Progetti
            </div>

            <div className={'d-flex flex-wrap m-5'}>

                <div className={"m-2"}>
                    <a href="#" className="btn btn-success" onClick={handleCreate}>Crea nuovo progetto</a>
                </div>

                <div className={"m-2"}>
                    <a href={uploadUrl} className="btn btn-primary mx-1">Carica immagini in un progetto</a>
                </div>

                <div className={"m-2"}>
                    <a href={adminUrl} className="btn btn-primary mx-1">Apri pannello di controllo entità (username: admin, password: admin)</a>
                </div>

            </div>



            {
                projects ? projects.map((child, i) => (
                    <div key={i}>
                        <div className={"m-5 w-75"}>
                            <Card title={child.name} rightAlignObjArray={[
                                <EnterButton id={child.id} name={child.name}/>,
                                <DeleteButton id={child.id}/>
                            ]}/>
                        </div>
                    </div>
                )) : <></>
            }


        </div>
    )
}

export default HomePage