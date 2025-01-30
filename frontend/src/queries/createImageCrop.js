import axios from "axios";
import {defaultBaseUrl} from "../global_vars";
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

export const createImageCrop = async ({fieldName, imgId, percentCrop}) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.post(
        base + '/b/storage_api/img_crops/',
        {
            "fieldName": fieldName,
            "leftPercent": percentCrop.x,
            "topPercent": percentCrop.y,
            "heightPercent": percentCrop.height,
            "widthPercent": percentCrop.width,
            "recognizedText": "",
            "image": imgId
        },
        await getAuthAxiosConfig());
    return response.data;
};