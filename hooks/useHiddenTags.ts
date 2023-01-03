import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getRequest } from "../components/functions/http/get";
import modList , { modListDisplay } from "../interface/modList";

/**
 * get hidden_tags from setting.json
 * @param modList 
 * @returns hiddenTags:string[],set_hiddenTags:Dispatch<SetStateAction<string[]>>
 */
export function useHiddenTags(modList: modList[] | modListDisplay[]):[string[],Dispatch<SetStateAction<string[]>>]{

    const [hiddenTags,set_hiddenTags] = useState<string[]>([])

    useEffect(() => {
        async function fetchData(){
            const hidden_tags = await getHiddenTagsSetting()
            set_hiddenTags(hidden_tags)
        }

        fetchData()
    },[modList])

    async function getHiddenTagsSetting():Promise<string[]>{
        const http_data = await getRequest(`./api/get-setting`,`path=setting.json`)
        console.log("http_data",http_data)
        if(
            http_data.data.hasOwnProperty("stardew_location") &&
            http_data.data.hasOwnProperty("hidden_tags") &&
            isStringArray(http_data.data.hidden_tags)
        ){
            return http_data.data.hidden_tags
        }
        else{
            return new Array<string>
        }
    }

    function isStringArray(x: any): x is string[] {
        return Array.isArray(x) && x.every(item => typeof item === 'string');
    }
      
    return [hiddenTags,set_hiddenTags]
}