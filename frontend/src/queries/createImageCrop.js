import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const createImageCrop = async (data) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.post(
        base + '/storage_api/img_crops/',
        data);
    return response.data;
};