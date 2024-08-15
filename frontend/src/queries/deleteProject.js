import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const deleteProject = async(id) => {
    if (!id){
        throw Error('Non è stato fornito l\'id')
    }

    const base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const {data: result} = await axios.get(
        base + `/storage_api/user_hashtag_uses/?project=${id}`
    )

    if (!Array.isArray(result)){
        throw Error('Result is not array?')
    }

    if (result.length !== 0){
        throw Error('Esistono delle associazioni Utente - Hashtag - Immagine nel progetto. ' +
            'Cancellarle attraverso la dashboard entità e poi cancellare il progetto')
    }


    return await axios.delete(
        base + `/storage_api/projects/${id}/`
    );
}