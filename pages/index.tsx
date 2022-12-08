import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { readdir } from 'fs/promises';
import { createRef, useEffect, useState } from 'react';
import fs from "fs"
import borderStyles from '../styles/animations/border.module.scss'
import modList, { modListCreateDisplay } from '../interface/modList';
import ModView3, { getModListJSXFileResult, getModListJSXModList, loopAndDisplayDependency, makeDisplayList } from '../components/menus/mod-view-3/mod-view-3';
import _ from "lodash";
import DastaLavista from '../components/test/dastaLavista';
import BackgroundStyles from '../styles/animations/background.module.scss'
import DisplayActivatedMenu from '../components/displays/display-activated-menu';
import { lookupSetting } from '../functions/lookup/setting-lookup';
import { displayPropsTypeIndexPage } from '../functions/logs/display-props';
import FindSettingResultJSX from '../components/views/find-setting-result/find-setting-result';
import FileListDisplay from '../components/menus/file-list/file-list';
import ModMenu from '../components/menus/mod-menu/mod-menu';
import MenuSelectButtonList from '../components/menus/menu-select/menu-select';
import LoadingSpinner from '../assets/gif/loading-spinner.gif';
import CheckMark from '../assets/checkmark-full.png';
import CrossMark from '../assets/crossmark-full.png';
import ResetIcon from '../assets/reset-icon-grey.png';
import SaveIcon from '../assets/save-icon-grey.png';
import { apiResponseDefault } from '../interface/api-response';
import SelectLocation from '../components/functions/select-location';
import { getRequest } from '../components/functions/http/get';
// import ModeView from '../components/views/mod-view/mod-view';
// import styles from '../styles/Home.module.css'

interface propsTypeIndexPage{
  file_result: {
    status: boolean;
    data: any;
    message: string;
    name: string;
  }[]
}

// export default function Home({ data }:{ data : {status:boolean,data:null | any,message:string} }) {
// export default function Home({ file_result }:{ file_result : {status:boolean,data:any | undefined,message:string}[] }) {
  // export default function Home(){
  export default function Home({ props } : { props : propsTypeIndexPage}){

  // const mod_list2: modList[] = [
  //   {name:'mod1mod1mod1mod1mod1mod1mod1mod1mod1mod1mod1',dependency:[
  //     {name:'mod1',dependency:[]},
  //     {name:'mod2',dependency:[
  //       {name:'mod1',dependency:[]},
  //       {name:'mod2',dependency:[]},
  //     ]},
  //   ]},
  //   {name:'mod2',dependency:[
  //     {name:'mod1',dependency:[
  //       {name:'mod1',dependency:[]},
  //       {name:'mod2',dependency:[]},]},
  //     {name:'mod2',dependency:[
  //     ]},
  //   ]},
  //   {name:'mod3',dependency:[]},
  //   {name:'mod4',dependency:[]},
  // ]

  // const mod_list3: modList[] = [
  //   {name:'mod3333 here 3',dependency:[
  //     {name:'mod1',dependency:[]},
  //     {name:'mod2',dependency:[
  //       {name:'mod1',dependency:[]},
  //       {name:'mod2',dependency:[]},
  //     ]},
  //   ]},
  //   {name:'mod2',dependency:[
  //     {name:'mod1',dependency:[
  //       {name:'mod1',dependency:[]},
  //       {name:'mod2',dependency:[]},]},
  //     {name:'mod2',dependency:[
  //     ]},
  //   ]},
  //   {name:'mod3',dependency:[]},
  //   {name:'mod4',dependency:[]},
  // ]

  const [lookup_result,set_lookup_result] = useState<{status:boolean,data:any,message:string,name:string}[]>([])

  //* menu_name_state
  const [menuNameState, set_menuNameState] = useState("");

  //* setting find setting result
  const [findSettingState,set_findSettingState] = useState(<>find setting result load fail</>)

  // #region menu

  const [modListJSX, set_modListJSX] = useState<JSX.Element>(<div></div>);

  //#region modmenu

  const [modMenuState,set_modMenuState] = useState('')

  const [dependencyState,set_dependencyState] = useState<modListCreateDisplay[]>([])

  //#endregion

  const menu_list:{
    name: string;
    JSX: (...args: any) => JSX.Element;
    menu_data?: any;
  }[] = [
    {name:'modlist',JSX:ModView3,menu_data:modListJSX},
    {name:'filelist',JSX:FileListDisplay},
    {name:'modmenu',JSX:ModMenu,menu_data:
      {
        modMenuState:modMenuState,
        set_modMenuState:set_modMenuState,
        menu_dependency:{
          create:{
            dependencyState: dependencyState,
            set_dependencyState: set_dependencyState
          }
        }
      }
    },
  ]


  // #endregion menu

  useEffect(() => {
    
    //* display props
    displayPropsTypeIndexPage(props)

    //* set lookup_result for future use maybe remove later
    set_lookup_result(props.file_result)

    //* set modlistmenu for
    set_modListJSX(getModListJSXFileResult(props.file_result))

    //* init menuNameState
    set_menuNameState(menu_list[0].name)

    //* set find setting result
    set_findSettingState(FindSettingResultJSX(props.file_result,set_findSettingState))

  }, [])

  // function getSetting(){
  //   const lookup_list = ['setting','modlist'];
  //   const new_lookup_result:{status:boolean,data:any,message:string,name:string}[] = []
  //   for(let lookup of lookup_list){
  //     const lookup_data = localStorage.getItem(lookup)
  //     if(lookup_data !== null){
  //       new_lookup_result.push({
  //         status:true,
  //         data:JSON.parse(lookup_data),
  //         message:`${lookup} found and valid`,
  //         name:lookup
  //       })
  //     }
  //     else{
  //       new_lookup_result.push({
  //         status:false,
  //         data:null,
  //         message:`${lookup} not found`,
  //         name:lookup
  //       })
  //     }
  //   }
  //   // console.log("new_lookup_result",new_lookup_result)
  //   set_lookup_result(new_lookup_result)
  // }

  // function createSetting(name:string,data?:any){
  //   switch(name){
  //     case 'setting':
  //       if(data){
  //         localStorage.setItem('setting',JSON.stringify(data))
  //       }
  //       else{
  //         const new_setting = {
  //           stardew_location:""
  //         }
  //         localStorage.setItem('setting',JSON.stringify(new_setting))
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //   getSetting()
  // }

  async function ReloadMod(){
    const search_params = new URLSearchParams( { "path":"modlist.json" } )
            //data:modlist:[]
    const getModListResult = await getRequest(`./api/get-setting`,search_params)

    if(getModListResult.status){
      set_modListJSX(getModListJSXModList(getModListResult.data.modlist))
    }
    else{
      alert('reload fail')
    }
  }

  return (
    <>
      <div className='tw-flex '>
        <div className={
          // `tw-flex tw-flex-col tw-border-2 tw-border-red-500 tw-max-w-[576px] tw-w-[30vw] tw-h-screen ` + (BackgroundStyles['rainbow-dark-pastel'])
          `tw-flex tw-flex-col tw-border-2 tw-border-red-500 tw-max-w-[576px] tw-w-[30vw] tw-h-screen `
        }>
          <div className='tw-w-full tw-flex tw-items-center tw-justify-center tw-mt-4'>
            <button className='tw-border-2 tw-rounded-md tw-border-white tw-w-[50%]' onClick={() => {ReloadMod()}} >reload mod</button>
          </div>
          {
            findSettingState
          }          
          {
            SelectLocation()
          }
        </div>
        {/*//* displaymenu  */ }
        <div className='tw-flex tw-flex-col tw-border-2 tw-h-screen tw-border-blue-500 tw-w-[70vw]'>
          <div>
            {
              MenuSelectButtonList(menu_list,menuNameState,set_menuNameState)
            }
          </div>
          <div className='tw-overflow-auto'>
            {
              DisplayActivatedMenu(
                menuNameState,
                menu_list
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

// function SelectLocation(file_result: {
//   status: boolean;
//   data: any;
//   message: string;
//   name: string;
// }[]){

// function SelectLocation(){

//   const [displayMessage,set_displayMessage] = useState("")

//   const [statusState,set_statusState] = useState(0) //0 1 2

//   const [inputDefaultValue,set_inputDefaultValue] = useState("")

//   // const setting_json = (file_result.filter((value) => value.name === 'setting.json'))[0]

//   const inputRef = createRef<HTMLInputElement>()

//   async function searchSettingJson():Promise<string>{
//     set_statusState(1)
//     const searchResult:apiResponseDefault = await (await fetch( './api/lookup-setting-single?' + new URLSearchParams( { "filename":`setting.json` } ) )).json()
//     if(searchResult.status){
//       set_statusState(2)
//       return searchResult.data.stardew_location
//     }
//     else{
//       set_statusState(0)
//       return searchResult.message
//     }
//   }

//   async function searchLocation(search_path:string):Promise<apiResponseDefault>{
//     return await (await fetch( './api/search-location?' + new URLSearchParams( { "path":`${search_path}` } ) )).json()
//   }

//   async function inputChange(){
//     set_statusState(1)
//     // const searchResponse:apiResponseDefault = await (await fetch( './api/search-location?' + new URLSearchParams( { "path":`${inputRef.current?.value}` } ) )).json()
//     const searchResponse = await searchLocation(inputRef.current?.value ? inputRef.current?.value : "")
//     if(searchResponse.status){
//       set_displayMessage(searchResponse.message)
//       // inputRef.current?.
//       set_statusState(2)
//     }
//     else{
//       set_displayMessage(searchResponse.message)
//       set_statusState(0)
//     }
//     // console.log(searchResponse)
//   }

//   function returnIcon(select:number){
//     const image_style = `tw-w-[90%] tw-h-[90%]`
//     switch(select){
//       case 0:
//         return (
//           <Image src={CrossMark} alt={'loading-spinner'} className={image_style}/>
//         )
//       case 1:
//         return (
//           <Image src={LoadingSpinner} alt={'loading-spinner'} className={image_style}/>
//         )
//       case 2:
//         return (
//           <Image src={CheckMark} alt={'loading-spinner'} className={image_style}/>
//         )
//       default:
//         return (
//           <Image src={CrossMark} alt={'loading-spinner'} className={image_style}/>
//         )
//     }
//   }

//   async function saveLocation(){
//     set_statusState(1)
//     const putbody = {
//       "name":"setting.json",
//       "field":"stardew_location",
//       "data":`${inputRef.current?.value}`
//     }
//     const saveResult:apiResponseDefault = await (await fetch('./api/edit-setting', {
//       method: 'PUT',
//       headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(putbody)
//     })).json()
//     if(saveResult.status){
//       set_displayMessage("location saved")
//       set_statusState(2)  
//     }
//     else{
//       set_displayMessage(saveResult.message)
//       set_statusState(0)  
//     }
//   }

//   function resetLocation(){
//     set_displayMessage("location reset")
//   }

//   useEffect(() => {
//     async function asyncStuff(){
//       set_inputDefaultValue(await searchSettingJson())
//     }

//     asyncStuff()
//   },[])

//   return (
//     <div className='tw-flex tw-flex-col tw-items-center tw-p-3'>
//       <div className='tw-my-3'>stardew valley location</div>
//       <div className='tw-w-full tw-flex tw-flex-col'>
//         <div>
//           {displayMessage}
//         </div>
//         <div className='tw-w-full tw-flex'>
//           <div className='tw-flex tw-items-center tw-justify-center tw-w-[36px] tw-h-[36px] tw-mt-[2px] tw-ml-[3px] tw-absolute tw-border-r-2 tw-border-[rgb(62,68,70)]'>
//             {
//               returnIcon(statusState)
//             }
//           </div>
//           <div className='tw-w-[100%]'>
//             <input
//             // tw-bg-[rgb(24,26,27)]
//               type="text"
//               ref={inputRef}
//               className={
//                 `
//                 tw-border-2 tw-border-[rgb(62,68,70)] tw-bg-black
//                 tw-h-10 tw-px-3 tw-py-3 tw-pb-4 tw-pl-10 tw-rounded tw-text-[rgb(101,91,70)] tw-outline-none
//                 tw-w-full
//                 `
//               }
//               onChange={ async () => { await inputChange() }}
//               defaultValue={inputDefaultValue}
//             />
//           </div>
//         </div>
//         <div className='tw-flex tw-justify-between tw-mt-2'>
//           <button 
//             className='
//               tw-border-2 tw-rounded-lg
//               tw-border-[#353535] tw-bg-[#8a8a8a] tw-text-[#bababa]
//               tw-w-[48%] tw-h-9 
//             '
//             onClick={ async () => { await saveLocation() } }>
//             <div className='tw-flex tw-justify-center tw-items-center'>
//               <div className='tw-w-[28px] tw-mr-[10%]'>
//                 <Image src={SaveIcon} alt={'save-icon'}  />
//               </div>
//               <p className='tw-font-bold tw-text-lg'>save</p>
//             </div>
//           </button>
//           <button 
//             className='
//               tw-border-2 tw-rounded-lg
//               tw-border-[#353535] tw-bg-[#8a8a8a] tw-text-[#bababa]
//               tw-w-[48%] tw-h-9 
//             '
//             onClick={ () => { resetLocation() } }>
//             <div className='tw-flex tw-justify-center tw-items-center'>
//               <div className='tw-w-[28px] tw-mr-[10%]'>
//                 <Image src={ResetIcon} alt={'save-icon'}  />
//               </div>
//               <p className='tw-font-bold tw-text-lg'>reset</p>
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// function FindSettingResultJSX(lookup_result: {
//   status: boolean;
//   data: any;
//   message: string;
//   name: string;
// }[]){
//   return (
//     <div className='tw-flex tw-flex-col tw-items-center tw-p-3'>
//       <div className='tw-my-3'>finding result</div>
//       <div className='tw-w-full tw-pl-5'>
//         {
//           lookup_result.map((lookup,index) => {
//             return (
//               <div key={index} className={`tw-my-3 tw-py-2 tw-rounded-lg tw-px-3 tw-flex tw-justify-between tw-transition-colors tw-duration-300 ` + (lookup.status ? `tw-bg-success` : `tw-bg-danger`)}>
//                 <div>{lookup.name} : {lookup.message}</div>
//                 {
//                   lookup.status 
//                   ? <div><button className='hover:tw-bg-hover tw-transition-colors tw-duration-300 tw-px-2 tw-rounded-md' >edit</button></div>
//                   : <div><button className='hover:tw-bg-hover tw-transition-colors tw-duration-300 tw-px-2 tw-rounded-md' >create new</button></div> 
//                 }
//               </div>
//             )
//           })
//         }
//       </div>
//     </div>
//   )
// }

// function SetLocationDiv(lookup_result:{
//   status: boolean;
//   data: any;
//   message: string;
//   name: string;
// }[]){

//   const filter_setting = lookup_result.filter(lookup => lookup.name === 'setting');
 
//   function setSetting(){
//     try{
//       const old_setting_raw_read = localStorage.getItem('setting')
//       if(old_setting_raw_read !== null){
//         const old_setting_data = JSON.parse(old_setting_raw_read)
//         const new_setting_data = {
//           ...old_setting_data,
//           stardew_location:"set from outside"
//         }
//         localStorage.setItem('setting',JSON.stringify(new_setting_data))
//       }
//       else{
//         throw{
//           message:'setting is missing'
//         }
//       }
//     }
//     catch(err){
//       if(err instanceof Error){
//         alert(err.message)
//       }
//       else{
//         // alert(err.message)
//         console.log(err)
//       }
//     }
//   }

//   if(filter_setting.length === 1 && filter_setting[0].status === true){
//     return (
//       <div className='tw-flex tw-flex-col'>
//         found setting and = true
//         <button onClick={setSetting}>dastaLavista</button>
//         <button onClick={() => {
//           var input = document.createElement('input');
//           input.type = 'file';
//           input.onchange = ((event) => {console.log(event)})
//           input.click();
//           console.log(input)
//         }}>dastaLavista</button>
//       </div>
//     )
//   }
//   else{
//     return (
//       <div className='tw-flex tw-flex-col'>
//       </div>
//     )
//   }
// }

// function DisplayActivatedMenu(menu_name:string,menu_list:{name:string,JSX:(...args: any) => JSX.Element,menu_data?:any}[]){
//   // console.log("menu_name",menu_name)
//   let DisplayMenu:JSX.Element = <div>no menu ...</div>;
//   for(let i = 0;i < menu_list.length;i++){
//     const menu = menu_list[i]
//     // console.log("menu.name",menu.name);
//     // console.log("menu_name",menu_name);
//     // console.log(menu.name === menu_name)
//     if(menu.name === menu_name){
//       DisplayMenu = menu.JSX(menu.menu_data ? menu.menu_data : undefined)
//       break;
//     }
//   }
//   return DisplayMenu
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // const data = await readdir(`C:/Program Files (x86)/Steam/steamapps/common/Stardew Valley/Mods`)
//   const read_file_list = await readdir(`./setting`)
//   let data = {}

//   console.log("read_file_list",read_file_list)

//   if(read_file_list.includes('setting.json')){
//       try{
//         const path = `./setting/setting.json`;
//         const file = fs.readFileSync(path,'utf8')
//         const json_data = JSON.parse(file)
//         data = {
//           status:true,
//           data:json_data,
//           message:"setting is found and valid"
//         }
//       }
//       catch(err){
//         // console.log("read err",err)
//         data = {
//           status:false,
//           data:null,
//           message:"setting not valid or corrupt"
//         }
//       }
//   }
//   else{
//     data = {
//       status:false,
//       data:null,
//       message:"setting not found"
//     }
//   }

//   return {
//     props: {
//       data,
//     },
//   }
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
//   const read_file_list = await readdir(`./setting`);
// // read_file_list []
// // read_file_list [ 'modlist.json', 'setting.json' ]

//   const lookup_list = ['setting.json','modlist.json'];

//   const file_result:{status:boolean,data:any | undefined,message:string}[] = []

//   for(let lookup_file of lookup_list){
//     if(read_file_list.includes(lookup_file)){
//       try{
//         const path = `./setting/${lookup_file}`;
//         const file = fs.readFileSync(path,'utf8')
//         const json_data = JSON.parse(file)
//         const data = {
//           status:true,
//           data:json_data,
//           message:`${lookup_file} is found and valid`
//         }
//         file_result.push(data)
//       }
//       catch(err){
//         // console.log("read err",err)
//         //create handle like create new file with correct data
//         const data = {
//           status:false,
//           data:null,
//           message:`${lookup_file} not valid or corrupt`
//         }
//         file_result.push(data)
//       }      
//     }
//     else{
//       const data = {
//         status:false,
//         data:null,
//         message:`${lookup_file} not found`
//       }
//       file_result.push(data)
//     }
//   }

  const file_result = await lookupSetting()

  return {
    props:{
      props:{
        file_result:file_result
      }
    }
  }
}