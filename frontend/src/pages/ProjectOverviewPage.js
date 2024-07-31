import Gallery from "../components/gallery/Gallery";
import {useDispatch} from "react-redux";

const ProjectOverviewPage = () => {

    return (
        <div>
            <div className={"h1"}>
                Project Name
            </div>

            <div className={"m-3"}>
                Nel progetto ci sono 39 immagini.
            </div>

            <div className={"m-3 d-flex"}>
                <a href="#" className="btn btn-primary mx-1">Carica immagini</a>
                <a href="#" className="btn btn-primary">Raccogli dati dalle immagini non valutate</a>
            </div>

            <div className={"w-100 p-4"}>
                <Gallery/>
            </div>


        </div>
    )
}

export default ProjectOverviewPage