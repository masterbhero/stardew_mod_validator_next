import Image from 'next/image';
import _ from "lodash";
import {
  createRef,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { genRandomId } from "../../../../functions/others/gen-random-id";
import modList, { modListCreateDisplay, mod_detail } from "../../../../interface/modList";
import { getRequest } from "../../../functions/http/get";
import { putRequest } from "../../../functions/http/put";
import { MouseEvent } from "react";
import TriangleIcon from "../../../../assets/triangle-white.png"
import VersionIcon from "../../../../assets/version-white.png"
import DescriptionIcon from "../../../../assets/description-white.png"
import FolderIcon from "../../../../assets/folder-white.png"
import UrlIcon from "../../../../assets/url-white.png"
import TagIcon from "../../../../assets/tag-white.png"
import Styles from "./create.module.scss"

const buttonStyle = `tw-border-2 tw-border-white tw-mx-2 tw-px-2 `;

export default function ModMenuCreate2(props: {
  dependencyState: modListCreateDisplay[];
  set_dependencyState: Dispatch<SetStateAction<modListCreateDisplay[]>>;
  resetModMenuState:() => void
}) {
  const input_mod_ref = createRef<HTMLInputElement>()
  const dep_input_mod_ref = createRef<HTMLInputElement>()
  const detail_div_mod_ref = createRef<HTMLDivElement>()
  let main_mod_data:modListCreateDisplay = {
    id: '',
    name: '',
    displayModDetail: false
  }

  async function addMod(){
    const confirm_add = confirm(`do you want to add this mod ${input_mod_ref.current?.value}`)
    if(confirm_add){
      if(input_mod_ref.current?.value){
        const search_params = new URLSearchParams( { "path":"modlist.json" } )
        const getModListResult = await getRequest(`./api/get-setting`,search_params)
        if(getModListResult.status){
          const url = `./api/edit-setting`
          let new_modelist:modList[] = [...getModListResult.data.modlist]
          // console.log({
          //     id:genRandomId(props.dependencyState),
          //     name:input_mod_ref.current?.value,
          //     dependency:props.dependencyState,
          // })
          const rawString = localStorage.getItem('main_mod_data')
          const new_main_mod_data:modListCreateDisplay = JSON.parse(rawString ? rawString : JSON.stringify(main_mod_data))
          // console.log({
          //   ...new_main_mod_data,
          //   id:genRandomId(props.dependencyState),
          //   name:input_mod_ref.current?.value,
          //   dependency:props.dependencyState
          // })
          // new_modelist.push({
          //   id:genRandomId(props.dependencyState),
          //   name:input_mod_ref.current?.value,
          //   dependency:props.dependencyState,
          // })
          new_modelist.push({
            ...new_main_mod_data,
            id:genRandomId(props.dependencyState),
            name:input_mod_ref.current?.value,
            dependency:props.dependencyState
          })
          const postbody = {
            name:'modlist.json',
            field:'modlist',
            data:new_modelist,
          }
          // console.log("postbody",postbody)
          const saveResult = await putRequest(url,postbody)
          if(saveResult.status){
              props.set_dependencyState([])
              props.resetModMenuState()
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
      else{
        alert("enter something first mod")
      }
    }
    else{

    }
  }

  function addNewDependency(){
    if(dep_input_mod_ref.current){
        let new_dependencyState = [...props.dependencyState]
        new_dependencyState.push({displayModDetail:false,id:genRandomId(),name:dep_input_mod_ref.current?.value ? dep_input_mod_ref.current?.value : (() => { alert("enter something first dep"); return ""})() })
        props.set_dependencyState(new_dependencyState)
    }
    else{
        console.log("something went wrong")
    }
  }

  return (
    <div className="tw-flex tw-flex-col">
      <div className="tw-mb-2">create menu</div>
      <div className="tw-flex tw-items-center">
        <div>
          <input type="text" ref={input_mod_ref}/>
        </div>
        <div>
          <button className={buttonStyle}><span className="tw-text-green-500" onClick={addMod}>save</span></button>
        </div>
      </div>
      {/* <div>
        <button onClick={() => {console.log(extractDetailDiv(detail_div_mod_ref))}}>test extract</button>
        <button onClick={() => {set_main_mod_data_value({
          id: '',
          name: '',
          displayModDetail: false,
          version:'48484'
        })}}>test extract</button>
      </div> */}
      <DetailComponent props={{
        ref: detail_div_mod_ref,
        modIndex:main_mod_data,
        dependencyState:props.dependencyState,
        set_dependencyState:props.set_dependencyState,
        main_mod_data:true,
      }} />
      <div className="tw-flex tw-flex-col tw-my-4">
        <div>add dependency</div>
        <div className="tw-flex tw-items-center">
          <div>
            <input type="text" ref={dep_input_mod_ref}/>
          </div>
          <div>
            <button className={buttonStyle} onClick={() => {addNewDependency()}}><span className="tw-text-green-500">add</span></button>
          </div>
        </div>
      </div>
      <div className="tw-my-4">
        {
            // DisplayAddedDependency(test_dependency,true)
            DisplayAddedDependency(props.dependencyState,true)
        }
      </div>
    </div>
  );

  function DisplayAddedDependency(dependencyList: modListCreateDisplay[] | undefined,first_round?:boolean) {
    if (dependencyList && dependencyList.length > 0) {
      let displayJSX: JSX.Element[] = [];
      dependencyList.map((value, index) => {
        const input_ref = createRef<HTMLInputElement>()
        const detail_div_ref = createRef<HTMLDivElement>()
        displayJSX.push(
          <div key={index} className={`tw-flex tw-flex-col tw-mb-4 tw-border-2 tw-p-4 ` + (first_round ? `tw-ml-0` : `tw-ml-2`)}>
            <div className="tw-flex tw-items-center tw-mb-2">
                <div className="tw-mr-2">dependency <span className="tw-text-[#e6a100]">{value.name}</span></div>
                <div>
                    <button className={buttonStyle} onClick={() => {remove_dependency(value,props.dependencyState,props.set_dependencyState)}}><span className="tw-text-red-500">remove</span></button>
                </div>
            </div>
            {/*  */}
            {/* <div>
              <button onClick={() => {console.log(extractDetailDiv(detail_div_ref))}}>test extract</button>
            </div> */}
            <DetailComponent props={{
              ref: detail_div_ref,
              modIndex:value,
              dependencyState:props.dependencyState,
              set_dependencyState:props.set_dependencyState,
            }} />
            {/*  */}
            <div className="tw-my-4">
              <div><span className="tw-text-green-500">add</span> dependency for <span className="tw-text-[#e6a100]">{value.name}</span></div>
              <div className="tw-flex tw-items-center">
                <div className="tw-mr-2">
                  <input type="text" ref={input_ref}/>
                </div>
                <div>
                  <button className={buttonStyle} onClick={() => {add_dependency(value,props.dependencyState,props.set_dependencyState,input_ref)}}><span className="tw-text-green-500">add</span></button>
                </div>
              </div>
            </div>
            <div>{DisplayAddedDependency(value.dependency)}</div>
          </div>
        );
      });
      return displayJSX;
    } else {
      return <div></div>;
    }
  }
}

// function DetailComponent({props}:{props:{ref:RefObject<HTMLDivElement>}}){
function DetailComponent({props}:{props:{ref:RefObject<HTMLDivElement>,modIndex:modListCreateDisplay,dependencyState:modListCreateDisplay[],set_dependencyState:Dispatch<SetStateAction<modListCreateDisplay[]>>,main_mod_data?:boolean}}){

  function onInputChange(){
    const updateModIndex =  edit_dependency(props.modIndex,props.dependencyState,props.set_dependencyState,extractDetailDiv(props.ref),props.main_mod_data)
    if(props.main_mod_data && updateModIndex){
      localStorage.setItem('main_mod_data',JSON.stringify(updateModIndex))
    }
  }

  return (
    <div className='tw-flex tw-flex-col' ref={props.ref}>
      <div className={`tw-flex tw-items-center tw-mt-2 tw-h-9 tw-cursor-pointer ` + (props.main_mod_data ? `tw-hidden` : ``)} onClick={() => {show_mod_detail_area(props.modIndex,props.dependencyState,props.set_dependencyState)}}>
        <div className={(Styles['show-detail-icon']) + " " + (props.modIndex.displayModDetail ? Styles['open'] : Styles['close']) + ` tw-w-4 tw-h-4 tw-transition-all tw-duration-500`}>
          <Image src={TriangleIcon} alt="" className={` tw-w-full tw-h-auto`}/>
        </div>
        <div className='tw-ml-2'>
          show more detail
        </div>
      </div>
      <div className={`tw-flex tw-flex-col tw-transition-height tw-duration-500 tw-h-40 ` + ((props.modIndex.displayModDetail || props.main_mod_data) ? `` : `tw-overflow-hidden tw-h-0`)} id="detail-div">
        <div className='tw-flex tw-items-center tw-mt-2' id='version'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={VersionIcon} alt="" className={` tw-w-full tw-h-auto`}/>
          </div>
          <div className='tw-ml-2'>
            {/* <input type="text" onChange={() => {edit_dependency(props.modIndex,props.dependencyState,props.set_dependencyState,extractDetailDiv(props.ref))}} id="detail-input" placeholder='version' className='tw-pl-1'/> */}
            <input type="text" onChange={onInputChange} id="detail-input" placeholder='version' className='tw-pl-1'/>
          </div>
        </div>
        <div className='tw-flex tw-items-center tw-mt-2' id='description'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={DescriptionIcon} alt="" className={` tw-w-full tw-h-auto`}/>
          </div>
          <div className='tw-ml-2'>
            {/* <input type="text" onChange={() => {edit_dependency(props.modIndex,props.dependencyState,props.set_dependencyState,extractDetailDiv(props.ref))}} id="detail-input" placeholder='description' className='tw-pl-1'/> */}
            <input type="text" onChange={onInputChange} id="detail-input" placeholder='description' className='tw-pl-1'/>
          </div>
        </div>
        <div className='tw-flex tw-items-center tw-mt-2' id='tag'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={TagIcon} alt="" className={` tw-w-full tw-h-auto`}/>
          </div>
          <div className='tw-ml-2'>
            {/* <input type="text" onChange={() => {edit_dependency(props.modIndex,props.dependencyState,props.set_dependencyState,extractDetailDiv(props.ref))}} id="detail-input" placeholder='tag' className='tw-pl-1'/> */}
            <input type="text" onChange={onInputChange} id="detail-input" placeholder='tag' className='tw-pl-1'/>
          </div>
        </div>
        <div className='tw-flex tw-items-center tw-mt-2' id='refFolder'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={FolderIcon} alt="" className={` tw-w-full tw-h-auto`}/>
          </div>
          <div className='tw-ml-2'>
            {/* <input type="text" onChange={() => {edit_dependency(props.modIndex,props.dependencyState,props.set_dependencyState,extractDetailDiv(props.ref))}} id="detail-input" placeholder='refFolder' className='tw-pl-1'/> */}
            <input type="text" onChange={onInputChange} id="detail-input" placeholder='refFolder' className='tw-pl-1'/>
          </div>
        </div>
        <div className='tw-flex tw-items-center tw-mt-2' id='url'>
          <div className={`tw-w-4 tw-h-4`}>
            <Image src={UrlIcon} alt="" className={` tw-w-full tw-h-auto`}/>
          </div>
          <div className='tw-ml-2'>
            {/* <input type="text" onChange={() => {edit_dependency(props.modIndex,props.dependencyState,props.set_dependencyState,extractDetailDiv(props.ref))}} id="detail-input" placeholder='url' className='tw-pl-1'/> */}
            <input type="text" onChange={onInputChange} id="detail-input" placeholder='url' className='tw-pl-1'/>
          </div>
        </div>
      </div>
    </div>
  )
}

function extractDetailDiv(detail_div_ref: RefObject<HTMLDivElement>):mod_detail{
  let mod_detail_data:mod_detail = {
    description:"",
    refFolder:"",
    tag:[],
    url:"",
    version:"",
  }
  const detail_div = detail_div_ref.current?.querySelectorAll('#detail-div')[0]
  if(!(detail_div?.children)) {
    alert("empty detail_div type")
    return {
      description:"",
      refFolder:"",
      tag:[],
      url:"",
      version:"",
    }
  }
  for(let type = 0;type < detail_div?.children.length;type++){
    const detail_div_type = detail_div.children[type]
    const detail_div_type_input = detail_div_type.querySelectorAll('input')[0]
    const id_type = detail_div_type.id
    switch(id_type){
      case 'description':
        mod_detail_data.description = detail_div_type_input.value;
        break;
      case 'refFolder':
        mod_detail_data.refFolder = detail_div_type_input.value;
        break;
      case 'tag':
        mod_detail_data.tag = detail_div_type_input.value.split(",");
        break;
      case 'url':
        mod_detail_data.url = detail_div_type_input.value;
        break;
      case 'version':
        mod_detail_data.version = detail_div_type_input.value;
        break;
      default:
        break;
    }
  }
  return mod_detail_data
}

function show_mod_detail_area(modIndex:modListCreateDisplay,dependencyState:modListCreateDisplay[],set_dependencyState:Dispatch<SetStateAction<modListCreateDisplay[]>>){
  let new_dependencyState = [...dependencyState]
  const loopArr = ((loop_modlist:modListCreateDisplay[]) => {
    for(let mod of loop_modlist){
      if(_.isEqual(modIndex,mod)){
        const index = loop_modlist.indexOf(mod)
        if (index !== -1) {
          loop_modlist[index].displayModDetail = !loop_modlist[index].displayModDetail
        }
      }
      if(mod.dependency && mod.dependency.length > 0){
        loopArr(mod.dependency)
      }
    }
  })
  // console.log(new_dependencyState)
  loopArr(new_dependencyState)
  set_dependencyState(new_dependencyState)
}

function edit_dependency(modIndex:modListCreateDisplay,dependencyState:modListCreateDisplay[],set_dependencyState:Dispatch<SetStateAction<modListCreateDisplay[]>>,mod_detail_data:mod_detail,main_mod_data?:boolean){
  let new_dependencyState = [...dependencyState]
  const loopArr = ((loop_modlist:modListCreateDisplay[]) => {
    for(let mod of loop_modlist){
      if(_.isEqual(modIndex,mod)){
        const index = loop_modlist.indexOf(mod)
        if (index !== -1) {
          const merge = {
            ...mod,
            ...mod_detail_data
          }
          loop_modlist[index] = merge
        }
      }
      if(mod.dependency && mod.dependency.length > 0){
        loopArr(mod.dependency)
      }
    }
    return loop_modlist
  })
  if(main_mod_data){
    return {
      ...modIndex,
      ...mod_detail_data
    }
  }
  else{
    loopArr(new_dependencyState)
    set_dependencyState(new_dependencyState)
  }
}

function add_dependency(modIndex:modList,dependencyState:modListCreateDisplay[],set_dependencyState:Dispatch<SetStateAction<modListCreateDisplay[]>>,input_ref: RefObject<HTMLInputElement>){
  let new_dependencyState = [...dependencyState]
  const loopArr = ((loop_modlist:modListCreateDisplay[]) => {
    for(let mod of loop_modlist){
      if(_.isEqual(modIndex,mod)){
        if(input_ref.current?.value){
          if(mod.dependency){
            mod.dependency.push({
              displayModDetail:false,
              id:genRandomId(),
              // name:genRandomId(),
              name:input_ref.current?.value,
              dependency:[]
            })
          }
          else{
            mod.dependency = [{
              displayModDetail:false,
              id:genRandomId(),
              // name:genRandomId(),
              name:input_ref.current?.value,
              dependency:[]
            }]
          }
        }
      }
      if(mod.dependency && mod.dependency.length > 0){
        loopArr(mod.dependency)
      }
    }
  })
  // console.log(new_dependencyState)
  loopArr(new_dependencyState)
  set_dependencyState(new_dependencyState)
}

function remove_dependency(modIndex:modListCreateDisplay,dependencyState:modListCreateDisplay[],set_dependencyState:Dispatch<SetStateAction<modListCreateDisplay[]>>){
  // const button:HTMLButtonElement = event.target
  // console.log(modIndex)
  // console.log(dependencyState)
  // console.log(input_ref.current?.value)
  let new_dependencyState = [...dependencyState]
  const loopArr = ((loop_modlist:modListCreateDisplay[]) => {
    for(let mod of loop_modlist){
      if(_.isEqual(modIndex,mod)){
        // console.log(mod)
        // console.log(modIndex)
        // console.log(_.isEqual(modIndex,mod))
        // console.log("equal")
        // mod.name = "found you"
        // mod.name = "dieeeeeee"
        var confirm_result:boolean = confirm(`are you sure you want to remove ${mod.name}`)
        // if(confirm === 'confirm' || confirm === 'yes'){
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
  })
  // console.log(new_dependencyState)
  loopArr(new_dependencyState)
  set_dependencyState(new_dependencyState)
}