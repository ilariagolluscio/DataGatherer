import axios from "axios";
import {defaultBaseUrl} from "../global_vars";
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

export const createProject = async (name) => {
    if (!name){
        alert('Non si può creare un progetto senza nome!')
        return;
    }


    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.post(
        base + '/b/storage_api/projects/',
        {name},
        await getAuthAxiosConfig());
    return response.data;
};