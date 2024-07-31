import ImageBox from "./ImageBox";
import {useEffect, useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fillSelectedArrayWithNFalseValues, selectAll, selectedSelector} from "../../slices/gallerySlice";

const Gallery = () => {
    const reduxSelected = useSelector(selectedSelector)


    let list = Array(100).fill(1).map((n, i) => n + i)

    const handleSelectAll = () => {

    }

    return(
        <div>


            <div className={"d-flex flex-wrap"}>
                {
                    list.map(i => (
                        <ImageBox key={i} selectorId={i} userId={i}/>
                    ))
                }
            </div>

        </div>
    )

}

export default Gallery