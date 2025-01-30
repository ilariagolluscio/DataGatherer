import {defaultBaseUrl} from "../global_vars";
import axios from 'axios';
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

export const fetchImageData = async ({imgId, fieldName}) => {

    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const {data: response} = await axios.get(
        base + `/b/storage_api/img_data/?image=${imgId}&fieldName=${fieldName}`,
        await getAuthAxiosConfig(),
    )

    if (!Array.isArray(response)){
        throw Error("Non è un array!")
    }

    if (response.length === 1){
        return response[0].value
    }

    return null
}