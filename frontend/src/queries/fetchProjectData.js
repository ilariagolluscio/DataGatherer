import {defaultBaseUrl} from "../global_vars";
import axios from 'axios';
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

const fetchProjectData = async (id) => {

    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const response = await axios.get(
        base + `/b/storage_api/projects/${id}/`,
        await getAuthAxiosConfig(),
    )
    return response.data
}

export default fetchProjectData