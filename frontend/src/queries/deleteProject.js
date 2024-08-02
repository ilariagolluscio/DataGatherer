import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const deleteProject = async({id}) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    return await axios.delete(
        base + `/storage_api/projects/${id}/`
    );
}