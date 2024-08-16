import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const createDefaultCrop = async ({fieldName, prjId, percentCrop}) => {
    if (!fieldName || !prjId || !percentCrop) {
        throw Error('Mancano dei dati nella richiesta!')
    }


    console.log(
        {
            "topPercent": percentCrop.y,
            "leftPercent": percentCrop.x,
            "heightPercent": percentCrop.height,
            "widthPercent": percentCrop.width,
            "fieldName": fieldName,
            "project": prjId,
        }
    )

    const base = process.env.REACT_APP_API_URL || defaultBaseUrl
    const response = await axios.post(
        base + '/storage_api/prj_default_crop/',
        {
            "topPercent": percentCrop.y,
            "leftPercent": percentCrop.x,
            "heightPercent": percentCrop.height,
            "widthPercent": percentCrop.width,
            "fieldName": fieldName,
            "project": prjId,
        });
    return response.data;
};