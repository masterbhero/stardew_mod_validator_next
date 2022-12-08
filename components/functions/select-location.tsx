import Image from 'next/image'
import { useState, createRef, useEffect } from "react"
import { apiResponseDefault } from "../../interface/api-response"
import CheckMark from '../../assets/checkmark-full.png';
import CrossMark from '../../assets/crossmark-full.png';
import ResetIcon from '../../assets/reset-icon-grey.png';
import SaveIcon from '../../assets/save-icon-grey.png';
import LoadingSpinner from '../../assets/gif/loading-spinner.gif';

export default function SelectLocation(){

    const [displayMessage,set_displayMessage] = useState("")
  
    const [statusState,set_statusState] = useState(0) //0 1 2
  
    const [inputDefaultValue,set_inputDefaultValue] = useState("")
  
    const inputRef = createRef<HTMLInputElement>()
  
    async function searchSettingJson():Promise<string>{
      set_statusState(1)
      const searchResult:apiResponseDefault = await (await fetch( './api/lookup-setting-single?' + new URLSearchParams( { "filename":`setting.json` } ) )).json()
      if(searchResult.status){
        set_statusState(2)
        // return searchResult.data.stardew_location
        const path = searchResult.data.stardew_location
        const checkPathValid = await searchLocation(path)
        if(checkPathValid.status){
            // set_displayMessage(checkPathValid.message)
            set_statusState(2)
            return checkPathValid.data
            // return checkPathValid.data.stardew_location
        }
        else{
            // set_displayMessage(checkPathValid.message)
            set_statusState(0)
            return checkPathValid.data
            // return checkPathValid.data.stardew_location
        }
      }
      else{
        set_statusState(0)
        return searchResult.message
      }
    }
  
    async function searchLocation(search_path:string):Promise<apiResponseDefault>{
      return await (await fetch( './api/search-location?' + new URLSearchParams( { "path":`${search_path}` } ) )).json()
    }
  
    async function inputChange(){
      set_statusState(1)
      // const searchResponse:apiResponseDefault = await (await fetch( './api/search-location?' + new URLSearchParams( { "path":`${inputRef.current?.value}` } ) )).json()
      const searchResponse = await searchLocation(inputRef.current?.value ? inputRef.current?.value : "")
      if(searchResponse.status){
        set_displayMessage(searchResponse.message)
        set_statusState(2)
      }
      else{
        set_displayMessage(searchResponse.message)
        set_statusState(0)
      }
      // console.log(searchResponse)
    }
  
    function returnIcon(select:number){
      const image_style = `tw-w-[90%] tw-h-[90%]`
      switch(select){
        case 0:
          return (
            <Image src={CrossMark} alt={'loading-spinner'} className={image_style}/>
          )
        case 1:
          return (
            <Image src={LoadingSpinner} alt={'loading-spinner'} className={image_style}/>
          )
        case 2:
          return (
            <Image src={CheckMark} alt={'loading-spinner'} className={image_style}/>
          )
        default:
          return (
            <Image src={CrossMark} alt={'loading-spinner'} className={image_style}/>
          )
      }
    }
  
    async function saveLocation(){
      set_statusState(1)
      const putbody = {
        "name":"setting.json",
        "field":"stardew_location",
        "data":`${inputRef.current?.value}`
      }
      const saveResult:apiResponseDefault = await (await fetch('./api/edit-setting', {
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(putbody)
      })).json()
      if(saveResult.status){
        set_displayMessage("location saved")
        set_statusState(2)  
      }
      else{
        set_displayMessage(saveResult.message)
        set_statusState(0)  
      }
    }
  
    function resetLocation(){
      set_displayMessage("location reset")
    }
  
    useEffect(() => {
      async function asyncStuff(){
        const path = await searchSettingJson()
        set_inputDefaultValue(path)
        // console.log(await searchLocation(path))
      }
  
      asyncStuff()
    },[])
  
    return (
      <div className='tw-flex tw-flex-col tw-items-center tw-p-3'>
        <div className='tw-my-3'>stardew valley location</div>
        <div className='tw-w-full tw-flex tw-flex-col'>
          <div>
            {displayMessage}
          </div>
          <div className='tw-w-full tw-flex'>
            <div className='tw-flex tw-items-center tw-justify-center tw-w-[36px] tw-h-[36px] tw-mt-[2px] tw-ml-[3px] tw-absolute tw-border-r-2 tw-border-[rgb(62,68,70)]'>
              {
                returnIcon(statusState)
              }
            </div>
            <div className='tw-w-[100%]'>
              <input
              // tw-bg-[rgb(24,26,27)]
                type="text"
                ref={inputRef}
                className={
                  `
                  tw-border-2 tw-border-[rgb(62,68,70)] tw-bg-black
                  tw-h-10 tw-px-3 tw-py-3 tw-pb-4 tw-pl-10 tw-rounded tw-text-[rgb(101,91,70)] tw-outline-none
                  tw-w-full
                  `
                }
                onChange={ async () => { await inputChange() }}
                defaultValue={inputDefaultValue}
              />
            </div>
          </div>
          <div className='tw-flex tw-justify-between tw-mt-2'>
            <button 
            //tw-bg-[#8a8a8a]
              className='
                tw-border-2 tw-rounded-lg
                tw-border-[#353535] tw-bg-transparent tw-text-[#bababa]
                tw-w-[48%] tw-h-9 
              '
              onClick={ async () => { await saveLocation() } }>
              <div className='tw-flex tw-justify-center tw-items-center'>
                <div className='tw-w-[28px] tw-mr-[10%]'>
                  <Image src={SaveIcon} alt={'save-icon'}  />
                </div>
                <p className='tw-font-bold tw-text-lg'>save</p>
              </div>
            </button>
            <button 
            //tw-bg-[#8a8a8a]
              className='
                tw-border-2 tw-rounded-lg
                tw-border-[#353535] tw-bg-transparent tw-text-[#bababa]
                tw-w-[48%] tw-h-9 
              '
              onClick={ () => { resetLocation() } }>
              <div className='tw-flex tw-justify-center tw-items-center'>
                <div className='tw-w-[28px] tw-mr-[10%]'>
                  <Image src={ResetIcon} alt={'save-icon'}  />
                </div>
                <p className='tw-font-bold tw-text-lg'>reset</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }