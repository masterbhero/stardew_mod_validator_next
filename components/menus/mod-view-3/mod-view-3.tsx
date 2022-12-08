import Image from 'next/image';
import { useEffect, useState } from 'react'
import modList , { modListDisplay } from '../../../interface/modList'
import FolderIcon from '../../../assets/folder-white.png'
import DependencyIcon from '../../../assets/dependency-white.png'
import Styles from './mod-view-3.module.scss';

export default function ModView3(DisplayMod:JSX.Element | JSX.Element[]){

    return (
        <div className='' id='mod-view'>
          {/* <div className='tw-px-10 tw-py-5'><button className={`${Styles.button}`} onClick={() => {makeDisplayList()}}>reload</button></div> */}
          <div className='tw-flex tw-flex-col tw-overflow-auto'
            // onMouseDown={(event) => {console.log(event)}}
          > 
              {
                  DisplayMod
              }
          </div>
        </div>
    )
}

export function calculateStatus(mod: modList){
    return 3
}

export function displayStatus(status: number | undefined){
    switch (status){
      default :
        return 'notinstalled'
    }
  }

export function makeDisplayList(mod_list:modList[]) {
    const newDisplay: modListDisplay[] = [];
    if(mod_list){
      for (let mod of mod_list) {
        newDisplay.push({
        ...mod,
        displayDependency:true ,
        status:calculateStatus(mod)
        });
      }
    }
    
    return newDisplay
}

export function loopAndDisplayDependency(mod_list:modListDisplay[] | undefined,modview?:boolean):JSX.Element
export function loopAndDisplayDependency(mod_list:modListDisplay[] | undefined,modview?:boolean):JSX.Element[] 
export function loopAndDisplayDependency(mod_list:modListDisplay[] | undefined,modview?:boolean):any {
  if(mod_list && mod_list.length > 0){
    const display_array:JSX.Element[] = []
    mod_list.map((value,key) => {
      display_array.push(
        <div key={key} className={`tw-m-4 tw-flex ` + (modview ? `tw-ml-0` : `tw-ml-0`)}>
          <div className={
            // `
            //   tw-flex tw-flex-col 
            //   tw-m-4 tw-ml-10 
            //   tw-px-4 tw-py-2 
            //   tw-border-2 tw-rounded-3xl 
            //   tw-h-[calc(16px+64px+36px+17px)]
            //   tw-bg-[#5880bf]
            // `  //tw-min-w-[160px]
            `  
              tw-flex tw-flex-col 
              tw-m-4 tw-ml-10 
              tw-px-4 tw-py-2 
              tw-border-2 
              tw-h-[calc(16px+44px+36px+17px)] 
             ` 
            + (modview ? `tw-mt-0` : `tw-mt-10`)
          } 
          id='main'
          >
              <div className='tw-flex tw-items-center tw-justify-between tw-min-w-[200px]'>
                <div className={`tw-w-11 tw-h-11`}>
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
  else if((!(mod_list) || !(mod_list.length > 0)) && modview){
    return <div> no mod or modlist.json not found</div>
  }
  else{
    return <div className="tw-text-white"></div>
  }
}

export function getModListResult(
  file_result: {
    status: boolean;
    data: any | undefined;
    message: string;
    name: string
  }[]
) {
  if(file_result){
    file_result = file_result.filter((value) => value.name === 'modlist.json')
    if(file_result[0].data){
      const modlist = file_result[0].data.modlist
      return modlist
    }
    else{
      return []
    }
  }
  else{
    return []
  }
}

// export function getModListJSX(mod_list_local: modList[]) {
export function getModListJSXFileResult(file_result: {
  status: boolean;
  data: any;
  message: string;
  name: string;
}[]) {
  const mod_list_local = getModListResult(file_result)
  const modDisplayList = makeDisplayList(mod_list_local);
  const displayModJSX = loopAndDisplayDependency(modDisplayList, true);
  return displayModJSX
}

export function getModListJSXModList(modlist: modList[]) {
  const modDisplayList = makeDisplayList(modlist);
  const displayModJSX = loopAndDisplayDependency(modDisplayList, true);
  return displayModJSX
}

// function getModListJSX(modlist: modList[]) {
//   const mod_list_local = getModListResult(file_result)
//   const modDisplayList = makeDisplayList(mod_list_local);
//   const displayModJSX = loopAndDisplayDependency(modDisplayList, true);
//   return displayModJSX
// }

// export getModListJSX