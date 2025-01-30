import {defaultBaseUrl} from "../global_vars";
import axios from "axios";

export const doLogin = async ({username, password}) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.post(
        base + '/a/token/obtain/',
        {username, password});
    return response.data;
}
