import Gallery from "../components/gallery/Gallery";
import {useDispatch} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {defaultBaseUrl} from "../global_vars";
import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteProject} from "../queries/deleteProject";
import {deleteImage} from "../queries/deleteImage";
import fetchProject from "../queries/fetchProject";

const ProjectOverviewPage = () => {
    const [searchParams] = useSearchParams();
    const prjId = searchParams.get("id");
    const prjName = searchParams.get("name");

    const baseUrl = process.env.REACT_APP_API_URL || defaultBaseUrl
    const uploadUrl = baseUrl + "/fx_api/up/upload/"

    const {data: projectData, isSuccess, isFetching} = useQuery({
        queryFn: () => fetchProject(prjId),
        retry: 1
    })


    if (isFetching){
        return <div>
            Caricamento dati progetto...
        </div>
    }

    const analyzeNextImageButtonUrl = `/gather?img_id=${projectData.next_image_to_analyze}`

    return (
        <div>
            <div className={"mx-3 h1"}>
                Progetto {projectData.name}
            </div>

            <div className={"m-3 d-flex"}>
                {!projectData.are_all_images_analyzed ?
                    <a href={analyzeNextImageButtonUrl} className="btn btn-primary">
                        Raccogli dati dalle immagini non valutate
                    </a>
                    : <></>
                }
            </div>

            <div className={"w-100 p-4"}>
                <Gallery prjId={prjId}/>
            </div>


        </div>
    )
}

export default ProjectOverviewPage