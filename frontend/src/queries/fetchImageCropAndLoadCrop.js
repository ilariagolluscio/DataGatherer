import {defaultBaseUrl} from "../global_vars";
import axios from 'axios';
import {loadCropFromServerData} from "../components/analysis/image_analysis_card/canvasPreview";
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

const fetchImageCropAndLoadCrop = async (imgId, fieldName, imgRef, previewCanvasRef) => {

    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const response = await axios.get(
        base + `/b/storage_api/img_crops/?image=${imgId}&fieldName=${fieldName}`,
        await getAuthAxiosConfig(),
    )

    const data = response.data

    if (!Array.isArray(data)){
        throw Error("the result is not an array!")
    }

    if (data.length === 1) {
        console.log(data)
        loadCropFromServerData(data[0], imgRef, previewCanvasRef)
        return data[0]
    }

    return null

}

export default fetchImageCropAndLoadCrop