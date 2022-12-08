import { createRef, Dispatch, SetStateAction, useEffect, useState } from "react"
import modList from "../../../../interface/modList"
import { getRequest } from "../../../functions/http/get"
import { putRequest } from "../../../functions/http/put"

const buttonStyle = `tw-border-2 tw-border-white tw-mx-2`

export default function ModMenuCreate(props:{
    dependencyState: modList[],
    set_dependencyState: Dispatch<SetStateAction<modList[]>>
}){
    const input_mod_ref = createRef<HTMLInputElement>()
    const dep_input_ref = createRef<HTMLInputElement>()
    // useEffect(() => {
    //     console.log(props.dependencyState)
    // },[])
    // const [dependencyState,set_dependencyState] = useState([])

    async function addMod(){
        if(input_mod_ref.current?.value){
            const search_params = new URLSearchParams( { "path":"modlist.json" } )
            //data:modlist:[]
            const getModListResult = await getRequest(`./api/get-setting`,search_params)
            // console.log(getModListResult)
            if(getModListResult.status){
                const url = `./api/edit-setting`
                let new_modelist:modList[] = [...getModListResult.data.modlist]
                new_modelist.push({
                    name:input_mod_ref.current?.value,
                    dependency:props.dependencyState,
                })
                const postbody = {
                    name:'modlist.json',
                    field:'modlist',
                    data:new_modelist,
                }
                const saveResult = await putRequest(url,postbody)
                if(saveResult.status){
                    props.set_dependencyState([])
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

    function addNewDependency(){
        console.log("addNewDependency")
        if(dep_input_ref.current){
            let new_dependencyState = [...props.dependencyState]
            new_dependencyState.push({name:dep_input_ref.current?.value ? dep_input_ref.current?.value : (() => { alert("enter something first dep"); return ""})() })
            props.set_dependencyState(new_dependencyState)
            console.log(props.dependencyState)
        }
        else{
            console.log("something went wrong")
        }
    }

    return (
        <div className="tw-flex tw-flex-col">
            <div className="tw-mb-2">create menu</div>
            <div className="tw-flex">
                <div>
                    <input type="text" ref={input_mod_ref}/>
                </div>
                <div>
                    <button className={buttonStyle} onClick={addMod}>save</button>
                </div>
                <div>
                    <button className={buttonStyle}>cancel</button>
                </div>
            </div>
            <div>
                <div>add dependency</div>
                <div className="tw-flex">
                    {/* {
                        AddDependencyJSX()
                    } */}
                    <div>
                        <input type="text" ref={dep_input_ref}/>
                    </div>
                    <div>
                        <button className={buttonStyle} onClick={addNewDependency}>save</button>
                    </div>
                    {
                        DisplayAddDependency(props.dependencyState)
                    }
                </div>
            </div>
        </div>
    )

    function DisplayAddDependency(dependencyState:modList[] | undefined){
        console.log("dependencyState",dependencyState)
        if(dependencyState && dependencyState.length > 0){
            let display_array:JSX.Element[] = []
            dependencyState.map((value,index) => {
                <div key={index}>
                    <div className="tw-flex">
                        <div>
                            <input type="text" ref={input_mod_ref}/>
                        </div>
                        <div>
                            <button className={buttonStyle} onClick={addMod}>save</button>
                        </div>
                        <div>
                            <button className={buttonStyle}>cancel</button>
                        </div>
                    </div>
                    <div>
                        <div>add dependency</div>
                        <div>
                            {
                                DisplayAddDependency(value.dependency)
                            }
                        </div>
                    </div>
                </div>
            })
            return display_array
        }
        else{
            return <div></div>
        }
    }
    

    function removeDependency(index:number){
        let new_dependencyState = [...props.dependencyState]
        new_dependencyState.splice(index,1)
        props.set_dependencyState(new_dependencyState)
    }

    function AddDependencyJSX(){

        const dep_input_ref = createRef<HTMLInputElement>()

        function addNewDependency(){
            if(dep_input_ref.current){
                let new_dependencyState = [...props.dependencyState]
                new_dependencyState.push({
                    name: dep_input_ref.current?.value ? dep_input_ref.current?.value : (() => { alert("enter something first dep"); return "" })(),
                    id: ""
                })
                props.set_dependencyState(new_dependencyState)
            }
            else{
                console.log("something went wrong")
            }
        }

        return (
            <div className="tw-flex tw-flex-col">
                <div className="tw-flex">
                    <div>
                        <input type="text" ref={dep_input_ref}/>
                    </div>
                    <div>
                        <button className={buttonStyle} onClick={addNewDependency}>save</button>
                    </div>
                    {/* <div>
                        <button className={buttonStyle}>cancel</button>
                    </div> */}
                </div>
                <div className="tw-mt-4">
                    {
                        props.dependencyState.map((value,index) => {
                            return (
                                <div key={index} className="tw-flex">
                                    <div>
                                        {index+1}.{value.name}
                                    </div>
                                    <div>
                                        <button className={buttonStyle} onClick={() => {removeDependency(index)} }>remove</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* {
                        printDependency(props.dependencyState)
                    } */}
                </div>
            </div>
        )

    }

    // function printDependency(dependencyState:modList[]){
    //     const dependencyJSX = <div>
    //         {
    //             dependencyState.map((value,index) => {
    //                 return (
    //                     <div className="tw-flex tw-flex-col" key={index}>
    //                         <div>create menu</div>
    //                         <div className="tw-flex">
    //                             <div>
    //                                 <input type="text" ref={input_mod_ref}/>
    //                             </div>
    //                             <div>
    //                                 <button className={buttonStyle} onClick={addMod}>save</button>
    //                             </div>
    //                             <div>
    //                                 <button className={buttonStyle}>cancel</button>
    //                             </div>
    //                         </div>
    //                         <div>
    //                             <div>add dependency</div>
    //                             <div>
    //                                 {
    //                                     AddDependencyJSX()
    //                                 }
    //                             </div>
    //                         </div>
    //                     </div>
    //                 )
    //             })
    //         }
    //     </div>

    //     return dependencyJSX
    // }
}