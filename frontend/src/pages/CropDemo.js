import bolletta from './bolletta.jpeg';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {useRef, useState} from "react";
import {useDebounceEffect} from "../useDebounceEffect";
import {canvasPreview} from "../CanvasPreview";


function CropDemo() {
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState()
    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)
    const hiddenAnchorRef = useRef(null)
    const blobUrlRef = useRef('')

    async function onDownloadCropClick() {
        const image = imgRef.current
        const previewCanvas = previewCanvasRef.current
        if (!image || !previewCanvas || !completedCrop) {
            throw new Error('Crop canvas does not exist')
        }

        // This will size relative to the uploaded image
        // size. If you want to size according to what they
        // are looking at on screen, remove scaleX + scaleY
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
        )
        const ctx = offscreen.getContext('2d')
        if (!ctx) {
            throw new Error('No 2d context')
        }

        ctx.drawImage(
            previewCanvas,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height,
            0,
            0,
            offscreen.width,
            offscreen.height,
        )
        // You might want { type: "image/jpeg", quality: <0 to 1> } to
        // reduce image size
        const blob = await offscreen.convertToBlob({
            type: 'image/png',
        })

        if (blobUrlRef.current) {
            URL.revokeObjectURL(blobUrlRef.current)
        }
        blobUrlRef.current = URL.createObjectURL(blob)

        if (hiddenAnchorRef.current) {
            hiddenAnchorRef.current.href = blobUrlRef.current
            hiddenAnchorRef.current.click()
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                )
            }
        },
        100,
        [completedCrop],
    )

    return (
        <div className="App">
            <header className="App-header">
                <div style={{backgroundColor: "red"}}>
                    <ReactCrop
                        disabled={false}
                        crop={crop}
                        onComplete={(c) => {
                            console.log(c)
                            setCompletedCrop(c)
                        }}
                        onChange={c => setCrop(c)}>
                        <img ref={imgRef} src={bolletta} alt={"to be cropped"}/>
                    </ReactCrop>
                </div>
                {
                    completedCrop ? (
                        <div>
                            <div>
                                <canvas
                                    ref={previewCanvasRef}
                                    style={{
                                        border: '1px solid black',
                                        objectFit: 'contain',
                                        width: completedCrop.width,
                                        height: completedCrop.height,
                                    }}
                                />
                            </div>
                            <div>
                                <button onClick={onDownloadCropClick}>Download Crop</button>
                                <div style={{fontSize: 12, color: '#666'}}>
                                    If you get a security error when downloading try opening the
                                    Preview in a new tab (icon near top right).
                                </div>
                                <a
                                    href="#hidden"
                                    ref={hiddenAnchorRef}
                                    download
                                    style={{
                                        position: 'absolute',
                                        top: '-200vh',
                                        visibility: 'hidden',
                                    }}
                                >
                                    Hidden download
                                </a>
                            </div>
                        </div>
                    ) : <></>
                }


                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default CropDemo;
