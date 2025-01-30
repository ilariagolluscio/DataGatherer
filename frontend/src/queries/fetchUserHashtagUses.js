import {defaultBaseUrl} from "../global_vars";
import axios from 'axios';
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

const fetchUserHashtagUses = async (id) => {

    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const response = await axios.get(
        base + `/b/storage_api/user_hashtag_uses/?project=&image=${id}`,
        await getAuthAxiosConfig(),
    )
    return response.data
}

export default fetchUserHashtagUses