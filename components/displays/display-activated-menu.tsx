/**
 * 
 * @param menu_name - state for select menu to actived 
 * @param menu_list - menulist container menu_name for selection JSX for container menu menu_data in case that menu need data 
 * @returns menu that been select to actived
 */
export default function  DisplayActivatedMenu(
  menu_name: string,
  menu_list: {
    name: string;
    JSX: (...args: any) => JSX.Element;
    menu_data?: any;
  }[]
) {
  // console.log("menu_name",menu_name)
  let DisplayMenu: JSX.Element = <div>no menu ...</div>;
  for (let i = 0; i < menu_list.length; i++) {
    const menu = menu_list[i];
    if (menu.name === menu_name) {
      DisplayMenu = menu.JSX(menu.menu_data ? menu.menu_data : undefined);
      break;
    }
  }
  return DisplayMenu;
}
