import Card from "../components/generic/Card";
import bolletta from './bolletta.jpeg';
import horiz from './horiz.png'
import {useRef, useState} from "react";
import {useDebounceEffect} from "../useDebounceEffect";
import {canvasPreview} from "../CanvasPreview";
import ReactCrop from "react-image-crop";
import {useCookies} from "react-cookie";




const Layout = ({leftChildren, rightChildren, bottomChildren}) => {

    const leftRef = useRef(null);

    const [cookies, setCookie] = useCookies(['left_panel_width']);
    const [currentSetWidth, setCurrentSetWidth] = useState(cookies.width)

    setInterval(
        () => {
            if (!leftRef) return
            let value = leftRef.current?.getBoundingClientRect().width
            if (value === undefined) return
            setCookie('width', value)
        },
        2000
    )

    const finalLeftWidth = `${cookies.width}px`

    return (
        <div>
            <h1>
                Raccolta Dati
            </h1>

            <div className={"w-100 d-flex"}>
                <div
                    style={{
                        marginRight: "10px",
                        height: "80vh",
                    }}
                    className={"px-5"}
                >
                    <div
                        style={{
                            overflow: "auto",
                            width: finalLeftWidth,
                            resize: "horizontal",
                            height: "100%",
                            borderRight: "solid gray 2px",
                        }}
                        ref={leftRef}
                    >
                        <div className={"h-100"}>
                            {leftChildren}
                        </div>
                    </div>
                </div>


                <div style={{width: "100%", height: "80vh"}} className={"p-5"}>
                    <div className={"h-100 overflow-y-scroll"}>
                        <div>
                            {rightChildren}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{height: "10vh"}} className={"d-flex w-100 justify-content-center py-2"}>
                {bottomChildren}
            </div>

        </div>
    )
}


const CompletedCanvas = ({previewCanvasRef}) => {
    return(
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




const AnalysisCard = ({vhHeight, title, onSaveCrop, completedCrop, setIsCropEnabled, imgRef, setCrop}) => {
    const previewCanvasRef = useRef(null);

    vhHeight = vhHeight || "15vh"

    const handleSaveCrop = () => {
        canvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            completedCrop,
        )
        console.log(completedCrop)
        setIsCropEnabled(false)
        setCrop(null)
    }


    return (
        <div className={"my-3"}>
            <Card title={title}>
                <div style={{height: vhHeight}} className={"w-100 d-flex justify-content-center p-3 border border-black"}>
                    {completedCrop ?

                        <CompletedCanvas
                            previewCanvasRef={previewCanvasRef}/>

                        : "spazio per l'immagine ritagliata"
                    }
                </div>

                <div className={"w-100 d-flex"}>
                    <button
                        className={"btn btn-primary my-2 mx-2"}
                        onClick={() => setIsCropEnabled(true)}
                    >
                        Inizia il ritaglio immagine
                    </button>

                    <button
                        className={"btn btn-primary my-2 mx-2"}
                        onClick={handleSaveCrop}
                    >
                        Concludi ritaglio immagine
                    </button>

                    <button className={"btn btn-primary my-2 mx-2"} onClick={onSaveCrop}>Salva ritaglio come default
                    </button>
                </div>
                <div className={"mx-1"}>
                    <textarea className={"w-100"} placeholder={"Testo riconosciuto"} rows={5} disabled/>
                </div>
            </Card>
        </div>
    )
}








const DataGatheringPage = () => {


    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState()
    const [isCropEnabled, setIsCropEnabled] = useState(false)
    const imgRef = useRef(null)


    return (
        <Layout
            leftChildren={
                <div className={"w-100 h-100"}>
                    <ReactCrop
                        disabled={!isCropEnabled}
                        crop={crop}
                        onComplete={(c) => {
                            setCompletedCrop(c)
                        }}
                        onChange={c => setCrop(c)}
                    >
                        <img
                            className={"w-100 h-100 object-fit-contain"}
                            src={bolletta}
                            alt={"Immagine in analisi"}
                            ref={imgRef}
                        />
                    </ReactCrop>


                </div>
            }

            rightChildren={
                <div>

                    <AnalysisCard
                        title={"Username"}
                        completedCrop={completedCrop}
                        setIsCropEnabled={setIsCropEnabled}
                        imgRef={imgRef}
                        setCrop={setCrop}
                    />


                    <AnalysisCard
                        title={"Description"}
                        completedCrop={completedCrop}
                        vhHeight={"25vh"}
                        setIsCropEnabled={setIsCropEnabled}
                        imgRef={imgRef}
                        setCrop={setCrop}
                    />

                </div>
            }

            bottomChildren={
                <div className={"d-flex justify-content-center h-100 align-items-center bg-dark-subtle w-100"}>
                    <button style={{width: "300px"}} className={"btn btn-primary my-2 mx-2"}>
                        Riconosci Testo
                    </button>
                    <button style={{width: "300px"}} className={"btn btn-primary my-2 mx-2"}>
                        Avanti
                    </button>
                </div>
            }
        />
    )
}

export default DataGatheringPage