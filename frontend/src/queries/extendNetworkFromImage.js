import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const extendNetworkFromImage = async (data) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.post(
        base + '/fx_api/extend/',
        data);
    return response.data;
};