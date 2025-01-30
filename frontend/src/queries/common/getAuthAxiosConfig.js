import axios from "axios";
import {defaultBaseUrl} from "../../global_vars";
import Cookies from "universal-cookie";

function handleGoToLogin(cookies){
    const current = document.location.pathname
    cookies.set('current', current)
    console.log(current)
    document.location.assign('/login')
    throw DOMException
}

export default async function getAuthAxiosConfig() {
    const cookies = new Cookies(null, { path: '/' });

    let token = cookies.get("access")
    let refresh = cookies.get("refresh")
    let base = process.env.REACT_APP_API_URL || defaultBaseUrl

    if (token === undefined) {
        handleGoToLogin(cookies)
    }

    await axios.post(
        base + `/a/token/verify/`,
        {token}
    ).catch(async () => {
        if (refresh === undefined) {
            document.location = '/login'
        }
        let refresh_response = await axios.post(
            base + `/a/token/refresh/`,
            {refresh}
        ).catch(() => {
            handleGoToLogin(cookies)
        })
        cookies.set('access', refresh_response.data.access)
    })

    return {
        headers: {
            Authorization: `Bearer ${cookies.get("access")}`
        }
    }
}
