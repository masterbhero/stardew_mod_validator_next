import { apiResponseDefault } from "../../../interface/api-response"

export async function getRequest(url:string,params?:string | URLSearchParams){
    // const rawResponse = await fetch( './api/search-location?' + new URLSearchParams( { "path":`${search_path}` } ) )
    const rawResponse = await fetch( url + '?' + params)
    
    const content:apiResponseDefault = await rawResponse.json()

    return content
}
