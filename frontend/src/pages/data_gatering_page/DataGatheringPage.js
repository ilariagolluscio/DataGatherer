import Card from "../../components/generic/Card";
import bolletta from '../bolletta.jpeg';
import horiz from '../horiz.png'
import {useRef, useState} from "react";
import {useDebounceEffect} from "../../useDebounceEffect";
import {canvasPreview} from "../../CanvasPreview";
import ReactCrop from "react-image-crop";
import {useCookies} from "react-cookie";
import ImageAnalysisCard from "../../components/analysis/ImageAnalysisCard";
import SingleImgAnalysisLayout from "../../layouts/single_image_analysis_layout/SingleImgAnalysisLayout";
import {useQuery} from "@tanstack/react-query";
import fetchProjects from "../../queries/fetchProjects";
import fetchImageData from "../../queries/fetchImageData";
import {useSearchParams} from "react-router-dom";
import {defaultBaseUrl} from "../../global_vars";
import {useHotkeys} from "react-hotkeys-hook";
import HotButton from "../../components/hotstuff/HotButton";



const DataGatheringPage = () => {

    const [searchParams] = useSearchParams();
    const imageId = searchParams.get("img_id");
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState()
    const [percentCrop, setPercentCrop] = useState(null)
    const [isCropEnabled, setIsCropEnabled] = useState(false);
    const [setMode, setSetMode] = useState(false)

    const imgRef = useRef(null)


    const { data: imgData, error, isFetching} = useQuery({
        queryKey: ['get_scenario', imageId],
        queryFn: () => (fetchImageData(imageId))
    });



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

            imageUserId={imgData.userId}

            leftChildren={
                <div className={"w-100 h-100"}>
                    <ReactCrop
                        disabled={!isCropEnabled}
                        crop={crop}
                        onComplete={(crop, percentCrop) => {
                            setCompletedCrop(crop)
                            setPercentCrop(percentCrop)
                        }}
                        onChange={c => setCrop(c)}
                    >
                        <img
                            className={"w-100 h-100 object-fit-contain"}
                            src={imgUrl}
                            alt={"Immagine in analisi"}
                            ref={imgRef}
                        />
                    </ReactCrop>


                </div>
            }

            rightChildren={
                <div>

                    <ImageAnalysisCard
                        imgId={imgData.id}
                        title={"Username"}
                        completedCrop={completedCrop}
                        setIsCropEnabled={setIsCropEnabled}
                        imgRef={imgRef}
                        setCrop={setCrop}
                        percentCrop={percentCrop}
                    />


                    <ImageAnalysisCard
                        imgId={imgData.id}
                        title={"Hashtags"}
                        completedCrop={completedCrop}
                        vhHeight={"25vh"}
                        setIsCropEnabled={setIsCropEnabled}
                        imgRef={imgRef}
                        setCrop={setCrop}
                        percentCrop={percentCrop}
                    />

                </div>
            }

            bottomChildren={
                <div className={"d-flex justify-content-center h-100 align-items-center bg-dark-subtle w-100"}>
                    <HotButton
                        style={{width: "20vw"}}
                        className={"btn btn-primary my-2 mx-2"}
                        onClick={() => {window.location.href = `/edit?img_id=${imageId}`}}
                        uniqueHotKeyId={'data_gathering_next'}
                    >
                        Avanti
                    </HotButton>
                </div>
            }
        />
    )
}

export default DataGatheringPage