import { apiResponseDefault } from "../../../interface/api-response"

const default_header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export async function putRequest(url:string,postbody:any,header = default_header ){
    const rawResponse = await fetch(
        url,
        {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(postbody)
        }
    )

    const content:apiResponseDefault = await rawResponse.json()

    return content
}