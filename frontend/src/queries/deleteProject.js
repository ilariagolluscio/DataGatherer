import axios from "axios";
import {defaultBaseUrl} from "../global_vars";
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

export const deleteProject = async(id) => {
    if (!id){
        throw Error('Non è stato fornito l\'id')
    }

    const base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const {data: result} = await axios.get(
        base + `/b/storage_api/user_hashtag_uses/?project=${id}`,
        await getAuthAxiosConfig(),
    )

    if (!Array.isArray(result)){
        throw Error('Result is not array?')
    }

    if (result.length !== 0){
        throw Error('Esistono delle associazioni Utente - Hashtag - Immagine nel progetto. ' +
            'Contattare supporto')
    }


    return await axios.delete(
        base + `/b/storage_api/projects/${id}/`,
        await getAuthAxiosConfig()
    );
}