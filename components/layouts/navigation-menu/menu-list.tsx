import { useDispatch, useSelector } from "react-redux";
import { set_currentPage } from "../../../store/currentPageSlice";

export default function MenuList() {
    const dispatch = useDispatch();

    const menuList: { name: string; select: any }[] = [
      { name: "ModList", select: {} },
      { name: "FileList", select: {} },
      { name: "ModMenu", select: {} },
      { name: "Setting", select: {} },
    ];

    function changeCurrentPage(name:string){
        dispatch(set_currentPage(name))
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
              className="tw-mb-4 tw-p-4 hover:tw-bg-gray-500 hover:tw-bg-opacity-20 tw-bg-opacity-0 tw-duration-300"
            >
              {menu.name}
            </div>
          );
        })}
      </div>
    );
  }
  