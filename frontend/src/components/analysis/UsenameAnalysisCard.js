import Card from "../generic/Card";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import fetchIGUser from "../../queries/fetchUserHashtagUses";
import HotButton from "../hotstuff/HotButton";
import {patchDefaultCrop} from "../../queries/patchDefaultCrop";
import {patchAlias} from "../../queries/patchAlias";

const UsernameAnalysisCard = ({imgId}) => {
    const [content, setContent] = useState('Caricamento...')
    const [isCreatedByThisImage, setIsCreatedByThisImage] = useState(false)
    const [alias, setAlias] = useState('')
    const [userId, setUserId] = useState(null)

    const {data: rawFetchData, isError, isSuccess} = useQuery({
        queryKey: [`fetchImageCropData_${imgId}`],
        queryFn: () => fetchIGUser(imgId),
        retry: 1,
    })

    const {mutate: setAliasMutation} = useMutation({
        queryKey: ['setAlias'],
        mutationFn: () => patchAlias({
            alias: alias,
            id: userId
        }),
        retry: 1,
        onSuccess: () => alert(`L'alias ${alias} è stato associato all'utente!`),
        onError: () => alert('Errore nell\'impostazione dell\'alias')
    })

    const {mutate: removeAliasMutation} = useMutation({
        queryKey: ['removeAlias'],
        mutationFn: () => patchAlias({
            alias: null,
            id: userId
        }),
        retry: 1,
        onSuccess: () => alert(`L'alias è stato rimosso`),
        onError: () => alert('Errore nella rimozione dell\'alias')
    })
    
    useEffect(() => {
        if (!rawFetchData) return
        if (rawFetchData.length === 0) {
            alert('Dal post non è stato creato nessun utente o non è stato salvato alcun hashtag! Di conseguenza, non sono stati salvati dati! ' +
                'Si prega di effettuare nuovamente l\'analisi dell\'immagine')
            window.location.href = `/edit?img_id=${imgId}`

        }
        const fetchData = rawFetchData[0].igUser

        setContent(fetchData.name)
        setAlias(fetchData.alias)
        setUserId(fetchData.id)
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

    const handleSetAlias = () => {
        setAliasMutation()
    }

    const handleRemoveAlias = () => {
        setAlias('')
        removeAliasMutation()
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