import axios from "axios";
import {defaultBaseUrl} from "../global_vars";
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

export const extendNetworkFromImage = async ({targetImage}) => {
    if (!targetImage){
        throw Error("No target image")
    }

    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.post(
        base + '/b/fx_api/extend/',
        {
            targetImage
        },
        await getAuthAxiosConfig());
    return response.data;
};