import { Dispatch, SetStateAction, useState } from "react"
import { mode_menu_menulist } from "../../../setting/config"
import BorderStyles from '../../../styles/animations/border.module.scss'
import ModMenuCreate from "./mod-menu-menu/create"
import ModMenuCreate2 from "./mod-menu-menu/create-2"
import ModMenuRead from "./mod-menu-menu/read"
import ModMenuUpdate from "./mod-menu-menu/update"
import ModMenuDelete from "./mod-menu-menu/delete"
import modList, { modListCreateDisplay } from "../../../interface/modList"

interface propsTypeModMenu{
    modMenuState:string;
    set_modMenuState:Dispatch<SetStateAction<string>>;
    menu_dependency:{
        create:{
            dependencyState: modListCreateDisplay[],
            set_dependencyState: Dispatch<SetStateAction<modListCreateDisplay[]>>,
        }
    }
}

/**
 * mod menu container crud like create read update delete crud.. duh 
 * @returns JSX
 */
// export default function ModMenu(props:{modMenuState: string,set_modMenuState:  Dispatch<SetStateAction<string>>}){
export default function ModMenu(props:propsTypeModMenu){
//     {
//         modMenuState: string,
//         set_modMenuState:  Dispatch<SetStateAction<string>>
// }

    // const [modMenuState,set_modMenuState] = useState(<div></div>)

    // const 

    function resetModMenuState(){
        props.set_modMenuState("")
    }

    function selectMenu(){
        switch(props.modMenuState){
            case 'create':
                return <div>
                    {
                        ModMenuCreate2({...props.menu_dependency.create,resetModMenuState:resetModMenuState})
                    }
                </div>
            case 'read':
                return <div>
                    {
                        ModMenuRead()
                    }
                </div>
            case 'update':
                return <div>
                    {
                        ModMenuUpdate()
                    }
                </div>
            case 'delete':
                return <div>
                    {
                        ModMenuDelete()
                    }
                </div>
            default:
                return <div>no mod menu...</div>
        }
    }


    return (
        // <div>mod menu</div> 
        // tw-border-4 tw-border-white
        <>
            <div className="tw-flex tw-flex-col tw-p-4">
                <div className="tw-flex">
                {
                    mode_menu_menulist().map((value,index) => {
                        return (
                            <div 
                              key={index} 
                              className={
                                (props.modMenuState === value ? BorderStyles['rainbow-border-text'] : ``) +
                                // ` tw-border-4 tw-h-16 tw-w-32 tw-grid `
                                ` tw-border-4 tw-h-16 tw-w-24 tw-grid `
                              }
                              >
                              <button
                                // className="tw-border-2 tw-border-yellow-500 tw-m-4"
                                className="tw-text-lg tw-font-bold"
                                onClick={() => {
                                    props.set_modMenuState(value);
                                }}
                              >
                                {value}
                              </button>
                            </div>
                          );
                    })
                }
                </div>
                <div className="tw-border-4 tw-border-white tw-mt-4 tw-p-4">
                {
                    selectMenu()
                }
                </div>
            </div>
        </>
    )
}