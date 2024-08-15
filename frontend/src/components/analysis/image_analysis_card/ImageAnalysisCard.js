import {useRef, useState} from "react";
import {canvasPreview} from "./canvasPreview";
import Card from "../../generic/Card";
import {useMutation, useQuery} from "@tanstack/react-query";
import {createImageCrop} from "../../../queries/createImageCrop";
import {patchDefaultCrop} from "../../../queries/patchDefaultCrop";
import {doDefaultCrop} from "../../../queries/doDefaultCrop";
import HotButton from "../../hotstuff/HotButton";
import fetchImageCropAndLoadCrop from "../../../queries/fetchImageCropAndLoadCrop";





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
    const [recognizedValue, setRecognizedValue] = useState(null)
    const [cropId, setCropId] = useState(null)




    const {data: cropData, error, refetch: cropDataRefetch} = useQuery({
        queryKey: [`fetchImageCropData_${title}`],
        queryFn: () =>
            fetchImageCropAndLoadCrop(
                imgId,
                title,
                imgRef,
                previewCanvasRef
            ),
        retry: 1,
    })




    const {mutate: createMutate} = useMutation({
        queryKey: ['createImageCrop'],
        mutationFn: createImageCrop,
        retry: 1,
        onSuccess: (data) => cropDataRefetch(),
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
            /*loadCropFromServerData(data, imgRef, setRecognizedValue, previewCanvasRef)*/
        },
        onError: (error) => alert("Errore nell'utilizzo del ritaglio di default. Prova" +
            "a creare un nuovo ritaglio e poi impostarlo come ritaglio di default.")
    })




    const {mutate: setDefaultMutate} = useMutation({
        queryKey: ['setDefault'],
        mutationFn: () => patchDefaultCrop(cropId),
        retry: 1,
        onSuccess: () => alert('Ritaglio impostato come default!'),
        onError: () => alert('Errore nell\'impostazione del ritaglio')
    })





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
                        value={cropData?.recognizedText}
                        disabled={true}
                    />
                </div>
            </Card>
        </div>
    )
}

export default ImageAnalysisCard