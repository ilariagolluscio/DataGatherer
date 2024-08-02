import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const saveReviewedData = async (data) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.post(
        base + '/fx_api/save_reviewed_text/',
        data);
    return response.data;
};