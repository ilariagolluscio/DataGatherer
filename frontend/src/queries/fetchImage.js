import {defaultBaseUrl} from "../global_vars";
import axios from 'axios';
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

const fetchImage = async (id) => {

    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const response = await axios.get(
        base + `/b/storage_api/images/${id}/`,
        await getAuthAxiosConfig(),
    )
    return response.data
}

export default fetchImage