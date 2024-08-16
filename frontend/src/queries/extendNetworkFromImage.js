import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const extendNetworkFromImage = async ({targetImage}) => {
    if (!targetImage){
        throw Error("No target image")
    }

    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.post(
        base + '/fx_api/extend/',
        {
            targetImage
        });
    return response.data;
};