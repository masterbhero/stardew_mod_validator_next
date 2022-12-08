import Image from 'next/image';
import { useEffect, useState } from 'react'
import modList , { modListDisplay } from '../../../interface/modList'
import FolderIcon from '../../../assets/folder.svg'
import DependencyIcon from '../../../assets/dependency.png'
import Styles from './mod-view.module.scss';
// import BackgroundStyle from '../../../styles/animations/background.module.scss'

export default function ModeView({ props }:{ props : { mod_list:modList[] } }){



    // const [modListDisplayData,set_modListDisplayData] = useState<modListDisplay[]>([])
    const [modListDisplayData,set_modListDisplayData] = useState<modListDisplay[]>(props.mod_list)

    function calculateStatus(mod: modList){
      return 3
    }

    function displayStatus(status: number | undefined){
      switch (status){
        default :
          return 'notinstalled'
      }
    }

    function makeDisplayList() {
        const newDisplay: modListDisplay[] = [];
        console.log(props)
        if(props.mod_list){
          for (let mod of props.mod_list) {
            newDisplay.push({
            ...mod,
            displayDependency:true ,
            status:calculateStatus(mod)
            });
          }
          // console.log(newDisplay)
          // set_modListDisplayData([]);
          // console.log("modListDisplayData2",modListDisplayData)
        }
        
        return newDisplay
    }

    // function loopAndDisplayDependency(mod_list:modListDisplay[] | undefined,modview?:boolean):JSX.Element
    // function loopAndDisplayDependency(mod_list:modListDisplay[] | undefined,modview?:boolean):JSX.Element[] 
    // function loopAndDisplayDependency(mod_list:modListDisplay[] | undefined,modview?:boolean):any {
    //   if(mod_list && mod_list.length > 0){
    //     const display_array:JSX.Element[] = []
    //     mod_list.map((value,key) => {
    //       display_array.push(
    //         // <div key={key} className={`tw-m-4 tw-flex ` + (modview ? `tw-flex-col` : `tw-flex-row`)}>
    //         <div key={key} className={`tw-m-4 ` + (modview ? `tw-ml-0` : `tw-ml-20`)}>
    //           <div className='tw-m-4 tw-ml-10 tw-border-2 tw-w-40 tw-h-40' 
    //           >
    //               {value.name}
    //           </div>
    //           {
    //             // (value.displayDependency === true)
    //             // ? loopAndDisplayDependency(value.dependency)
    //             // : (modview)
    //             //   ? <div>tasta</div>
    //             //   : ""
    //             // (() => {
    //             //   return <div></div>
    //             // })()
    //             loopAndDisplayDependency(value.dependency)
    //           }
    //         </div>
    //       )
    //     })
    //     return display_array
    //   }
    //   else{
    //     return <div className="tw-text-white"></div>
    //   }
    // }

    function loopAndDisplayDependency(mod_list:modListDisplay[] | undefined,modview?:boolean):JSX.Element
    function loopAndDisplayDependency(mod_list:modListDisplay[] | undefined,modview?:boolean):JSX.Element[] 
    function loopAndDisplayDependency(mod_list:modListDisplay[] | undefined,modview?:boolean):any {
      if(mod_list && mod_list.length > 0){
        const display_array:JSX.Element[] = []
        mod_list.map((value,key) => {
          display_array.push(
            <div key={key} className={`tw-m-4 tw-flex ` + (modview ? `tw-ml-0` : `tw-ml-20`)}>
              <div className={
                `
                  tw-flex tw-flex-col 
                  tw-m-4 tw-ml-10 
                  tw-px-4 tw-py-2 
                  tw-border-2 tw-rounded-3xl 
                  tw-h-[calc(16px+64px+36px+17px)]
                  tw-bg-[#5880bf]
                `  //tw-min-w-[160px] 
                + (modview ? `tw-mt-0` : `tw-mt-10`)
              } 
              id='main'
              >
                  <div className='tw-flex '>
                    <div className={`tw-w-16 tw-h-16`}>
                      <Image src={modview ? FolderIcon : DependencyIcon} alt="" priority className="tw-w-full tw-h-auto"/>
                      {/* <Image src={modview ? FolderIcon : DependencyIcon} alt="" width={150} height={150}/> */}
                    </div>
                    <div className='tw-flex tw-items-center tw-justify-center tw-pl-4'>
                      <div className={`${Styles.name} ${Styles[displayStatus(value.status)]}`}>
                        {value.name}
                      </div>
                    </div>
                  </div>
                  <div className='tw-flex tw-justify-between tw-mt-2'>
                    <div><button className={`${Styles.button} ${Styles.edit}`}>edit</button></div>
                    <div><button className={`${Styles.button} ${Styles.remove}`}>remove</button></div>
                  </div>
              </div>
              <div className={`tw-mt-24` }> 
                {
                  loopAndDisplayDependency(value.dependency)
                }
              </div>
            </div>
          )
        })
        return display_array
      }
      else{
        return <div className="tw-text-white"></div>
      }
    }

    // useEffect(() => {
    //   console.log("mod-view")
    //   console.log("modListDisplayData",modListDisplayData)
    //   makeDisplayList()
    // },[])

    // console.log(props.mod_list)

    return (
        <div className='' id='mod-view'>
          <div className='tw-px-10 tw-py-5'><button className={`${Styles.button}`} onClick={() => {makeDisplayList()}}>reload</button></div>
          <div className='tw-flex tw-flex-col tw-overflow-auto'> 
              {
                  loopAndDisplayDependency(makeDisplayList(),true)
              }
          </div>
        </div>
    )  
}    