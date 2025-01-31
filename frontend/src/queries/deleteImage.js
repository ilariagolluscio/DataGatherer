import axios from "axios";
import {defaultBaseUrl} from "../global_vars";
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";
import Cookies from "universal-cookie";

export const deleteImage = async(id) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const cookies = new Cookies()
    console.log(cookies.get('csrftoken'))

    const config = await getAuthAxiosConfig()
    console.log(config)

    return await axios.delete(
        base + `/b/storage_api/images/${id}/`,
        config
    );
}