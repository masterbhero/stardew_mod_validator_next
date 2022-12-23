import { useDispatch, useSelector } from "react-redux";
import { set_currentPage , select_currentPageState} from "../../../store/currentPageSlice";
import BorderStyles from '../../../styles/animations/border.module.scss'

export default function MenuList() {
    const dispatch = useDispatch();
    const currentPage = useSelector(select_currentPageState)

    const menuList: { name: string; select: any }[] = [
      { name: "ModList", select: {} },
      { name: "FileList", select: {} },
      { name: "ModMenu", select: {} },
      { name: "Setting", select: {} },
    ];

    function changeCurrentPage(name:string){
        dispatch(set_currentPage(name))
    }

    function checkPageStatus(name:string){
      if(currentPage === "init" && name === "ModList"){
        return "tw-text-success"
      }
      else{
        if(currentPage === name){
          return "tw-text-success"
        }
        else{
          return ""
        }
      }
    }
  
    return (
      <div>
        <div className="tw-mb-6 tw-cursor-default">
          Pages
        </div>
        {menuList.map((menu, index) => {
          return (
            <div
              onClick={() => {changeCurrentPage(menu.name)}}
              key={index}
              className={
                `tw-mb-4 tw-p-4 hover:tw-bg-gray-500 hover:tw-bg-opacity-20 tw-bg-opacity-0 tw-duration-300 
                ${currentPage === "init" && menu.name === "ModList" ? BorderStyles['rainbow-border-text'] : currentPage === menu.name ? BorderStyles['rainbow-border-text'] : ""}`  
            }>
              {menu.name}
            </div>
          );
        })}
      </div>
    );
  }
  