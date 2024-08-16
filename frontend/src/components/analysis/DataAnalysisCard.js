import Card from "../generic/Card";
import {useMutation, useQuery} from "@tanstack/react-query";
import fetchRecognizedTextFromImage from "../../queries/fetchRecognizedTextFromImage";
import {useRef, useState} from "react";
import HotButton from "../hotstuff/HotButton";
import {createImgData} from "../../queries/createImgData";
import {fetchImageData} from "../../queries/fetchImageData";

const DataAnalysisCard = ({title, rows, imgId, infoText, btnRef, setParentSuccess}) => {
    const [content, setContent] = useState("")
    const [isSuccess, setIsSuccess] = useState(0)


    const {error: imgDataError, isSuccess: isImageDataSuccess} = useQuery({
        queryKey: [`imgDataFetching_${title}`],
        queryFn: async () => {
            const res = await fetchImageData({
                imgId,
                fieldName: title
            })
            setContent(res)
            return res
        }
    })


    const {data: recognizedText, error, isFetching} = useQuery({
        queryKey: [`fetchImageCropData_${title}`],
        queryFn: async () => {
            const res = await fetchRecognizedTextFromImage(imgId, title)
            if (!content) setContent(res)
            return res
        },
        retry: 1,
        enabled: !!isImageDataSuccess
    })


    const {mutate: performSave} = useMutation({
        queryKey: [`createData_${title}`],

        mutationFn: () => createImgData({
            fieldName: title,
            value: content,
            imgId
        }),

        onSuccess: () => {
            setIsSuccess(1)
            setTimeout(() => setIsSuccess(0), 1500)
            setParentSuccess(true)
        },

        onError: (err) => {
            alert(`Error: ${err}`)
        }
    })


    if (error) {
        return <div>
            Err: {error.error}
        </div>
    }

    if (imgDataError) {
        return <div>
            Img Data Error: {imgDataError.error}
        </div>
    }

    if (isFetching) {
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
                        rows={rows}
                    />
                </div>

                <div className={'h5'}>
                    Testo finale su cui fare l'analisi
                </div>

                <div className={"mx-1"}>
                    <textarea
                        className={"w-100 font-monospace"}
                        placeholder={"Testo su cui fare le analisi..."}
                        value={content}
                        rows={rows}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>

                <div className={'mx-1 d-flex'}>
                    <HotButton
                        className={`btn ${isSuccess === 1 ? 'btn-success' : 'btn-primary'}`}
                        uniqueHotKeyId={`save_data_${title}`}
                        onClick={performSave}
                        btnRef={btnRef}
                    >
                        Salva dato {title}
                    </HotButton>

                </div>
            </Card>
        </div>
    )
}

export default DataAnalysisCard