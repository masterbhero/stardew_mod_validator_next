import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getRequest } from "../components/functions/http/get";
import modList , { modListDisplay } from "../interface/modList";

export function useHiddenStatus(modList: modList[] | modListDisplay[]):[number[],Dispatch<SetStateAction<number[]>>]{

    const [hiddenStatus,set_hiddenStatus] = useState<number[]>([])

    useEffect(() => {
        async function fetchData(){
            const hidden_status = await getHiddenStatusSetting()
            set_hiddenStatus(hidden_status)
            console.log("hidden status",hidden_status)
        }

        fetchData()
    },[modList])

    async function getHiddenStatusSetting():Promise<number[]>{
        const http_data = await getRequest(`./api/get-setting`,`path=setting.json`)
        console.log("http_data",http_data)
        if(
            http_data.data.hasOwnProperty("stardew_location") &&
            http_data.data.hasOwnProperty("hidden_status") &&
            isNumberArray(http_data.data.hidden_status)
        ){
            return http_data.data.hidden_status
        }
        else{
            return new Array<number>
        }
    }

    function isNumberArray(x: any): x is number[] {
        return Array.isArray(x) && x.every(item => typeof item === 'number');
    }
    
    return [hiddenStatus,set_hiddenStatus]
}