import Card from "../generic/Card";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import fetchIGUser from "../../queries/fetchUserHashtagUses";

const UsernameAnalysisCard = ({imgId}) => {
    const [content, setContent] = useState('Caricamento...')
    const [objId, setObjId] = useState('')
    const [isCreatedByThisImage, setIsCreatedByThisImage] = useState(false)

    const {data: rawFetchData, isError, isSuccess} = useQuery({
        queryKey: [`fetchImageCropData_${imgId}`],
        queryFn: () => fetchIGUser(imgId),
        retry: 1,
    })
    
    useEffect(() => {
        if (!rawFetchData) return
        if (rawFetchData.length === 0) {
            alert('Dal post non è stato creato nessun utente o non è stato salvato alcun hashtag! Di conseguenza, non sono stati salvati dati! ' +
                'Si prega di effettuare nuovamente l\'analisi dell\'immagine')
            window.location.href = `/edit?img_id=${imgId}`

        }
        const fetchData = rawFetchData[0].igUser

        setObjId(fetchData.id)
        setContent(fetchData.name)
        setIsCreatedByThisImage(
            fetchData.createdFromImage == imgId
        )

    }, [isSuccess]);


    if (isError) {
        return(
            <div>
                ERRORRE!!!!!
            </div>
        )
    }



    return (
        <div className={"my-1"}>
            <Card title={"Instagram User"}>
                <div className={"mx-1"}>
                    <input
                        disabled={true}
                        className={"w-100 font-monospace"}
                        placeholder={"Testo riconosciuto..."}
                        value={`'${content}'`}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
                {
                    isCreatedByThisImage ?
                        <div className={"p-2 m-2 alert alert-warning"}>
                            Questo utente è stato creato da questa immagine.
                        </div>
                        : <></>
                }
            </Card>
        </div>
    )
}

export default UsernameAnalysisCard