import {defaultBaseUrl} from "../global_vars";
import axios from 'axios';

const fetchProjects = async (imgId, fieldName) => {

    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const response = await axios.get(
        base + `/storage_api/img_crops/?image=${imgId}&fieldName=${fieldName}`,
    )
    return response.data
}

export default fetchProjects