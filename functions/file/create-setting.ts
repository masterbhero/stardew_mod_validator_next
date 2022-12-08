import { lookup_list_config_create } from "../../config/config"
  import _ from "lodash";
import { lookupSetting } from "../lookup/setting-lookup";
  
interface LooseObject {
    [key: string]: any
}

export async function createSettingJson(name:string){
    const initData:LooseObject = {}
    const lookup_list = lookup_list_config_create()
    // const setting_config = (lookup_list.filter((value) => value.name === 'setting.json'))[0]
    const setting_config = (lookup_list.filter((value) => value.name === name))[0]
    const createField = setting_config.lookup_field
    for(let field of createField){
        initData[field.name] = field.init
    }
    // console.log(initData)
    // fs.writeFileSync(`./setting/setting.json`,JSON.stringify(initData))
    const postbody = {
        filepath:`./setting/${name}`,
        create_data:JSON.stringify(initData)
    }

    const rawResponse = await fetch('./api/create-file', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(postbody)
    });
    const content:{status:boolean,data:{
        status: boolean;
        data: any;
        message: string;
        name: string;
    }[] | undefined,message:string} = await rawResponse.json();

    return content.data ? content.data : []
}

//?create dynamiccally typescript object
//?https://stackoverflow.com/questions/12710905/how-do-i-dynamically-assign-properties-to-an-object-in-typescript

