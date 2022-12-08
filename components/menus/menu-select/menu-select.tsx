import { Dispatch, SetStateAction } from "react";
import BackgroundStyles from '../../../styles/animations/border.module.scss';
import TextStyles from '../../../styles/animations/text.module.scss';
import Styles from './menu-select.module.scss'

export default function MenuSelectButtonList(
  menu_list: {
    name: string;
    JSX: (...args: any) => JSX.Element;
    menu_data?: any;
  }[],
  menuNameState:string,
  set_menuNameState: Dispatch<SetStateAction<string>>
) {
  return (
    <div className="tw-flex">
      {menu_list.map((menu, index) => {
        return (
          <div 
            key={index} 
            className={
              (menuNameState === menu.name ? Styles['menu-active'] : ``) +
              // ` tw-border-4 tw-h-16 tw-w-32 tw-grid `
              ` tw-border-4 tw-h-16 tw-w-24 tw-grid `
            }
            >
            <button
              // className="tw-border-2 tw-border-yellow-500 tw-m-4"
              className="tw-text-lg tw-font-bold"
              onClick={() => {
                set_menuNameState(menu.name);
              }}
            >
              {menu.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}
