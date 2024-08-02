import SingleImgAnalysisLayout from "../../layouts/single_image_analysis_layout/SingleImgAnalysisLayout";
import ReactCrop from "react-image-crop";
import bolletta from "../bolletta.jpeg";
import ImageAnalysisCard from "../../components/analysis/ImageAnalysisCard";
import Card from "../../components/generic/Card";
import DataAnalysisCard from "../../components/analysis/DataAnalysisCard";

const DataParsingPage = () => {
    return (
        <SingleImgAnalysisLayout

            imageUserId={1}

            leftChildren={
                <div className={"w-100 h-100"}>
                    <img
                        className={"w-100 h-100 object-fit-contain"}
                        src={bolletta}
                        alt={"Immagine in analisi"}
                    />
                </div>
            }

            rightChildren={
                <div>

                    <DataAnalysisCard
                        title={"Username"}
                        content={"ciao"}
                        alreadyExists={false}
                    />


                </div>
            }


            bottomChildren={
                <div className={"d-flex justify-content-center h-100 align-items-center bg-dark-subtle w-100"}>
                    <button style={{width: "300px"}} className={"btn btn-primary my-2 mx-2"}>
                        Registra dati
                    </button>
                </div>
            }
        />
    )
}

export default DataParsingPage