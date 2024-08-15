import Card from "../generic/Card";
import {useQuery} from "@tanstack/react-query";
import fetchRecognizedTextFromImage from "../../queries/fetchRecognizedTextFromImage";
import {useState} from "react";

const DataAnalysisCard = ({title, rows, imgId, textAreaRef, setCropId, infoText}) => {
    const [content, setContent] = useState("")


    const {recognizedText, error, isFetching} = useQuery({
        queryKey: [`fetchImageCropData_${title}`],
        queryFn: () => fetchRecognizedTextFromImage(imgId, title),
        retry: 1,
    })

    if (error){
        return <div>
            Err: {error.error}
        </div>
    }

    if (isFetching){
        return (
            <div>
                Caricamento...
            </div>
        )
    }

    return (
        <div className={"my-1"}>
            <Card title={title}>
                {
                    infoText ?
                        <div className={'my-3'}>{infoText}</div> : <></>
                }
                <div className={'h5'}>
                    Testo riconosciuto dall'immagine
                </div>
                <div className={"mx-1"}>
                    <textarea
                        className={"w-100 font-monospace"}
                        placeholder={"Testo riconosciuto..."}
                        value={recognizedText}
                        disabled={true}
                        ref={textAreaRef}
                        rows={rows}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>

                <div className={'h5'}>
                    Testo finale su cui fare l'analisi
                </div>

                <div className={"mx-1"}>
                    <textarea
                        className={"w-100 font-monospace"}
                        placeholder={"Testo riconosciuto..."}
                        value={content}
                        ref={textAreaRef}
                        rows={rows}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
            </Card>
        </div>
    )
}

export default DataAnalysisCard