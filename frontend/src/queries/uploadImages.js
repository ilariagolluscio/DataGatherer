import axios from "axios";
import {defaultBaseUrl} from "../global_vars";
import getAuthAxiosConfig from "./common/getAuthAxiosConfig";

export const uploadImages = async ({files, prjId}) => {
    const base = process.env.REACT_APP_API_URL || defaultBaseUrl

    console.log(files)

    let formData = new FormData();
    for (let i = 0; i < files.length; i++){
        formData.append('files', files[i])
    }
    formData.append('project', prjId)


    let config = await getAuthAxiosConfig()
    config.headers = {...config.headers, 'Content-Type':'multipart/form-data' }

    console.log(config)
    console.log(formData.get('project'))

    const {data: res} = await axios.post(
        base + `/b/fx_api/up/upload/`,
        formData,
        config,
    )

    return res.data;
};


