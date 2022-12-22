import { useState } from "react";
import Image from "next/image";
import CogIcon from "../../assets/cog-white.png";
import StatusBar from "./navigation-menu/status-bar";
import { set_useSettingState } from "../../store/useSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import MenuList from "./navigation-menu/menu-list";

export default function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    setShowMenu(!showMenu);
    if(!showMenu) dispatch(set_useSettingState({}))
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className={`${
          showMenu ? `tw-rotate-180 tw-bg-opacity-75` : `tw-rotate-0`
        } tw-duration-500 tw-fixed tw-top-0 tw-right-0 tw-m-4 tw-rounded-full tw-shadow-lg tw-text-white tw-p-3 tw-z-20`}
      >
        <div className={`tw-w-5 tw-h-5`}>
          <Image src={CogIcon} alt="menu-icon" className="tw-w-full tw-h-auto tw-opacity-30 hover:tw-opacity-100 tw-transition-all tw-duration-300" />
        </div>
      </button>
      <button
        onClick={handleButtonClick}
        className={`${
          showMenu ? `` : `tw-hidden`
        } tw-duration-500 tw-fixed tw-top-0 tw-left-20 tw-m-4 tw-rounded-full tw-shadow-lg tw-text-white tw-p-3 tw-z-20`}
      >
        <MenuList />
      </button>
      <div className={`${
          showMenu ? `` : `tw-hidden`
        } tw-fixed tw-top-0 tw-left-60 tw-m-4 tw-rounded-full tw-shadow-lg tw-text-white tw-p-3 tw-z-20`}>
        <StatusBar />
      </div>
      <div>
        {showMenu && (
          <div className="tw-fixed tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-bg-black tw-bg-opacity-75 tw-z-10"></div>
        )}
      </div>
    </div>
  );
}