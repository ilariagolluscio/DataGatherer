import {defaultBaseUrl} from "../global_vars";
import axios from 'axios';

const fetchProjects = async (id) => {

    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const response = await axios.get(
        base + `/storage_api/projects/${id}/`,
    )
    return response.data
}

export default fetchProjects