import {defaultBaseUrl} from "../../global_vars";
import Navbar from "../../components/auth/Navbar";

const TopButtons = ({handleCreate}) => {
    const baseUrl = process.env.REACT_APP_API_URL || defaultBaseUrl
    const uploadUrl = baseUrl + "/fx_api/up/upload/"
    const adminUrl = baseUrl + '/admin/'

    return (
        <div className={'d-flex flex-wrap m-5'}>

            <div className={"m-2"}>
                <button className="btn btn-success" onClick={handleCreate}>Crea nuovo progetto</button>
            </div>

            <div className={"m-2"}>
                <a href={uploadUrl} className="btn btn-primary mx-1">Carica immagini in un progetto</a>
            </div>

            <div className={"m-2"}>
                <a href={adminUrl} className="btn btn-primary mx-1">
                    Apri pannello di controllo entità (username: admin,
                    password: admin)
                </a>
            </div>

        </div>
    )
}



const TitleTopButtonsContentLayout = ({title, topButtons, content}) => {
    return (
        <div>
            <Navbar/>
            <div className={"h1 m-5"}>
                {title}
            </div>

            <div className={'d-flex flex-wrap m-5'}>
                {topButtons.map((child, i) => (
                    <div key={i}>
                        {child}
                    </div>
                ))}
            </div>

            <div className={'m-5'}>
                {content}
            </div>

        </div>
    )
}


export default TitleTopButtonsContentLayout