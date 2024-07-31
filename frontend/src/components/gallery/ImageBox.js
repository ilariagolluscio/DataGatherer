import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {imageSelector, singleSelect} from "../../slices/gallerySlice";

const ImageBox = ({userId, isDataGathered}) => {

    let specificStyle = {
        height: "140px",
        width: "90px",
        backgroundColor: "gray"
    }


    return (
        <div className={`rounded-3 m-3 ${isDataGathered ? "bg-success-subtle" : "bg-danger-subtle"}` }>

            <div className={"m-2"} >

                <div className={"d-flex justify-content-center w-100"}>
                    <div style={specificStyle}>
                        img
                    </div>
                </div>


                <div className={"w-100 h4 text-center font-monospace"}>
                    {userId}
                </div>

                <div className={"d-flex w-100 justify-content-center"}>
                    <a href="#" className="btn btn-primary m-2">VIEW</a>
                    <a href="#" className="btn btn-danger m-2">DEL</a>
                </div>
            </div>
        </div>
    )
}

export default ImageBox