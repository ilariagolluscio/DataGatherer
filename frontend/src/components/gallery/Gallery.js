import ImageBox from "./ImageBox";
import {useQuery} from "@tanstack/react-query";
import fetchProjects from "../../queries/fetchProjects";
import fetchImages from "../../queries/fetchImages";


const Gallery = ({prjId}) => {

    const endpoint = `/storage_api/images/?project=${prjId}`

    const { data, isError, error, isSuccess, isFetching} = useQuery({
        queryKey: ['get_scenario', {endpoint}],
        queryFn: () => fetchImages(prjId),
    });

    if (isFetching) return(
        <div>
            Caricamento...
        </div>
    )

    if (isError) return(
        <div>
            Errore! {error.message}
        </div>
    )

    if (isSuccess) return(
        <div>
            <div className={"my-1"}>
                Nel progetto ci sono {data.length} immagini.
            </div>

            <div className={"d-flex flex-wrap"}>
                {
                    data.map((child, i) => (
                        <ImageBox
                            key={i}
                            userId={child.userId}
                            imageFileUrl={child.image_file_url}
                            isDataGathered={child.isDataGathered}
                            imgId={child.id}
                            is_similar_to_user_id={child.is_similar_to_user_id}
                        />
                    ))
                }
            </div>

        </div>
    )

}

export default Gallery