import Card from "../generic/Card";
import {useQuery} from "@tanstack/react-query";
import fetchImageCropData from "../../queries/fetchImageCropData";
import {useEffect, useState} from "react";

const DataAnalysisCard = ({title, alreadyExists, rows, imgId, textAreaRef, setCropId, infoText}) => {
    rows = rows || 1
    const [content, setContent] = useState("")


    const {data: rawCropData} = useQuery({
        queryKey: [`fetchImageCropData_${title}`],
        queryFn: () => fetchImageCropData(imgId, title),
        retry: 1,
    })

    useEffect(() => {
        if (!rawCropData) return
        if (rawCropData.length === 0) return
        const cropData = rawCropData[0]

        setCropId(cropData.id)

        if (cropData.reviewedText !== "" && cropData.reviewedText){
            setContent(cropData.reviewedText)
            return
        }
        setContent(cropData.recognizedText)

    }, [rawCropData]);

    return (
        <div className={"my-1"}>
            <Card title={title}>
                {
                    infoText ?
                        <div className={'my-3'}>{infoText}</div> : <></>
                }
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