import {defaultBaseUrl} from "../global_vars";
import axios from 'axios';
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

const fetchProjects = async ({queryKey}) => {
    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const response = await axios.get(
        base + `/b/storage_api/projects/`,
        await getAuthAxiosConfig()
    )
    return response.data
}

export default fetchProjects