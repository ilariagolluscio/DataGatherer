import {defaultBaseUrl} from "../global_vars";
import axios from 'axios';

const fetchProjects = async ({queryKey}) => {

    const [_key] = queryKey;
    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const response = await axios.get(
        base + `/storage_api/projects/`,
    )
    return response.data
}

export default fetchProjects