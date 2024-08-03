import {defaultBaseUrl} from "../global_vars";
import axios from 'axios';

const fetchUserHashtagUses = async (id) => {

    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const response = await axios.get(
        base + `/storage_api/user_hashtag_uses/?project=&image=${id}`,
    )
    return response.data
}

export default fetchUserHashtagUses