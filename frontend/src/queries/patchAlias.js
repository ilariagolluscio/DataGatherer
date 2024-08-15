import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const patchAlias = async ({id, alias}) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.patch(
        base + `/storage_api/ig_users/${id}/`,
        {
            id: id,
            alias: alias
        });
    return response.data;
};

