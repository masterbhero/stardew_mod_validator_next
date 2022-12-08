import { Dispatch, SetStateAction } from "react";
import { createSettingJson } from "../../../functions/file/create-setting";

/**
 * 
 * @param lookup_result - lookup result from lookupSetting()
 * @returns array of lookup result with create new or edit button
 */
export default function FindSettingResultJSX(lookup_result: {
    status: boolean;
    data: any;
    message: string;
    name: string;
  }[] | undefined,
  set_findSettingState: Dispatch<SetStateAction<JSX.Element>>){
    if(lookup_result){
      return (
        <div className='tw-flex tw-flex-col tw-items-center tw-p-3'>
          <div className='tw-my-3'>finding result</div>
          <div className='tw-w-full '>
            {
              lookup_result.map((lookup,index) => {
                return (
                  <div key={index} className={`tw-my-3 tw-py-2 tw-rounded-lg tw-px-3 tw-flex tw-justify-between tw-transition-colors tw-duration-300 ` + (lookup.status ? `tw-bg-success` : `tw-bg-danger`)}>
                    <div>{lookup.name} : {lookup.message}</div>
                    {
                      lookup.status 
                      ? <div><button className='hover:tw-bg-hover tw-transition-colors tw-duration-300 tw-px-2 tw-rounded-md' >edit</button></div>
                      : <div><button className='hover:tw-bg-hover tw-transition-colors tw-duration-300 tw-px-2 tw-rounded-md' 
                      onClick={ async () => {await createNewSetting(lookup.name,set_findSettingState) }} >create new</button></div> 
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
    else{
      return (
        <div>lookup_result not privided...</div>
      )
    }
  }

  async function createNewSetting(name:string,set_findSettingState: Dispatch<SetStateAction<JSX.Element>> | undefined){
    if(set_findSettingState){
      const create_and_lookup_result = await createSettingJson(name)
      set_findSettingState(FindSettingResultJSX(create_and_lookup_result,set_findSettingState))
      
    }
    else{
      alert('set_findSettingState undefined')
    }
  }