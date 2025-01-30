import axios from "axios";
import {defaultBaseUrl} from "../global_vars";
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

export const deleteImage = async(id) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    return await axios.delete(
        base + `/b/storage_api/images/${id}/`,
        await getAuthAxiosConfig()
    );
}