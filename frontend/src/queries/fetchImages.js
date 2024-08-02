import {defaultBaseUrl} from "../global_vars";
import axios from 'axios';

const fetchProjects = async (prjId) => {
    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const response = await axios.get(
        base + `/storage_api/images/?project=${prjId}`,
    )
    return response.data
}

export default fetchProjects