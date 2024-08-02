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


    const handleSaveData = () => {
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
                        rows={2}
                        textAreaRef={usernameTARef}
                        setCropId={setUserCropId}

                    />

                    <DataAnalysisCard
                        title={"Hashtags"}
                        rows={10}
                        imgId={imageId}
                        textAreaRef={hashtagTARef}
                        setCropId={setHashtagCropId}
                    />

                </div>
            }


            bottomChildren={
                <div className={"d-flex justify-content-center h-100 align-items-center bg-dark-subtle w-100"}>
                    <button style={{width: "300px"}} className={"btn btn-primary my-2 mx-2"}
                        onClick={handleSaveData}
                    >
                        Salva Dati
                    </button>
                    <button disabled={!hasDataBeenSaved} style={{width: "300px"}} className={"btn btn-primary my-2 mx-2"}>
                        Prosegui
                    </button>
                </div>
            }
        />
    )
}

export default DataEditingPage