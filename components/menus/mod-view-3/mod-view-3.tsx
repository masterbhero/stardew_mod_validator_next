import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import modList , { modListDisplay, mod_detail, mod_detail_optional } from '../../../interface/modList'
import TriangleIcon from "../../../assets/triangle-white.png"
import VersionIcon from "../../../assets/version-white.png"
import DescriptionIcon from "../../../assets/description-white.png"
import FolderIcon from "../../../assets/folder-white.png"
import UrlIcon from "../../../assets/url-white.png"
import TagIcon from "../../../assets/tag-white.png"
import DependencyIcon from '../../../assets/dependency-white.png'
import Styles from './mod-view-3.module.scss';
import _ from 'lodash';
import { getRequest } from '../../functions/http/get';
import { putRequest } from '../../functions/http/put';

export default function ModView3(DisplayMod:JSX.Element | JSX.Element[]){

    // return (
    //     <div className='' id='mod-view'>
    //       {/* <div className='tw-px-10 tw-py-5'><button className={`${Styles.button}`} onClick={() => {makeDisplayList()}}>reload</button></div> */}
    //       <div className='tw-flex tw-flex-col tw-overflow-auto'
    //         // onMouseDown={(event) => {console.log(event)}}
    //       > 
    //           {
    //               DisplayMod
    //           }
    //       </div>
    //     </div>
    // )

    return (
      <>
      {
        DisplayMod
      }
      </>
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

export function loopAndDisplayDependency(mod_list:modListDisplay[] | undefined,set_modListJSX: Dispatch<SetStateAction<JSX.Element>>,ReloadMod:() => Promise<void>,modview?:boolean):JSX.Element
export function loopAndDisplayDependency(mod_list:modListDisplay[] | undefined,set_modListJSX: Dispatch<SetStateAction<JSX.Element>>,ReloadMod:() => Promise<void>,modview?:boolean):JSX.Element[] 
export function loopAndDisplayDependency(mod_list:modListDisplay[] | undefined,set_modListJSX: Dispatch<SetStateAction<JSX.Element>>,ReloadMod:() => Promise<void>,modview?:boolean):any {
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
            // `  
            //   tw-flex tw-flex-col 
            //   tw-m-4 tw-ml-10 
            //   tw-px-4 tw-py-2 
            //   tw-border-2 
            //   tw-h-[calc(16px+44px+36px+17px+204px)] 
            //  ` 
            `  
              tw-flex tw-flex-col 
              tw-m-4 tw-ml-10 
              tw-px-4 tw-py-2 
              tw-border-2 
              tw-h-[calc(16px+44px+36px+17px+160px)] 
             ` 
            + (modview ? `tw-mt-0` : `tw-mt-10`)
          } 
          id='main'
          >
              {/* <div className='tw-flex tw-items-center tw-justify-between tw-min-w-[200px]'> */}
              <div className='tw-flex tw-items-center tw-justify-between '>
                <div className={`tw-w-10 tw-h-10`}>
                  <Image src={modview ? FolderIcon : DependencyIcon} alt="" priority className="tw-w-full tw-h-auto"/>
                  {/* <Image src={modview ? FolderIcon : DependencyIcon} alt="" width={150} height={150}/> */}
                </div>
                <div className='tw-flex tw-items-center tw-justify-center tw-pl-4'>
                  <div className={`${Styles.name} ${Styles[displayStatus(value.status)]}`}>
                    {value.name}
                  </div>
                </div>
              </div>
              <DisplayModDetail props={{
                modData: value
              }} />
              <div className='tw-flex tw-justify-between tw-mt-2'>
                <div>
                  <button className={`${Styles.button} ${(value.editMode ? Styles.save : Styles.edit)}`} onClick={() => {toggleEditMode(value,mod_list,set_modListJSX,ReloadMod)}}>
                    {
                      value.editMode 
                      ? <div>save</div>
                      : <div>edit</div>
                    }
                  </button>
                </div>
                <div><button className={`${Styles.button} ${Styles.remove}`} onClick={async () => {await removeIndexIdFromArray(value,mod_list,ReloadMod)}}>remove</button></div>
              </div>
          </div>
          <div className={`tw-mt-24` }> 
            {
              loopAndDisplayDependency(value.dependency,set_modListJSX,ReloadMod)
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
}[],
set_modListJSX: Dispatch<SetStateAction<JSX.Element>>,
ReloadMod:() => Promise<void>,
sorting:{
  alphabet:boolean
} = {
  alphabet:true
}
){
  const mod_list_local = getModListResult(file_result)
  const modDisplayList = makeDisplayList(mod_list_local);
  sorting.alphabet ? modDisplayList.sort((a, b) => a.name.localeCompare(b.name)) : ""
  const displayModJSX = loopAndDisplayDependency(modDisplayList,set_modListJSX,ReloadMod, true);
  return displayModJSX
}

export function getModListJSXModList(modlist: modList[],set_modListJSX: Dispatch<SetStateAction<JSX.Element>>,ReloadMod:() => Promise<void>,sorting:{
  alphabet:boolean
} = {
  alphabet:true
}
) {
  const modDisplayList = makeDisplayList(modlist);
  sorting.alphabet ? modDisplayList.sort((a, b) => a.name.localeCompare(b.name)) : ""
  const displayModJSX = loopAndDisplayDependency(modDisplayList,set_modListJSX,ReloadMod, true);
  return displayModJSX
}

// function getModListJSX(modlist: modList[]) {
//   const mod_list_local = getModListResult(file_result)
//   const modDisplayList = makeDisplayList(mod_list_local);
//   const displayModJSX = loopAndDisplayDependency(modDisplayList, true);
//   return displayModJSX
// }

// export getModListJSX

function EditModDetail({props}:{props:{modData:modListDisplay}}){
  return (
    <div className={`tw-flex tw-flex-col`} >
      <div className={` tw-h-40 tw-flex tw-flex-col tw-transition-height tw-duration-500`} id="detail-div">
        <div className='tw-flex tw-items-center tw-mt-2' id='version'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={VersionIcon} alt="version" className={` tw-w-full tw-h-auto`} title="version"/>
          </div>
          <div className='tw-ml-2 tw-w-full'>
            <input value={props.modData.version ? props.modData.version : "no data"} className="tw-pl-1 tw-w-full"/>
          </div>
        </div>
        <div className='tw-flex tw-items-center tw-mt-2' id='description'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={DescriptionIcon} alt="" className={` tw-w-full tw-h-auto`} title="description"/>
          </div>
          <div className='tw-ml-2 tw-w-full'>
            <input value={props.modData.description ? props.modData.description : "no data"} className="tw-pl-1 tw-w-full"/>
          </div>
        </div>
        <div className='tw-flex tw-items-center tw-mt-2' id='tag'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={TagIcon} alt="" className={` tw-w-full tw-h-auto`} title="tag"/>
          </div>
          <div className='tw-ml-2 tw-w-full'>
            <input value={props.modData.tag ? props.modData.tag : "no data"} className="tw-pl-1 tw-w-full"/>
          </div>
        </div>
        <div className='tw-flex tw-items-center tw-mt-2' id='refFolder'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={FolderIcon} alt="" className={` tw-w-full tw-h-auto`} title="refFolder"/>
          </div>
          <div className='tw-ml-2 tw-w-full'>
            <input value={props.modData.refFolder ? props.modData.refFolder : "no data"} className="tw-pl-1 tw-w-full"/>
          </div>
        </div>
        <div className='tw-flex tw-items-center tw-mt-2' id='url'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={UrlIcon} alt="" className={` tw-w-full tw-h-auto`} title="url"/>
          </div>
          <div className='tw-ml-2 tw-w-full'>
            <input value={props.modData.url ? props.modData.url : "no data"} className="tw-pl-1 tw-w-full"/>
          </div>
        </div>
      </div>
    </div>
  )
}

function DisplayModDetail({props}:{props:{modData:modListDisplay}}){

  // const display_data:mod_detail_optional = {
  //   ...modData
  // }

  // const icon_data = [
  //   {name:"version",icon:VersionIcon},
  //   {name:"dependency",icon:DescriptionIcon},
  //   {name:"url",icon:UrlIcon},
  //   {name:"refFolder",icon:FolderIcon},
  //   {name:"tag",icon:TagIcon},
  // ]

  // const validate_mod_detail:boolean = (
  //   _.has(props.modData,"version") ||
  //   _.has(props.modData,"description") ||
  //   _.has(props.modData,"url") ||
  //   _.has(props.modData,"refFolder") ||
  //   _.has(props.modData,"tag") 
  // )

  return (
    <div className={`tw-flex tw-flex-col`} >
    {/* <div className={( (validate_mod_detail) ? `` : `tw-h-0 tw-hidden`) + ` tw-flex tw-flex-col`} > */}
      {/* <div className={( (validate_mod_detail) ? `` : `tw-h-0 tw-hidden`) + ` tw-flex tw-items-center tw-mt-2 tw-h-9 tw-cursor-pointer`}>
        <div className={` tw-w-4 tw-h-4 tw-transition-all tw-duration-500`}>
          <Image src={TriangleIcon} alt="" className={` tw-w-full tw-h-auto`}/>
        </div>
        <div className='tw-ml-2'>
          show more detail
        </div>
      </div> */}
      <div className={` tw-h-40 tw-flex tw-flex-col tw-transition-height tw-duration-500`} id="detail-div">
        <div className='tw-flex tw-items-center tw-mt-2' id='version'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={VersionIcon} alt="version" className={` tw-w-full tw-h-auto`} title="version"/>
          </div>
          <div className='tw-ml-2 tw-w-full'>
            <input defaultValue={props.modData.version ? props.modData.version : "no data"} readOnly={(props.modData.editMode ? false : true)} className={(props.modData.editMode ? `tw-bg-green-800` : ``) + ` tw-pl-1 tw-w-full`}/>
          </div>
        </div>
        <div className='tw-flex tw-items-center tw-mt-2' id='description'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={DescriptionIcon} alt="" className={` tw-w-full tw-h-auto`} title="description"/>
          </div>
          <div className='tw-ml-2 tw-w-full'>
            <input defaultValue={props.modData.description ? props.modData.description : "no data"} readOnly={(props.modData.editMode ? false : true)} className={(props.modData.editMode ? `tw-bg-green-800` : ``) + ` tw-pl-1 tw-w-full`}/>
          </div>
        </div>
        <div className='tw-flex tw-items-center tw-mt-2' id='tag'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={TagIcon} alt="" className={` tw-w-full tw-h-auto`} title="tag"/>
          </div>
          <div className='tw-ml-2 tw-w-full'>
            <input defaultValue={props.modData.tag ? props.modData.tag : "no data"} readOnly={(props.modData.editMode ? false : true)} className={(props.modData.editMode ? `tw-bg-green-800` : ``) + ` tw-pl-1 tw-w-full`}/>
          </div>
        </div>
        <div className='tw-flex tw-items-center tw-mt-2' id='refFolder'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={FolderIcon} alt="" className={` tw-w-full tw-h-auto`} title="refFolder"/>
          </div>
          <div className='tw-ml-2 tw-w-full'>
            <input defaultValue={props.modData.refFolder ? props.modData.refFolder : "no data"} readOnly={(props.modData.editMode ? false : true)} className={(props.modData.editMode ? `tw-bg-green-800` : ``) + ` tw-pl-1 tw-w-full`}/>
          </div>
        </div>
        <div className='tw-flex tw-items-center tw-mt-2' id='url'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={UrlIcon} alt="" className={` tw-w-full tw-h-auto`} title="url"/>
          </div>
          <div className='tw-ml-2 tw-w-full'>
            <input defaultValue={props.modData.url ? props.modData.url : "no data"} readOnly={(props.modData.editMode ? false : true)} className={(props.modData.editMode ? `tw-bg-green-800` : ``) + ` tw-pl-1 tw-w-full`}/>
          </div>
        </div>
      </div>
    </div>
  )

}

async function removeIndexIdFromArray(mod_index:modListDisplay,mod_list:modListDisplay[], ReloadMod:() => Promise<void>){
  let new_mod_list = [...mod_list]
  const loopArr = ((loop_modlist:modListDisplay[]) => {
    for(let mod of loop_modlist){
      if(_.isEqual(mod_index,mod)){
        var confirm_result:boolean = confirm(`are you sure you want to remove ${mod.name}`)
        if(confirm_result){
          const index = loop_modlist.indexOf(mod)
          if (index !== -1) {
            loop_modlist.splice(index, 1);
          }
        }
      }
      if(mod.dependency && mod.dependency.length > 0){
        loopArr(mod.dependency)
      }
    }
    return loop_modlist
  })
  loopArr(new_mod_list)
  await updateModListJson(new_mod_list)
  await ReloadMod()
}

function findIndexIdFromArray(mod_index:modListDisplay,mod_list:modListDisplay[]){
  let new_mod_list = [...mod_list]
  const loopArr = ((loop_modlist:modListDisplay[]) => {
    for(let mod of loop_modlist){
      if(_.isEqual(mod_index,mod)){
        const index = loop_modlist.indexOf(mod)
        if (index !== -1) {
          console.log("found index",index)
        }
      }
      if(mod.dependency && mod.dependency.length > 0){
        loopArr(mod.dependency)
      }
    }
    return loop_modlist
  })
  loopArr(new_mod_list)
}

async function toggleEditMode(mod_index:modListDisplay,mod_list:modListDisplay[],set_modListJSX: Dispatch<SetStateAction<JSX.Element>>,ReloadMod:() => Promise<void>){
  let new_mod_list = [...mod_list]
  let update = false;
  const loopArr = ((loop_modlist:modListDisplay[]) => {
    for(let mod of loop_modlist){
      if(_.isEqual(mod_index,mod)){
        const index = loop_modlist.indexOf(mod)
        if (index !== -1) {
          // console.log("found index",index)
          update = loop_modlist[index].editMode ? true : false
          loop_modlist[index].editMode = !loop_modlist[index].editMode
        }
      }
      if(mod.dependency && mod.dependency.length > 0){
        loopArr(mod.dependency)
      }
    }
    return loop_modlist
  })
  loopArr(new_mod_list)
  console.log(new_mod_list)
  console.log(update)
  const mod_list_update: modList[] = [...new_mod_list]  
  set_modListJSX(getModListJSXModList(mod_list_update,set_modListJSX,ReloadMod))
}

async function updateModListJson(new_mod_list:modListDisplay[]){
  const search_params = new URLSearchParams( { "path":"modlist.json" } )
  const getModListResult = await getRequest(`./api/get-setting`,search_params)
  if(getModListResult.status){
    const url = `./api/edit-setting`
    let new_modelist:modList[] = [...new_mod_list]

    const postbody = {
      name:'modlist.json',
      field:'modlist',
      data:new_modelist,
    }
    // console.log("postbody",postbody)
    const saveResult = await putRequest(url,postbody)
    if(saveResult.status){
        alert('save successfull')
    }
    else{
        alert('save fail')
    }
  }
  else{
    alert("search modlist fail")
  }
}