import {defaultBaseUrl} from "../../global_vars";
import {useMutation} from "@tanstack/react-query";
import {deleteImage} from "../../queries/deleteImage";

const ImageBox = ({userId, isDataGathered, imageFileUrl, imgId}) => {

    let specificStyle = {
        height: "140px",
        width: "90px",
        backgroundColor: "gray"
    }


    const {mutate: deleteMutate} = useMutation({
        mutationFn: deleteImage,
        retry: 1,
        onSuccess: () => window.location.reload(),
        onError: (error) => alert("Errore di connessione: " + error.message)
    })

    let base = process.env.REACT_APP_API_URL || defaultBaseUrl
    let source = base + imageFileUrl

    return (
        <div className={`rounded-3 m-3 ${isDataGathered ? "bg-success-subtle" : "bg-danger-subtle"}` }>

            <div className={"m-2"} >

                <div className={"d-flex justify-content-center w-100"}>
                    <div style={specificStyle}>
                        <img src={source} className={"h-100 w-100"} alt={"immagine da lavoro"}/>
                    </div>
                </div>


                <div className={"w-100 h4 text-center font-monospace"}>
                    {userId}
                </div>

                <div className={"d-flex w-100 justify-content-center"}>
                    <button
                        disabled={isDataGathered}
                        onClick={() => window.location.href = `/gather?img_id=${imgId}`}
                        className="btn btn-primary m-2" >ANYZ
                    </button>

                    <button href="#" className="btn btn-danger m-2" onClick={() => deleteMutate(imgId)}>DEL</button>
                </div>
            </div>
        </div>
    )
}

export default ImageBox