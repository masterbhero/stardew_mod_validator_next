import _ from "lodash";
import { crc32 } from "../encrypt/crc32";

export function genRandomId(input?:any,salt = _.random(65535)){
    if(!input) input = _.random(4294967295)
    const crc32_result = crc32(JSON.stringify(input))
    const input2 = crc32_result + (parseInt(salt.toString(), 16)).toString()
    return crc32(input2)
}