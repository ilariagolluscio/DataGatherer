import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const setDefaultCrop = async (id) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.patch(
        base + `/storage_api/img_crops/${id}/`,
        {
            id: id,
            isDefault: true
        });
    return response.data;
};

