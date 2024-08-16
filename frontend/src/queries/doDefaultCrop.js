import axios from "axios";
import {defaultBaseUrl} from "../global_vars";

export const doDefaultCrop = async ({prjId, fieldName, targetImg}) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl

    const {data: res} = await axios.get(
        base + `/storage_api/prj_default_crop/?project=${prjId}&fieldName=${fieldName}`
    )

    console.log(base + `/storage_api/prj_default_crop/?project=${prjId}&fieldName=${fieldName}`)

    console.log(res)


    if (!Array.isArray(res)){
        throw Error('Il risultato non è valido!')
    }

    if (res.length === 0){
        throw Error('Non è ancora stato creato un taglio di default. Effettuare un taglio, ' +
            'poi impostarlo come default')
    }

    if (res.length > 1){
        throw Error('Sono presenti nel sistema più tagli di default. Contattare il supporto tecnico.')
    }



    const response = await axios.post(
        base + '/fx_api/default_crop/',
        {fieldName: fieldName, targetImage: targetImg, project: prjId}
    );

    return response.data;
};