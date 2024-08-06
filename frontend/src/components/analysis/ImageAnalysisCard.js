import {useEffect, useRef, useState} from "react";
import {canvasPreview} from "../../CanvasPreview";
import Card from "../generic/Card";
import {useMutation, useQuery} from "@tanstack/react-query";
import fetchImageCropData from "../../queries/fetchImageCropData";
import {createProject} from "../../queries/createProject";
import {createImageCrop} from "../../queries/createImageCrop";
import {current} from "@reduxjs/toolkit";
import {setDefaultCrop} from "../../queries/setDefaultCrop";
import {deleteImage} from "../../queries/deleteImage";
import {doDefaultCrop} from "../../queries/doDefaultCrop";
import HotButton from "../hotstuff/HotButton";


const loadCrop = (cropData, imgRef, setRecognizedValue, previewCanvasRef) => {
    if (!cropData) return
    if(imgRef.current === null) return
    if(previewCanvasRef.current === null) return

    setRecognizedValue(cropData?.recognizedText)
    const obj = {
        y: (cropData.topPercent * 0.01) * imgRef.current.offsetHeight,
        x: (cropData.leftPercent * 0.01) * imgRef.current.offsetWidth,
        height: (cropData.heightPercent * 0.01) * imgRef.current.height,
        width: (cropData.widthPercent * 0.01) * imgRef.current.width,
    }

    canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        obj,
    )
}


const CompletedCanvas = ({previewCanvasRef}) => {
    return (
        <div className={"w-100 h-100"}>
            <canvas
                ref={previewCanvasRef}
                style={{
                    objectFit: 'contain',
                    width: "100%",
                    height: "100%"
                }}
            />
        </div>
    )
}




const ImageAnalysisCard = ({
                               vhHeight,
                               title,
                               completedCrop,
                               setIsCropEnabled,
                               imgRef,
                               setCrop,
                               imgId,
                               percentCrop
                           }) => {


    const previewCanvasRef = useRef(null);
    const [recognizedValue, setRecognizedValue] = useState("")
    const [cropId, setCropId] = useState(null)

    const {data: rawCropData, error, isFetching, isSuccess} = useQuery({
        queryKey: [`fetchImageCropData_${title}`],
        queryFn: () => fetchImageCropData(imgId, title),
        retry: 1,
    })

    const {mutate: createMutate} = useMutation({
        queryKey: ['createImageCrop'],
        mutationFn: createImageCrop,
        retry: 1,
        onSuccess: (data) => {
            setRecognizedValue(data.recognizedText)
            setCropId(data.id)
        },
        onError: (error) => alert("Errore nella creazione del ritaglio!" + error.message)
    })



    const {mutate: defaultCropMutate} = useMutation({
        queryKey: ['useDefaultCrops'],
        mutationFn: () => doDefaultCrop({
            fieldName: title,
            targetImage: imgId
        }),
        retry: 1,
        onSuccess: (data) => {
            setRecognizedValue(data.recognizedText)
            setCropId(data.id)
            loadCrop(data, imgRef, setRecognizedValue, previewCanvasRef)
        },
        onError: (error) => alert("Errore nell'utilizzo del ritaglio di default. Prova" +
            "a creare un nuovo ritaglio e poi impostarlo come ritaglio di default.")
    })

    const {mutate: setDefaultMutate} = useMutation({
        queryKey: ['setDefault'],
        mutationFn: () => setDefaultCrop(cropId),
        retry: 1,
        onSuccess: () => alert('Ritaglio impostato come default!'),
        onError: () => alert('Errore nell\'impostazione del ritaglio')
    })

    useEffect(() => {
        if (!Array.isArray(rawCropData)) return
        if (rawCropData.length === 0) return

        loadCrop(rawCropData[0], imgRef, setRecognizedValue, previewCanvasRef)
    }, [isSuccess]);

    const handleSaveCrop = () => {
        if (imgRef.current === null) return
        if (completedCrop === null) return

        canvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            completedCrop,
        )
        setIsCropEnabled(false)
        setCrop(null)

        createMutate({
            "fieldName": title,
            "leftPercent": percentCrop.x,
            "topPercent": percentCrop.y,
            "heightPercent": percentCrop.height,
            "widthPercent": percentCrop.width,
            "recognizedText": "",
            "image": imgId
        })
    }


    if (error) {
        alert(`Errore nel caricamento del campo ${title}: ${error.message}`)
        return (
            <div>
                Errore!
            </div>
        )
    }

    if (isFetching) {
        return (
            <div>
                Caricamento dati...
            </div>
        )
    }


    vhHeight = vhHeight || "15vh"

    return (
        <div className={"my-3"}>
            <Card title={title}  >
                <div style={{height: vhHeight}}
                     className={"w-100 d-flex justify-content-center p-3 border border-black"}>
                    <CompletedCanvas
                        previewCanvasRef={previewCanvasRef}/>

                </div>

                <div className={"w-100 h-100 d-flex"}>
                    <div>
                        <HotButton
                            uniqueHotKeyId={`set_default_${title}`}
                            className={"btn btn-primary my-2 mx-2"}
                            onClick={defaultCropMutate}
                        >
                            Usa il ritaglio di default
                        </HotButton>
                    </div>

                    <div>
                        <HotButton
                            className={"btn btn-primary my-2 mx-2"}
                            onClick={() => setIsCropEnabled(true)}
                            uniqueHotKeyId={`begin_crop_${title}`}
                        >
                            Inizia il ritaglio immagine
                        </HotButton>
                    </div>
                    <div>
                        <HotButton
                            uniqueHotKeyId={`finish_crop_${title}`}
                            className={"btn btn-primary my-2 mx-2"}
                            onClick={handleSaveCrop}
                        >
                            Concludi ritaglio immagine
                        </HotButton>
                    </div>
                    {
                        completedCrop ?
                            <div>
                                <button

                                    className={"btn btn-primary my-2 mx-2"}
                                    onClick={setDefaultMutate}
                                >
                                    Salva il taglio come default
                                </button>
                            </div>
                            : <></>
                    }


                </div>
                <div className={"mx-1"}>
                    <textarea
                        id={title}
                        className={"w-100 font-monospace"}
                        placeholder={"Testo riconosciuto"}
                        rows={5}
                        value={recognizedValue}
                        disabled={true}
                        onChange={(e) => setRecognizedValue(e.target.value)}
                    />
                </div>
            </Card>
        </div>
    )
}

export default ImageAnalysisCard