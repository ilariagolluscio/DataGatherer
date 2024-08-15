import {defaultBaseUrl} from "../global_vars";
import axios from 'axios';

const fetchRecognizedTextFromImage = async (imgId, fieldName) => {

    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const response = await axios.get(
        base + `/storage_api/img_crops/?image=${imgId}&fieldName=${fieldName}`,
    )

    const data = response.data

    if (!Array.isArray(data)){
        throw Error("the result is not an array!")
    }

    if (data.length === 1){
        return data[0].recognizedText
    }

    return null

}

export default fetchRecognizedTextFromImage