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

    function ReturnPage(){
        switch(currentPage){
            case "init":
                return (<ModView4></ModView4>)
            case "ModList":
                return (<ModView4></ModView4>)
            case "FileList":
                return (<div>FileList</div>)
            case "ModMenu":
                return (<div>ModMenu</div>)
            case "Setting":
                return (<div>Setting</div>)
            default:
                return (<ModView4></ModView4>)
        }
    }

    return (
        <div className="tw-text-2xl tw-ml-4">
            {/* {currentPage} */}
            {/* <ModView4></ModView4> */}
            {ReturnPage()}
        </div>
    )
}

