import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const saveRecognizedData = async ({id, recognizedData}) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    await axios.patch(
        base + `/storage_api/img_crops/${id}/`,
        {
            id: id,
            recognizedText: recognizedData
        });

    return {};
};

