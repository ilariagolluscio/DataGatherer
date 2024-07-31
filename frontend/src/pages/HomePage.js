import Card from "../components/generic/Card";

const HomePage = () => {

    const handleCreate = () => {
        let value = prompt("Nome del progetto?")
        alert(value)
    }

    const enterButton = <a href="#" className="btn btn-primary m-2">Entra</a>
    const deleteButton = <a href="#" className="btn btn-danger m-2">Elimina</a>

    return (
        <div>
            <div className={"h1 mx-5"}>
                Progetti
            </div>

            <div className={"m-5"}>
                <a href="#" className="btn btn-success" onClick={handleCreate}>Crea nuovo progetto</a>
            </div>

            <div className={"m-5 w-75"}>
                <Card title={"Ciao"} rightAlignObjArray={[enterButton, deleteButton]}/>
            </div>


        </div>
    )
}

export default HomePage