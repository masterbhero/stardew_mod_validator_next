import { useDispatch, useSelector } from "react-redux";
import ModView4 from "../components/menus/mod-view-4/mod-view-4";
import { select_currentPageState } from "../store/currentPageSlice";

export default function Home(){

    const currentPage = useSelector(select_currentPageState)

    // const defaultPage = 

    // function selectCurrentPage(){
    //     switch(currentPage){
    //         default:
    //             return 
    //     }
    // }

    return (
        <div className="tw-text-2xl tw-ml-4">
            {currentPage}
            <ModView4></ModView4>
        </div>
    )
}

