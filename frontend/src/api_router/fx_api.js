import {defaultBaseUrl} from "../global_vars";

export const serverUrl = process.env.REACT_APP_API_URL || defaultBaseUrl

export const getMatrixUrl = (prjId) => serverUrl + `/a/fx_api/matrix/${prjId}/`
export const getBackupFile = () => serverUrl + `/a/fx_api/dump/`
export const adminUrl = () => serverUrl + '/a/admin/'