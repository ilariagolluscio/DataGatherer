import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const useDefaultCrop = async (data) => {

    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.post(
        base + '/fx_api/default_crop/',
        data);
    return response.data;
};