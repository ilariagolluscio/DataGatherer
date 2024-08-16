import Gallery from "../../components/gallery/Gallery";
import {useParams, useSearchParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import fetchProject from "../../queries/fetchProject";
import {getBackupFile, getMatrixUrl, uploadUrl} from "../../api_router/fx_api";
import TitleTopButtonsContentLayout from "../../layouts/title_topbuttons_content_layout/TitleTopButtonsContentLayout";
import {gather_route} from "../data_gatering_page/DataGatheringPage";


export const overview_route =  (prjId) => `/prj/${prjId}/`


const GatherButtons = ({next_image_to_analyze, are_all_images_analyzed, prjId}) => (
    !are_all_images_analyzed ?
        <a href={gather_route(prjId, next_image_to_analyze)} className="btn btn-primary mx-1">
            Raccogli dati dalle immagini non valutate
        </a>
        :
        <></>
)




const ProjectOverviewPage = () => {

    const { prjId } = useParams();



    const {
        data: projectData,
        isFetching,
        error: fetchingError,
        refetch: projectDataRefetch
    } = useQuery({
        queryFn: () => fetchProject(prjId),
        retry: 1
    })


    if (isFetching) {
        return <div>
            Caricamento dati progetto...
        </div>
    }

    if (fetchingError){
        return <div>
            Errore: {fetchingError.message}
        </div>
    }

    return (
        <TitleTopButtonsContentLayout
            title={`Progetto ${projectData.name}`}

            topButtons={[
                <div className={"m-2"}>
                    <a href={'/'} className="btn btn-primary mx-1">Torna ai progetti</a>
                </div>,

                <div className={"m-2"}>
                    <a href={uploadUrl()} className="btn btn-primary mx-1">Carica immagini in un progetto</a>
                </div>,


                <div className={"m-2"}>
                    <a href={getMatrixUrl(prjId)} className="btn btn-primary mx-1">Scarica matrice formata</a>
                </div>,

                <div className={"m-2"}>
                    <a href={getBackupFile()} className="btn btn-primary mx-1">Scarica file di backup</a>
                </div>,

                <div className={'m-2'}>
                    <GatherButtons
                        prjId={prjId}
                        next_image_to_analyze={projectData.next_image_to_analyze}
                        are_all_images_analyzed={projectData.are_all_images_analyzed}
                    />
                </div>
            ]}

            content={
                <div>

                    <div className={'my-3 alert alert-info p-1'}>
                        Per assegnare tasti della tastiera ai tasti premibili, usare la combinazione ctrl+k su windows
                        e control+k su mac. E' una funzione sperimentale che crea problemi. Per eliminare tutte le
                        associazioni
                        tasto - tastiera, eliminare i cookies della pagina e ricaricare.
                    </div>

                    <Gallery prjDataRefetch={projectDataRefetch} prjId={prjId}/>

                </div>
            }
        />
    )
}


export default ProjectOverviewPage