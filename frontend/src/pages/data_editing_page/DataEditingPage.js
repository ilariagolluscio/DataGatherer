import SingleImgAnalysisLayout from "../../layouts/single_image_analysis_layout/SingleImgAnalysisLayout";
import ReactCrop from "react-image-crop";
import bolletta from "../bolletta.jpeg";
import ImageAnalysisCard from "../../components/analysis/ImageAnalysisCard";
import Card from "../../components/generic/Card";
import DataAnalysisCard from "../../components/analysis/DataAnalysisCard";
import {useSearchParams} from "react-router-dom";
import {defaultBaseUrl} from "../../global_vars";
import {useMutation, useQuery} from "@tanstack/react-query";
import fetchImageData from "../../queries/fetchImageData";
import fetchImageCropData from "../../queries/fetchImageCropData";
import {useRef, useState} from "react";
import {createProject} from "../../queries/createProject";
import {saveReviewedData} from "../../queries/saveReviewedData";
import {extendNetworkFromImage} from "../../queries/extendNetworkFromImage";


const DataEditingPage = () => {

    const [searchParams] = useSearchParams();
    const usernameTARef = useRef(null);
    const hashtagTARef = useRef(null);
    const [userCropId, setUserCropId] = useState(null)
    const [hashtagCropId, setHashtagCropId] = useState(null)
    const imageId = searchParams.get("img_id");
    const [hasDataBeenSaved, setHasDataBeenSaved] = useState(false)


    const { data: imgData, error, isFetching} = useQuery({
        queryKey: ['get_scenario', imageId],
        queryFn: () => (fetchImageData(imageId))
    });

    const {mutate: saveReviewedDataMutation} = useMutation({
        mutationFn: saveReviewedData,
        retry: 1,
        onSuccess: () => {
            alert("Dati salvati con successo!")
            setHasDataBeenSaved(true)
        },
        onError: (error) => alert("Errore! " + error.message)
    })

    const {mutate: structureDataMutation} = useMutation({
        mutationFn: extendNetworkFromImage,
        retry: 1,
        onSuccess: () => {
            window.location.href = `/structure?img_id=${imageId}`
        },
        onError: (error) => {
            console.log(error)
            alert("Errore nella creazione dei dati strutturati: " + JSON.stringify(error.body))
        }
    })

    const handleForward = () => {
        structureDataMutation({targetImage: imageId})
    }

    const handleSaveData = () => {
        if (usernameTARef.current.value === ""){
            alert("Non è possibile continuare se non è definito un nome utente!")
            return
        }

        if (!hashtagTARef.current.value.includes('#')){
            alert("Non è possibile continuare se non sono definiti hashtags!")
            return
        }

        saveReviewedDataMutation({
            "usernameImgCrop": userCropId,
            "hashtagImgCrop": hashtagCropId,
            "usernameReviewedText": usernameTARef.current.value,
            "hashtagReviewedText": hashtagTARef.current.value
        })
    }



    if (error) {
        return (
            <div>
                Error! {error.message}
            </div>
        )
    }

    if (isFetching){
        return (
            <div>
                Caricamento...
            </div>
        )
    }


    const baseUrl = process.env.REACT_APP_API_URL || defaultBaseUrl
    const imgUrl = baseUrl + imgData.image_file_url

    return (
        <SingleImgAnalysisLayout

            imageUserId={1}

            leftChildren={
                <div className={"w-100 h-100"}>
                    <img
                        className={"w-100 h-100 object-fit-contain"}
                        src={imgUrl}
                        alt={"Immagine in analisi"}
                    />
                </div>
            }

            rightChildren={
                <div>

                    <DataAnalysisCard
                        title={"Username"}
                        alreadyExists={false}
                        imgId={imageId}
                        textAreaRef={usernameTARef}
                        setCropId={setUserCropId}
                        rows={4}
                    />

                    <DataAnalysisCard
                        title={"Hashtags"}
                        rows={10}
                        imgId={imageId}
                        textAreaRef={hashtagTARef}
                        setCropId={setHashtagCropId}
                        infoText={"Tutti gli hashtags verranno creati a lettere minuscole e la " +
                            "punteggiatura, all'interno o alla fine degli hashtags " +
                            "(!\"#$%&'()*+, -./:;<=>?@[\\]^_`{|}~) non verrà considerata"}
                    />

                </div>
            }


            bottomChildren={
                <div className={"d-flex justify-content-center h-100 align-items-center bg-dark-subtle w-100"}>
                    <button style={{width: "20vw"}} className={"btn btn-primary my-2 mx-2"}
                        onClick={handleSaveData}
                    >
                        Salva Dati
                    </button>
                    <button disabled={!hasDataBeenSaved} style={{width: "20vw"}} className={"btn btn-primary my-2 mx-2"}
                            onClick={handleForward}
                    >
                        Prosegui
                    </button>
                </div>
            }
        />
    )
}

export default DataEditingPage