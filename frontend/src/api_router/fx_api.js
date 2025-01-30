import {defaultBaseUrl} from "../global_vars";

export const serverUrl = process.env.REACT_APP_API_URL || defaultBaseUrl

export const uploadUrl = () => serverUrl + "/fx_api/up/upload/"
export const getMatrixUrl = (prjId) => serverUrl + `/b/fx_api/matrix/${prjId}/`
export const getBackupFile = () => serverUrl + `/b/fx_api/dump/`
export const adminUrl = () => serverUrl + '/admin/'