import axios from "axios";
import {defaultBaseUrl} from "../global_vars";
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

export const createImgData = async ({fieldName, value, imgId}) => {
    if (!fieldName||!value||!imgId) {
        throw Error("Dati mancanti!")
    }
    console.log('oks')

    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.post(
        base + '/b/storage_api/img_data/',
        {
            "fieldName": fieldName,
            "value": value,
            "image": imgId
        },
        await getAuthAxiosConfig());
    return response.data;
};