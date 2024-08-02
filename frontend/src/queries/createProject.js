import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const createProject = async ({name}) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.post(
        base + '/storage_api/projects/',
        {name: name});
    return response.data;
};