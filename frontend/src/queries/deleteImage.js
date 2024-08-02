import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const deleteImage = async(id) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    return await axios.delete(
        base + `/storage_api/images/${id}/`
    );
}