import Image from "next/image";
import { ChangeEvent, createRef, RefObject, useEffect, useState } from "react";
import useModList from "../../../hooks/useModlist";
import { useModListDisplay } from "../../../hooks/useModlistDisplay";
import useSetting from "../../../hooks/useSetting";
import modList, { modListDisplay,mod_detail } from "../../../interface/modList";
import _ from 'lodash';
import ShowDependencyIcon from '../../../assets/triangle-white.png'
import VersionIcon from "../../../assets/version-white.png"
import DescriptionIcon from "../../../assets/description-white.png"
import FolderIcon from "../../../assets/folder-white.png"
import UrlIcon from "../../../assets/url-white.png"
import TagIcon from "../../../assets/tag-white.png"
import NameIcon from "../../../assets/name-white.png"
import AddIcon from "../../../assets/add-white.png"
import DependencyIcon from '../../../assets/dependency-white.png'
import { checkStringForModListDisplayProperty } from "../../../functions/validations/check-string-for-mod-list-display-property";
import { getRequest } from "../../functions/http/get";
import { putRequest } from "../../functions/http/put";
import { useDispatch } from "react-redux";
import { set_useSettingState } from "../../../store/useSettingSlice";
import { genRandomId } from "../../../functions/others/gen-random-id";
import { formatDate } from "../../../functions/format/format-iso-to-date";
import { useModListUnEdit } from "../../../hooks/useModListUnEdit";
import Link from "next/link";
import { set_keepDisplayDependency } from "../../../store/keepDisplayDependencySlice";
import { useUniqueTags } from "../../../hooks/useUniqueTags";
import { useHiddenTags } from "../../../hooks/useHiddenTags";
import { ModStatus } from "./components/mod-status";
import { useHiddenStatus } from "../../../hooks/useHiddenStatus";

function ModList() {
  const modList: modList[] = useModList().data;
  // const modListDisplayState: modListDisplay[] = useModListDisplay(modList);
  // const [modListDisplayState, setModListDisplayState] = useState<modListDisplay[]>(useModListDisplay(modList));
  const [uniqueTags, setUniqueTags] = useUniqueTags(modList)
  const [modListUnEdit,set_modListUnEdit] = useModListUnEdit(modList);
  const [modListDisplayState, setModListDisplayState] = useModListDisplay(modList);
  const [hiddenTags,set_hiddenTags] = useHiddenTags(modList)
  const [hiddenStatus,set_hiddenStatus] = useHiddenStatus(modList)

  const dispatch = useDispatch();

  const [displayAddNewModState,set_displayAddNewModState] = useState<boolean>(false)

  const [displaySelectModDisplayModal,set_displaySelectModDisplayModal] = useState<boolean>(false)

  const statusList = [1,2,3]

  const searchCategoryList = ["name","tag"]

  const [selectedSearchCategory,set_selectedSearchCategory] = useState(searchCategoryList[0])

  const searchBar = createRef<HTMLInputElement>()

  useEffect(() => {
    console.log(uniqueTags)
  })

  // const [displayDependencyGlobal,set_displayDependencyGlobal]

  // setModListDisplayState(useModListDisplay(modList))
  // console.log(modListDisplayState)
  // console.log("useModListDisplay",useModListDisplay(modList))
  // useEffect(() => {
  //   setModListDisplayState([])
  // },[])

  // useEffect(() => {
  //   console.log(checkStringForModListDisplayProperty("displayAddDependency"))
  //   console.log(checkStringForModListDisplayProperty("datadd"))
  // },[])

  async function getHiddenTagsSetting(){
    const http_data = await getRequest(`./api/get-setting`,`path=setting.json`)
    console.log("http_data",http_data)
    if(
      http_data.data.hasOwnProperty("stardew_location") &&
      http_data.data.hasOwnProperty("hidden_tags") &&
      (Array.isArray(http_data.data.hidden_tags) && http_data.data.hidden_tags.every((item:any) => typeof item === 'string'))
    ){
      const tags = http_data.data.hidden_tags as string[]
      set_hiddenTags(tags)
      set_displaySelectModDisplayModal(!displaySelectModDisplayModal)
    }
  }

  async function updateHiddenTags(event: ChangeEvent<HTMLInputElement>,tag:string){
    const http_data = await getRequest(`./api/get-setting`,`path=setting.json`)
    if(
      http_data.data.hasOwnProperty("stardew_location") &&
      http_data.data.hasOwnProperty("hidden_tags") &&
      (Array.isArray(http_data.data.hidden_tags) && http_data.data.hidden_tags.every((item:any) => typeof item === 'string'))
    ){
      let tags = [...http_data.data.hidden_tags as string[]]
      console.log(event)
      if(!event.target.checked){
        //default false mean tag is hide so take it out
        const index = tags.findIndex((tags_index) => {
          return tags_index === tag
        })
        if(index !== -1){
          tags.splice(index,1)
        }
      }
      else{
        //default true mean tag is not hide so put it in hidden tags
        tags.push(tag)
      }
      const update_result = await putRequest("./api/edit-setting",{name:"setting.json",field:"hidden_tags",data:tags})
      if(update_result.status){
        console.log("update tags success",update_result)
        if(
          update_result.data.hasOwnProperty('new_data') &&
          update_result.data.new_data.hasOwnProperty('hidden_tags') &&
          Array.isArray(update_result.data.new_data.hidden_tags)
        ){
          const new_tags = update_result.data.new_data.hidden_tags as string[]
          set_hiddenTags(new_tags)
        }
      }
      else{
        alert("update hidden_tags fail")
      }
    }
  }

  async function updateHiddenStatus(event: ChangeEvent<HTMLInputElement>,status:number){
    const http_data = await getRequest(`./api/get-setting`,`path=setting.json`)
    if(
      http_data.data.hasOwnProperty("stardew_location") &&
      http_data.data.hasOwnProperty("hidden_status") &&
      (Array.isArray(http_data.data.hidden_status) && http_data.data.hidden_status.every((item:any) => typeof item === 'number'))
    ){
      let status_list_clone = [...http_data.data.hidden_status as number[]]
      console.log(event)
      if(!event.target.checked){
        //default false mean status is hide so take it out
        const index = status_list_clone.findIndex((status_index) => {
          return status_index === status
        })
        if(index !== -1){
          status_list_clone.splice(index,1)
        }
      }
      else{
        //default true mean status is not hide so put it in hidden status
        status_list_clone.push(status)
      }
      const update_result = await putRequest("./api/edit-setting",{name:"setting.json",field:"hidden_status",data:status_list_clone})
      if(update_result.status){
        console.log("update status success",update_result)
        if(
          update_result.data.hasOwnProperty('new_data') &&
          update_result.data.new_data.hasOwnProperty('hidden_status') &&
          Array.isArray(update_result.data.new_data.hidden_status)
        ){
          const new_status = update_result.data.new_data.hidden_status as number[]
          set_hiddenStatus(new_status)
        }
      }
      else{
        alert("update hidden_status fail")
      }
    }
  }

  async function btnClickShowDependency(mod:modListDisplay){
    await loopArray(mod,'toggle',{field:"displayDependency"}) 
    dispatch(set_keepDisplayDependency({type:"add",id:mod.id}))
  }

  async function btnClickHideDependency(mod:modListDisplay){
    await loopArray(mod,'toggle',{field:"displayDependency"}) 
    dispatch(set_keepDisplayDependency({type:"remove",id:mod.id}))
  }

  /**
   * first time this has been added is because I want to check if tag is includes in hidden_tags in setting.json
   * if it include in there meaning it has been set to hidden
   * can add some more condition in the future
   */
  function checkRenderModListDisplayCondition(mod: modListDisplay){
    if(mod.tag && mod.tag.some(tag => hiddenTags.includes(tag))){
      return false
    }

    if(mod.status && hiddenStatus.includes(mod.status)){
      return false
    }

    return true
  }

  function renderModList(modList: modListDisplay[]) {
    return modList.map((mod) => {
      return checkRenderModListDisplayCondition(mod) && (
        <div key={mod.id} className={`tw-mb-4`}>
          <div className="tw-flex">
            <div id="main-box">
              <div id="main" className="tw-inline-flex tw-flex-col tw-border-2 tw-border-white tw-mb-4 tw-p-4">
                <div id="mod_name" className={`tw-mb-4`}>
                  <div className={`tw-flex tw-justify-center ${mod.status === 1 ? "tw-text-success" : mod.status === 2 ? "tw-text-warning" : "tw-text-danger"}`}>
                    <div>{mod.name}</div>
                    <div className="tw-flex tw-items-center">
                      {/* <Link href="https://twitter.com/" passHref> */}
                      <Link href={`${mod.url}`} target="_blank" passHref>
                        <Image src={UrlIcon} alt="url-icon" className={`tw-w-6 tw-ml-2`} />
                      </Link>
                    </div>
                  </div>
                  <div>Added {formatDate(mod.create_date)}</div>
                  <div className="tw-flex">
                    <div className="tw-mr-4">
                      tags : 
                    </div>
                    {
                      mod.tag && mod.tag.map((value,index) => {
                        return (
                          <div key={index} 
                            className="tw-bg-gray-800 tw-text-white
                              tw-px-2 tw-rounded-lg tw-mr-2
                            "
                          >
                            {value}
                          </div>                       
                        )
                      })
                    }
                  </div>
                </div>
                <div id="button-area" className="tw-flex tw-justify-between tw-mb-4">
                  <button className="tw-border-2 tw-border-white tw-px-2" onClick={async () => {
                    await loopArray(mod,'toggle',{field:"editMode"});
                    !mod.displayModDetail && await loopArray(mod,'toggle',{field:"displayModDetail"});
                  }}>Edit</button>
                  <button className="tw-border-2 tw-border-white tw-px-2" onClick={async () => {await loopArray(mod,'remove_mod',{update_mod_list:true})}}>Remove</button>
                </div>
                <div className={``}>
                  {
                    mod.displayModDetail
                    ? (
                      <div>
                        <button className="tw-inline-flex tw-justify-center tw-items-center" onClick={async () => {
                          await loopArray(mod,'toggle',{field:"displayModDetail"})}
                        }>
                            <Image src={ShowDependencyIcon} alt="add-icon" className={`${mod.displayModDetail ? `tw-rotate-180 tw-duration-300` : `tw-rotate-90 tw-duration-300`} tw-w-6 tw-mr-2`}/>
                            <div>
                              hide detail
                            </div>
                        </button>
                      </div>
                    )
                    : (
                      <div>
                        <button className="tw-inline-flex tw-justify-center tw-items-center" onClick={async () => {
                          await loopArray(mod,'toggle',{field:"displayModDetail"})}
                        }>
                            <Image src={ShowDependencyIcon} alt="add-icon" className={`${mod.displayModDetail ? `tw-rotate-180 tw-duration-300` : `tw-rotate-90 tw-duration-300`} tw-w-6 tw-mr-2`}/>
                            <div>
                              show detail
                            </div>
                        </button>
                      </div>
                    )
                  }
                </div>
                <div>
                  {
                    mod.displayModDetail && DisplayModDetail(mod)
                  }
                </div>
              </div>
            </div>
            <div id="add-box" className="tw-ml-4">           
              <div id="display_add_dependency" className={`tw-flex tw-mb-4`}>
                {mod.displayAddDependency && AddNewMod("Dependency",mod)}
              </div>
              <div id="add_new_dependency" className={`tw-ml-4 tw-mb-4`}>
                {
                  !mod.displayAddDependency && (
                    <button className="tw-inline-flex tw-justify-center tw-items-center" onClick={async () => {
                      await loopArray(mod,'set',{field:"displayAddDependency",set_value:{set_boolean:true}})}
                    }>
                        <Image src={AddIcon} alt="add-icon" className={`tw-w-6 tw-mr-2`}/>
                        <div>
                          Add New Dependency
                        </div>
                    </button>
                  )
                }
              </div>
              <div id="show_or_hide_dependency" className={`tw-ml-4 tw-mb-4`}>
              {
                mod.displayDependency
                ? (
                  <div>
                    <button className="tw-inline-flex tw-justify-center tw-items-center" onClick={async () => {
                      // mod.dependency && mod.dependency.length > 0  && await loopArray(mod,'toggle',{field:"displayDependency"})}
                      (
                        mod.dependency && mod.dependency.length > 0  &&
                        (
                          btnClickHideDependency(mod)
                        )
                      )
                    }}>
                        <Image src={ShowDependencyIcon} alt="add-icon" className={`${mod.displayDependency ? `tw-rotate-180 tw-duration-300` : `tw-rotate-90 tw-duration-300`} tw-w-6 tw-mr-2`}/>
                        <div>
                          {
                            mod.dependency && mod.dependency.length > 0
                            ? (
                              <div className="tw-text-success-border">hide dependency</div>
                            )
                            : (
                              <div className="tw-text-gray-500">no dependency</div>
                            )
                          }
                        </div>
                    </button>
                  </div>
                )
                : (
                  <div>
                    <button className="tw-inline-flex tw-justify-center tw-items-center" onClick={async () => {
                      (
                        mod.dependency && mod.dependency.length > 0  && 
                        (
                          btnClickShowDependency(mod)
                        )
                      )
                    }}>
                        <Image src={ShowDependencyIcon} alt="add-icon" className={`${mod.displayDependency ? `tw-rotate-180 tw-duration-300` : `tw-rotate-90 tw-duration-300`} tw-w-6 tw-mr-2`}/>
                        <div>
                          {
                            mod.dependency && mod.dependency.length > 0
                            ? (
                              <div className="tw-text-success">show dependency</div>
                            )
                            : (
                              <div className="tw-text-gray-500">no dependency</div>
                            )
                          }
                        </div>
                    </button>
                  </div>
                )
              }
              </div>
            </div>
          </div>
          <div id="renderModList">
          {mod.dependency && mod.dependency.length > 0 && mod.displayDependency && (
            <>
              <div className={`tw-ml-10`}>{renderModList(mod.dependency)}</div>
            </>
          )}
          </div>
        </div>
      );
    });
  }

  function removeModFromArr(mod:modListDisplay,loop_modlist:modListDisplay[]){
    const confirm_result:boolean = confirm(`are you sure you want to remove ${mod.name}`)
    // console.log(confirm_result)
    // if(confirm_result === true){
    //   const index = loop_modlist.indexOf(mod)
    //   if (index !== -1) {
    //     loop_modlist.splice(index, 1);
    //   }
    // }
    // return loop_modlist
    return confirm_result
  }

  function toggleModData(mod:modListDisplay,loop_modlist:modListDisplay[],field:"displayDependency" | "displayAddDependency" | "displayModDetail" | "editMode"){
    const index = loop_modlist.indexOf(mod)
    if (index !== -1) {
      loop_modlist[index][field] = !loop_modlist[index][field]
    }
    return loop_modlist
  }

  function setModData(mod:modListDisplay,loop_modlist:modListDisplay[],field:"id"|"name"|"displayAddDependency"|"displayDependency"|"displayMod"|"dependency"|"displayModDetail"|"description"|"version"|"url"|"refFolder"|"tag"|"status"|"editMode",
  set_value:{
    set_string?:string , set_string_arr?:string[] , set_boolean?:boolean , set_mod_list_display?:modListDisplay[]
  } ){
    const index = loop_modlist.indexOf(mod)
    if (index !== -1) {
      if(field === "id" || field === "name" || field === "description" || field === "version" || field === "url" || field === "refFolder"){
        set_value.set_string && (loop_modlist[index][field] = set_value.set_string)
      }
      else if(field === "displayAddDependency" || field === "displayDependency" || field === "displayMod" || field === "displayModDetail" || field === "editMode" ){
        loop_modlist[index][field] = set_value.set_boolean
      }
      else if(field === "tag"){
        set_value.set_string_arr && (loop_modlist[index][field] = set_value.set_string_arr)
      }
      else if(field === "dependency"){
        set_value.set_mod_list_display && (loop_modlist[index][field] = set_value.set_mod_list_display)
      }
    }
    return loop_modlist
  }

  function updateModListData(mod:modListDisplay,loop_modlist:modListDisplay[],update_data:modListDisplay){
    const index = loop_modlist.indexOf(mod)
    if (index !== -1) {
      loop_modlist[index] = update_data
    }
    return loop_modlist
  }

  function addNewDependency(mod:modListDisplay,loop_modlist:modListDisplay[],new_dependency:modListDisplay){
    const index = loop_modlist.indexOf(mod)
    if (index !== -1) {
      if(loop_modlist[index].dependency){
        loop_modlist[index].dependency?.push(new_dependency)
      }
      else{
        let new_dependency_arr:modListDisplay[] = []
        new_dependency_arr.push(new_dependency)
        loop_modlist[index].dependency = new_dependency_arr
      }
    }
    return loop_modlist
  }

  function DisplayModDetail(mod_list_display_data:modListDisplay){

    const detail_div_ref = createRef<HTMLDivElement>()

    return (
      <div className={`tw-flex tw-flex-col`} >
        <div className={`tw-flex tw-flex-col tw-transition-height tw-duration-500 tw-mb-4`} id="detail-div" ref={detail_div_ref}>
          <div className='tw-flex tw-items-center tw-mt-2' id='name'>
            <div className={`tw-w-4 tw-h-4`}>
              <Image src={NameIcon} alt="name" className={` tw-w-full tw-h-auto`} title="name"/>
            </div>
            <div className='tw-ml-2 tw-w-full'>
              <input placeholder="name" defaultValue={mod_list_display_data.name ? mod_list_display_data.name : "no data"} readOnly={(mod_list_display_data.editMode ? false : true)} className={(mod_list_display_data.editMode ? `tw-bg-green-800` : ``) + ` tw-pl-1 tw-w-full`}/>
            </div>
          </div>
          <div className='tw-flex tw-items-center tw-mt-2' id='version'>
            <div className={`tw-w-4 tw-h-4`}>
              <Image src={VersionIcon} alt="version" className={` tw-w-full tw-h-auto`} title="version"/>
            </div>
            <div className='tw-ml-2 tw-w-full'>
              <input placeholder="version" defaultValue={mod_list_display_data.version ? mod_list_display_data.version : "no data"} readOnly={(mod_list_display_data.editMode ? false : true)} className={(mod_list_display_data.editMode ? `tw-bg-green-800` : ``) + ` tw-pl-1 tw-w-full`}/>
            </div>
          </div>
          <div className='tw-flex tw-items-center tw-mt-2' id='description'>
            <div className={`tw-w-4 tw-h-4`}>
              <Image src={DescriptionIcon} alt="description" className={` tw-w-full tw-h-auto`} title="description"/>
            </div>
            <div className='tw-ml-2 tw-w-full'>
              <input placeholder="description" defaultValue={mod_list_display_data.description ? mod_list_display_data.description : "no data"} readOnly={(mod_list_display_data.editMode ? false : true)} className={(mod_list_display_data.editMode ? `tw-bg-green-800` : ``) + ` tw-pl-1 tw-w-full`}/>
            </div>
          </div>
          <div className='tw-flex tw-items-center tw-mt-2' id='tag'>
            <div className={`tw-w-4 tw-h-4`}>
              <Image src={TagIcon} alt="tag" className={` tw-w-full tw-h-auto`} title="tag"/>
            </div>
            <div className='tw-ml-2 tw-w-full'>
              <input placeholder="tag" defaultValue={mod_list_display_data.tag ? mod_list_display_data.tag : "no data"} readOnly={(mod_list_display_data.editMode ? false : true)} className={(mod_list_display_data.editMode ? `tw-bg-green-800` : ``) + ` tw-pl-1 tw-w-full`}/>
            </div>
          </div>
          <div className='tw-flex tw-items-center tw-mt-2' id='refFolder'>
            <div className={`tw-w-4 tw-h-4`}>
              <Image src={FolderIcon} alt="refFolder" className={` tw-w-full tw-h-auto`} title="refFolder"/>
            </div>
            <div className='tw-ml-2 tw-w-full'>
              <input placeholder="refFolder" defaultValue={mod_list_display_data.refFolder ? mod_list_display_data.refFolder : "no data"} readOnly={(mod_list_display_data.editMode ? false : true)} className={(mod_list_display_data.editMode ? `tw-bg-green-800` : ``) + ` tw-pl-1 tw-w-full`}/>
            </div>
          </div>
          <div className='tw-flex tw-items-center tw-mt-2' id='url'>
            <div className={`tw-w-4 tw-h-4`}>
              <Image src={UrlIcon} alt="url" className={` tw-w-full tw-h-auto`} title="url"/>
            </div>
            <div className='tw-ml-2 tw-w-full'>
              <input placeholder="url" defaultValue={mod_list_display_data.url ? mod_list_display_data.url : "no data"} readOnly={(mod_list_display_data.editMode ? false : true)} className={(mod_list_display_data.editMode ? `tw-bg-green-800` : ``) + ` tw-pl-1 tw-w-full`}/>
            </div>
          </div>
        </div>
        <div className={`${mod_list_display_data.editMode ? `tw-flex` : `tw-hidden`} tw-justify-between`}>
          <button className="tw-border-2 tw-border-white tw-px-2" onClick={async () => {await extractModDetailDataAndUpdateModlist(detail_div_ref,mod_list_display_data)}}>save</button>
          <button className="tw-border-2 tw-border-white tw-px-2" onClick={async () => {await loopArray(mod_list_display_data,"set",{field:"editMode",set_value:{set_boolean:false}})}}>cancel</button>
        </div>
      </div>
    )
  }

  function AddNewMod(add_type:"Mod" | "Dependency",mod_list_display_data?:modListDisplay){
    const detail_div_ref = createRef<HTMLDivElement>()

    return (
      <div className={`tw-flex tw-flex-col tw-border-2 tw-border-white tw-p-4`} >
        <div>
          Add New {add_type}
        </div>
        <div id="detail-div" className={`tw-flex tw-flex-col tw-transition-height tw-duration-500 tw-mb-4`} ref={detail_div_ref}>
          <div className='tw-flex tw-items-center tw-mt-2' id='name'>
            <div className={`tw-w-4 tw-h-4`}>
              <Image src={NameIcon} alt="name" className={` tw-w-full tw-h-auto`} title="name"/>
            </div>
            <div className='tw-ml-2 tw-w-full'>
              <input placeholder="name" className={` tw-pl-1 tw-w-full`}/>
            </div>
          </div>
          <div className='tw-flex tw-items-center tw-mt-2' id='version'>
            <div className={`tw-w-4 tw-h-4`}>
              <Image src={VersionIcon} alt="version" className={` tw-w-full tw-h-auto`} title="version"/>
            </div>
            <div className='tw-ml-2 tw-w-full'>
              <input placeholder="version" className={` tw-pl-1 tw-w-full`}/>
            </div>
          </div>
          <div className='tw-flex tw-items-center tw-mt-2' id='description'>
            <div className={`tw-w-4 tw-h-4`}>
              <Image src={DescriptionIcon} alt="description" className={` tw-w-full tw-h-auto`} title="description"/>
            </div>
            <div className='tw-ml-2 tw-w-full'>
              <input placeholder="description" className={` tw-pl-1 tw-w-full`}/>
            </div>
          </div>
          <div className='tw-flex tw-items-center tw-mt-2' id='tag'>
            <div className={`tw-w-4 tw-h-4`}>
              <Image src={TagIcon} alt="tag" className={` tw-w-full tw-h-auto`} title="tag"/>
            </div>
            <div className='tw-ml-2 tw-w-full'>
              <input placeholder="tag" className={` tw-pl-1 tw-w-full`}/>
            </div>
          </div>
          <div className='tw-flex tw-items-center tw-mt-2' id='refFolder'>
            <div className={`tw-w-4 tw-h-4`}>
              <Image src={FolderIcon} alt="refFolder" className={` tw-w-full tw-h-auto`} title="refFolder"/>
            </div>
            <div className='tw-ml-2 tw-w-full'>
              <input placeholder="refFolder" className={` tw-pl-1 tw-w-full`}/>
            </div>
          </div>
          <div className='tw-flex tw-items-center tw-mt-2' id='url'>
            <div className={`tw-w-4 tw-h-4`}>
              <Image src={UrlIcon} alt="url" className={` tw-w-full tw-h-auto`} title="url"/>
            </div>
            <div className='tw-ml-2 tw-w-full'>
              <input placeholder="url" className={` tw-pl-1 tw-w-full`}/>
            </div>
          </div>
        </div>
        <div id="button_zone" className={`tw-flex tw-justify-between`}>
          <button className="tw-border-2 tw-border-white tw-px-2" onClick={() => {
            (add_type === "Dependency" && mod_list_display_data && (extractModDetailDataAndAddNewDependency(detail_div_ref,mod_list_display_data)));
            (add_type === "Mod" && extractModDetailDataAndAddNewMod(detail_div_ref));
          }}>save</button>
          <button className="tw-border-2 tw-border-white tw-px-2" onClick={async () => {
            mod_list_display_data && await loopArray(mod_list_display_data,'set',{field:"displayAddDependency",set_value:{set_boolean:false}});
            add_type === "Mod" && set_displayAddNewModState(false);
          }}>cancel</button>
        </div>
      </div>
    )
  }

  async function extractModDetailDataAndAddNewMod(detail_div_ref:RefObject<HTMLDivElement>){
    const extracted_mod_detail = extractDetailDiv(detail_div_ref)
    const new_mod:modList = {
      ...extracted_mod_detail,
      id:genRandomId(),
      create_date:new Date().toISOString(),
    }
    // console.log(new_mod)
    let new_modlist = [...modListDisplayState]
    new_modlist.push(new_mod)
    await updateModListJson(new_modlist,{addMod:{status:true,mod_added:new_mod}})
  }

  async function extractModDetailDataAndAddNewDependency(detail_div_ref:RefObject<HTMLDivElement>,mod_list_display_data:modListDisplay){
    const extracted_mod_detail = extractDetailDiv(detail_div_ref)
    const new_dependency:modList = {
      ...extracted_mod_detail,
      id:genRandomId(),
      create_date:new Date().toISOString(),
    }
    await loopArray(mod_list_display_data,"add-new-dependency",{update_mod_list:true,added_data:new_dependency})
  }

  async function extractModDetailDataAndUpdateModlist(detail_div_ref:RefObject<HTMLDivElement>,mod_list_display_data:modListDisplay){
    const extracted_mod_detail = extractDetailDiv(detail_div_ref)
    const new_mod_list_display:modListDisplay = {
      ...mod_list_display_data,
      ...extracted_mod_detail
    }
    await loopArray(mod_list_display_data,"update",{update_data:new_mod_list_display,update_mod_list:true})
  }

  async function loopArray(
    mod_index: modListDisplay,
    action:string,
    option?:{
      field?:"id"|"name"|"displayAddDependency"|"displayDependency"|"displayMod"|"dependency"|"displayModDetail"|"description"|"version"|"url"|"refFolder"|"tag"|"status"|"editMode",
      set_value?:{
        set_string?:string , set_string_arr?:string[] , set_boolean?:boolean , set_mod_list_display?:modListDisplay[]
      },
      update_mod_list?:boolean,
      update_data?:modListDisplay,
      added_data?:modListDisplay,
    }
  ){
    let confirmRemoveMod = false;
    let new_mod_list = [...modListDisplayState]
    const loopArr = ((loop_modlist:modListDisplay[]) => {
      for(let mod of loop_modlist){
        if(_.isEqual(mod_index,mod)){
          // action after found
          switch(action){
            case 'remove_mod':
              // option && option.update_mod_list && removeModFromArr(mod_index,loop_modlist)
              if(option && option.update_mod_list){
                confirmRemoveMod = removeModFromArr(mod_index,loop_modlist)
              }
              break;
            case 'toggle':
              option &&
              option.field && 
              (option.field === "displayDependency" || option.field === "displayAddDependency" || option.field === "displayModDetail" || option.field === "editMode") && 
              toggleModData(mod_index,loop_modlist,option.field)
              break;
            case 'set':
              option &&
              option.field && option.set_value && (setModData(mod_index,loop_modlist,option.field,option.set_value))
              break;
            case 'update':
              option && option.update_mod_list &&
              option.update_data && (updateModListData(mod_index,loop_modlist,option.update_data))
              break;
            case 'add-new-dependency':
              option && option.update_mod_list &&
              option.added_data && (addNewDependency(mod_index,loop_modlist,option.added_data))
              break
            default:
              break;
          }
          // action after found
        }
        if(mod.dependency && mod.dependency.length > 0){
          loopArr(mod.dependency)
        }
      }
      return loop_modlist
    })
    loopArr(new_mod_list)
    console.log("new_mod_list",new_mod_list)
    setModListDisplayState(new_mod_list)
    if(action === "remove_mod" && confirmRemoveMod){
      option?.update_mod_list && (await updateModListJson(new_mod_list,{removeMod:{status:true,mod_removed:mod_index}}))
    }
    else{
      option?.update_mod_list && (await updateModListJson(new_mod_list))
    }
  }

  function replaceElements(original: modList[], newArray: modList[]) {
    return original.map(item => {
      // Find the element in the new array with the same id
      const newItem = newArray.find(newItem => newItem.id === item.id);
      // If a matching element is found, return it, otherwise return the original element
      return newItem ? newItem : item;
    });
  }

  async function updateModListJson(new_mod_list:modListDisplay[] , option?:{
    removeMod?:{
      status?:boolean,
      mod_removed?:modListDisplay
    }
    addMod?:{
      status?:boolean,
      mod_added?:modListDisplay
    }
  }){
    console.log(new_mod_list,option)
    const search_params = new URLSearchParams( { "path":"modlist.json" } )
    const getModListResult = await getRequest(`./api/get-setting`,search_params)
    let new_updated_with_unedit_modlist:modList[] = replaceElements(modListUnEdit,new_mod_list)
    //check remove
    if (option && option.removeMod && option.removeMod.status && option.removeMod.mod_removed) {
      //it's only loop main mod not dependency
      // const index = new_updated_with_unedit_modlist.findIndex((modIndex) => {
      //   return modIndex.id === option.removeMod?.mod_removed?.id
      // })
      // console.log(index)
      // if(index !== -1){
      //   console.log("began remove")
      //   new_updated_with_unedit_modlist.splice(index,1)
      //   console.log("remove complete",new_updated_with_unedit_modlist)
      // }
      const loopArrToRemove = ((mod_array_to_check:modList[]) => {
        for(let mod_index of mod_array_to_check){
          if(_.isEqual(mod_index,option.removeMod?.mod_removed)){
            // action after found
            const index = mod_array_to_check.findIndex((modIndex) => {
              return modIndex.id === option.removeMod?.mod_removed?.id
            })
            if(index !== -1){
              console.log("began remove")
              mod_array_to_check.splice(index,1)
              // console.log("remove complete",new_updated_with_unedit_modlist)
            }
          }
          if(mod_index.dependency && mod_index.dependency.length > 0){
            loopArrToRemove(mod_index.dependency)
          }
        }
      })
      loopArrToRemove(new_updated_with_unedit_modlist)
    }
    else if (option && option.addMod && option.addMod.status && option.addMod.mod_added) {
      // const index = new_updated_with_unedit_modlist.findIndex((modIndex) => {
      //   return modIndex.id === option.removeMod?.mod_removed?.id
      // })
      // if(index !== -1){
      //   new_updated_with_unedit_modlist.splice(index,1)
      // }
      new_updated_with_unedit_modlist.push(option.addMod.mod_added)
    } 
    //check remove
    if(getModListResult.status){
      const url = `./api/edit-setting`
      let new_modelist:modList[] = convertModListDisplayArrayToModListArray(new_updated_with_unedit_modlist)

      const postbody = {
        name:'modlist.json',
        field:'modlist',
        data:new_modelist,
      }
      console.log("postbody",postbody)
      const saveResult = await putRequest(url,postbody)
      if(saveResult.status){
          alert('save successfull')
          set_displayAddNewModState(false)
          dispatch(set_useSettingState({}))
      }
      else{
          alert('save fail')
      }
    }
    else{
      alert("search modlist fail")
    }
  }

  function extractDetailDiv(detail_div_ref: RefObject<HTMLDivElement>):mod_detail{
    let mod_detail_data:mod_detail = {
      name:"",
      description:"",
      refFolder:"",
      tag:[],
      url:"",
      version:"",
    }
    // console.log("detail_div_ref",detail_div_ref)
    // console.log("detail_div_ref",detail_div_ref.current)
    if(detail_div_ref.current){
      const detail_div_ref_children = detail_div_ref.current.children
      // console.log(children)
      for(let children = 0;children < detail_div_ref_children.length;children++){
        const input = detail_div_ref_children[children].querySelectorAll("input")[0]
        // console.log(input.value)
        // console.log(detail_div_ref_children[children].id)
        const match_id = (
          detail_div_ref_children[children].id === "name" ||
          detail_div_ref_children[children].id === "version" ||
          detail_div_ref_children[children].id === "description" ||
          detail_div_ref_children[children].id === "tag" ||
          detail_div_ref_children[children].id === "refFolder" ||
          detail_div_ref_children[children].id === "url" 
        )
        if(match_id){
          const id:"name" | "version" | "description" | "tag" | "refFolder" | "url" = detail_div_ref_children[children].id as "name" | "version" | "description" | "tag" | "refFolder" | "url"
          if(id === "tag"){
            mod_detail_data.tag = input.value.split(',')
          }
          else{
            mod_detail_data[id] = input.value
          }
        }
        else{
          console.log("div not match")
          alert("div not match")
        }
      }
    }
    else{
      console.log("no detail_div_ref")
      alert("no detail_div_ref")
    }
    return mod_detail_data
  }

  function convertModListDisplayToModList(mod: modListDisplay): modList {
    const convertedMod: modList = {
      id: mod.id,
      name: mod.name,
      create_date: mod.create_date
    };
  
    if (mod.dependency) {
      convertedMod.dependency = mod.dependency.map((dependency) =>
        convertModListDisplayToModList(dependency)
      );
    }
  
    if (mod.description) {
      convertedMod.description = mod.description;
    }
  
    if (mod.version) {
      convertedMod.version = mod.version;
    }
  
    if (mod.url) {
      convertedMod.url = mod.url;
    }
  
    if (mod.refFolder) {
      convertedMod.refFolder = mod.refFolder;
    }
  
    if (mod.tag) {
      convertedMod.tag = mod.tag;
    }
  
    return convertedMod;
  }  

  function convertModListDisplayArrayToModListArray(
    modListDisplayArray: modListDisplay[]
  ): modList[] {
    return modListDisplayArray.map((mod) =>
      convertModListDisplayToModList(mod)
    );
  }

  function filterModListByName(searchTerm: string): modListDisplay[] {
    return modListUnEdit.filter(mod => mod.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  function filterModListByTag(searchTerm: string): modListDisplay[] {
    return modListUnEdit.filter(mod => mod.tag && mod.tag.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
  }
  
  return <div className="tw-flex tw-flex-col">
    <ModStatus className="tw-mt-4 tw-flex tw-flex-col" modListDisplayState={modListDisplayState}/>
    <div id="add_new_mod" className="-tw-mb-4 tw-mt-4">
      <div>
      {
        !displayAddNewModState && (
          <button className="tw-inline-flex tw-justify-center tw-items-center" onClick={async () => {set_displayAddNewModState(true)}}>
              <Image src={AddIcon} alt="add-icon" className={`tw-w-6 tw-mr-2`}/>
              <div>
                Add New Mod
              </div>
          </button>
        )
      }
      </div>
      <div className="tw-inline-flex tw-mb-10">{displayAddNewModState && AddNewMod("Mod")}</div>
    </div>
    <div id="display_mod" className="tw-ml-10">
      <div id="mod sorter" className={`tw-flex tw-mb-4`}>                        
        <div className="tw-flex tw-items-center tw-mr-4 tw-h-9">Mods Display</div>
        <button 
          className="tw-bg-transparent tw-border-2 tw-border-white tw-rounded-md tw-px-2 tw-mr-2 tw-h-9"
          onClick={() => {getHiddenTagsSetting()}}
        >
          Select
        </button>
        {
          displaySelectModDisplayModal && (
            <div className="tw-bg-transparent tw-border-2 tw-border-white tw-rounded-md tw-px-2 tw-mr-2 tw-w-2/5">
              <div>tag list</div>
              <div className="tw-h-32 tw-flex tw-flex-col tw-flex-wrap tw-overflow-auto">
              {
                uniqueTags.map((value,index) => {
                  return value !== "" && (
                    <div key={index} className="tw-flex tw-mr-4">
                      <div className="tw-mr-2">
                        <input type="checkbox" name="" id="" checked={hiddenTags.includes(value) ? false : true} onChange={(event) => {updateHiddenTags(event,value)}}/>
                      </div>
                      <div>
                        {value}
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          )
        }
        {
          displaySelectModDisplayModal && (
            <div className="tw-bg-transparent tw-border-2 tw-border-white tw-rounded-md tw-px-2 tw-mr-2 tw-w-[10%]">
              <div>status list</div>
              <div className="tw-h-32 tw-flex tw-flex-col tw-flex-wrap tw-overflow-auto">
              {
                statusList.map((value,index) => {
                  return (
                    <div key={index} className="tw-flex tw-mr-4">
                      <div className="tw-mr-2">
                        <input type="checkbox" name="" id="" checked={hiddenStatus.includes(value) ? false : true} onChange={(event) => {updateHiddenStatus(event,value)}}/>
                      </div>
                      <div>
                        {value}
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          )
        }
      </div>
      <div id="mod search bar" className={`tw-flex tw-mb-4`}>
        <div className="tw-flex tw-items-center tw-mr-4">Search Mod</div>
        <input type="text" className={`tw-bg-transparent tw-border-2 tw-border-white tw-rounded-md tw-pl-2`} 
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            // setModListDisplayState(filterModListByName(event.target.value))}
            switch(selectedSearchCategory){
              case "name":
                setModListDisplayState(filterModListByName(event.target.value))
                break;
              case "tag":
                setModListDisplayState(filterModListByTag(event.target.value))
                break;
              default:
                break;
            }
          }
        } ref={searchBar}/>
        <div>
        <select 
          onChange={(event) => {
            // console.log("event.target.value",event.target.value);
            set_selectedSearchCategory(event.target.value);
            // console.log("selectedSearchCategory",selectedSearchCategory);
            // switch(selectedSearchCategory){
            //   case "name":
            //     searchBar.current?.value && setModListDisplayState(filterModListByName(searchBar.current.value))
            //     break;
            //   case "tag":
            //     searchBar.current?.value && setModListDisplayState(filterModListByTag(searchBar.current.value))
            //     break;
            //   default:
            //     break;
            // };
          }}
          className={`tw-bg-transparent tw-border-2 tw-border-white tw-ml-4 tw-rounded-md tw-p-2`}
        >
          {searchCategoryList.map((item) => (
            <option key={item} value={item} className={`tw-bg-black`}>
              {item}
            </option>
          ))}
        </select>
        </div>
      </div>
      <div>{renderModList(modListDisplayState)}</div>
    </div>
  </div>;
}

export default ModList;

//* - show/hide certain type of mod 
//* 	- ie hide all modding tool cause it's not ganna be search much
//*  - ie only show uninstalled or incomplete mod to hide all completed mod
//* - auto import from template to don't have to rewrite them multiple time