import { Dispatch, SetStateAction, useEffect, useState } from "react";
import modList, { dependencyDisplay, modListDisplay } from "../interface/modList";
import _ from "lodash";
import ModeView from "../components/views/mod-view/mod-view";

export default function Test() {
  //create state contain array then push when display or calculate new dependency
  //then when checking to display dependency or not search array for data in array state
  //if found that data then display if not don't display
  //doesn't work

  //seem like it's need to be a data array and display array
  //and display array need to be useState to update when needed to change display data

  const [activeList, set_activeList] = useState<string[]>([]);

  const [modDisplayList, set_modDisplayList] = useState<modListDisplay[]>([]);

  const mod_list: modList[] = [
    {
      name: "mod1",
      dependency: [
        { name: "mod1-dep1", dependency: [
            { name: "mod1-dep1-dep1", dependency: [
              { name: "mod1-dep1-dep1-dep1", dependency: [
                { name: Math.floor(Math.random() * 10000).toString(), dependency: [
                  { name: Math.floor(Math.random() * 10000).toString(), dependency: [
                    { name: Math.floor(Math.random() * 10000).toString(), dependency: [
                      { name: Math.floor(Math.random() * 10000).toString(), dependency: [
                        { name: Math.floor(Math.random() * 10000).toString(), dependency: [
                          { name: Math.floor(Math.random() * 10000).toString(), dependency: [
                            { name: Math.floor(Math.random() * 10000).toString(), dependency: [
                              { name: Math.floor(Math.random() * 10000).toString(), dependency: [
                                { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                                { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                                { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                              ] },
                              { name: "access here".toString(), dependency: [] },
                              { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                            ] },
                            { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                            { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                          ] },
                          { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                          { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                        ] },
                        { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                        { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                      ] },
                      { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                      { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                    ] },
                    { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                    { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                  ] },
                  { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                  { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                ] },
                { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
                { name: Math.floor(Math.random() * 10000).toString(), dependency: [] },
              ] },
              { name: "mod1-dep1-dep1-dep2", dependency: [] },
              { name: "mod1-dep1-dep1-dep3", dependency: [] },
            ] },
            { name: "mod1-dep1-dep2", dependency: [] },
            { name: "mod1-dep1-dep3", dependency: [] },
          ] 
        },
        { name: "mod1-dep2", dependency: [] },
        { name: "mod1-dep3", dependency: [] },
      ],
    },
    { name: "mod2", dependency: [
      { name: "mod2-dep1", dependency: [] },
      { name: "mod2-dep2", dependency: [] },
    ] },
    { name: "mod3", dependency: [] },
    { name: "mod4", dependency: [] },
  ];

  const mod_list2: modList[] = [
    {name:'mod1mod1mod1mod1mod1mod1mod1mod1mod1mod1mod1',dependency:[
      {name:'mod1',dependency:[]},
      {name:'mod2',dependency:[
        {name:'mod1',dependency:[]},
        {name:'mod2',dependency:[]},
      ]},
    ]},
    {name:'mod2',dependency:[
      {name:'mod1',dependency:[
        {name:'mod1',dependency:[]},
        {name:'mod2',dependency:[]},]},
      {name:'mod2',dependency:[
      ]},
    ]},
    {name:'mod3',dependency:[]},
    {name:'mod4',dependency:[]},
  ]

  function makeDisplayList() {
    const newDisplay: modListDisplay[] = [];
    for (let mod of mod_list) {
      newDisplay.push({
        ...mod,
        displayDependency:true
      });
    }
    set_modDisplayList(newDisplay);
  }

  function loopAndDisplayDependency(dependency:dependencyDisplay[] | undefined):JSX.Element
  function loopAndDisplayDependency(dependency:dependencyDisplay[] | undefined):JSX.Element[] 
  function loopAndDisplayDependency(dependency:dependencyDisplay[] | undefined):any {
    // console.log("loopAndDisplayDependency")
    if(dependency && dependency.length > 0){
      const display_array:JSX.Element[] = []
      dependency.map((value,key) => {
        // console.log("loopAndDisplayDependency");
        // console.log(value);
        display_array.push(
          <div key={key} className='tw-m-4'>
            {/* <div className='tw-m-4 tw-border-2 tw-cursor-copy' onClick={() => {console.log(value)}}> */}
            <div className='tw-m-4 tw-border-2 tw-cursor-copy' onClick={() => {updateModDisplayList(value)}}>
                {value.name}
            </div>
            {
              loopAndDisplayDependency(value.dependency)
            }
          </div>
        )
      })
      return display_array
    }
    else{
      return <div className="tw-text-white"></div>
    }

    // return <div className="tw-text-white">tasta</div>
  }

  function updateModDisplayList(value:modListDisplay){
    console.log("updateModDisplayList value in",value)
    let new_modDisplayList = [...modDisplayList]
    for(let mod of new_modDisplayList){
      if(_.isEqual(mod, value)){
        mod.name = "tag you're it"
      }
      else if(mod.dependency){
        loopArray(mod.dependency,value)
      }
    }
    set_modDisplayList(new_modDisplayList)
  }

  function loopArray(input:dependencyDisplay[],value:modListDisplay){
    console.log("loopArray value in",value)
    for(let mod of input){
      if(_.isEqual(mod, value)){
        mod.name = "tag you're it"
      }
      else if(mod.dependency){
        loopArray(mod.dependency,value)
      }
    }
  }

  useEffect(() => {
    // makeDisplayList();
    // console.log(modDisplayList);
  }, []);

  return (
    // <div className="tw-flex tw-flex-col tw-border-2 tw-border-red-500 tw-p-4">
    //   {/* <div>
    //     {mod_list.map((value, key) => {
    //       return (
    //         <div key={key} className="tw-bg-gray-800 tw-flex">
    //           <div
    //             className="
    //                 tw-w-[240px] 
    //                 tw-h-40
    //                 tw-border-2 
    //                 tw-border-yellow-500 
    //                 tw-rounded-md tw-p-4
    //                 tw-mb-4
    //                 tw-mr-10
    //             "
    //           >
    //             <div className="tw-border-2 tw-border-green-500 tw-rounded-md tw-p-4">
    //               <p>{value.name}</p>
    //             </div>
    //             <div className="tw-border-2 tw-border-green-500 tw-rounded-md tw-p-4">
    //               <button>add/remove</button>
    //             </div>
    //           </div>
    //           {value.dependency ? (
    //             <div
    //             className="tw-cursor-help"
    //               onClick={() => {
    //                 addModName(activeList, set_activeList, value.name,modDisplayList);
    //               }}
    //             >
    //               {
    //                 value.dependency.map((value2, key2) => {
    //                   if(key2 === 0){
    //                     return (
    //                       <div key={key2}>
    //                         <div
    //                           className="
    //                                             tw-w-[240px] 
    //                                             tw-h-40
    //                                             tw-border-2 
    //                                             tw-border-yellow-500 
    //                                             tw-rounded-md tw-p-4
    //                                             tw-mb-4
    //                                         "
    //                         >
    //                           <div className="tw-border-2 tw-border-green-500 tw-rounded-md tw-p-4">
    //                             <p>{value2.name}</p>
    //                           </div>
    //                           <div className="tw-border-2 tw-border-green-500 tw-rounded-md tw-p-4">
    //                             <button>add/remove</button>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     );
    //                   }
    //                   else if(activeList.includes(value.name)){
    //                     return (
    //                       <div key={key2}>
    //                         <div
    //                           className="
    //                                             tw-w-[240px] 
    //                                             tw-h-40
    //                                             tw-border-2 
    //                                             tw-border-yellow-500 
    //                                             tw-rounded-md tw-p-4
    //                                             tw-mb-4
    //                                         "
    //                         >
    //                           <div className="tw-border-2 tw-border-green-500 tw-rounded-md tw-p-4">
    //                             <p>{printName(value2.name)}</p>
    //                           </div>
    //                           <div className="tw-border-2 tw-border-green-500 tw-rounded-md tw-p-4">
    //                             <button>add/remove</button>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     );                        
    //                   }
    //                 })
    //               }
    //             </div>
    //           ) : (
    //             ""
    //           )}
    //         </div>
    //       );
    //     })}
    //   </div> */}
    //   <div>
    //     {modDisplayList.map((value, key) => {
    //       return (
    //         <div key={key} className="tw-bg-gray-800 tw-flex">
    //           <div
    //             className="
    //                 tw-w-[240px] 
    //                 tw-h-40
    //                 tw-border-2 
    //                 tw-border-yellow-500 
    //                 tw-rounded-md tw-p-4
    //                 tw-mb-4
    //                 tw-mr-10
    //             "
    //           >
    //             <div className="tw-border-2 tw-border-green-500 tw-rounded-md tw-p-4">
    //               <p>{value.name}</p>
    //             </div>
    //             <div className="tw-border-2 tw-border-green-500 tw-rounded-md tw-p-4">
    //               <button>add/remove</button>
    //             </div>
    //           </div>
    //           {/* {value.dependency ? (
    //             // <div className="tw-cursor-help" onClick={() => {setDisplay(modDisplayList,set_modDisplayList,value)}}>
    //             <div className="tw-cursor-help">
    //               {value.dependency.map((value2, key2) => {
    //                 if (key2 === 0) {
    //                   return (
    //                     <div key={key2}>
    //                       <div
    //                         className="
    //                                               tw-w-[240px] 
    //                                               tw-h-40
    //                                               tw-border-2 
    //                                               tw-border-yellow-500 
    //                                               tw-rounded-md tw-p-4
    //                                               tw-mb-4
    //                                           "
    //                       >
    //                         <div className="tw-border-2 tw-border-green-500 tw-rounded-md tw-p-4">
    //                           <p>{value2.name}</p>
    //                         </div>
    //                         <div className="tw-border-2 tw-border-green-500 tw-rounded-md tw-p-4">
    //                           <button>add/remove</button>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   );
    //                 } 
    //                 else if (value.displayDependency === true) {
    //                   return (
    //                     <div key={key2}>
    //                       <div
    //                         className="tw-w-[240px] tw-h-40 tw-border-2 tw-border-yellow-500 tw-rounded-md tw-p-4 tw-mb-4"
    //                       >
    //                         <div className="tw-border-2 tw-border-green-500 tw-rounded-md tw-p-4">
    //                           <p>{value2.name}</p>
    //                         </div>
    //                         <div className="tw-border-2 tw-border-green-500 tw-rounded-md tw-p-4">
    //                           <button>add/remove</button>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   );
    //                 }
    //                 else{
    //                   return (
    //                     <div key={key2}></div>
    //                   )
    //                 }
    //               })}
    //             </div>
    //           ) : (
    //             ""
    //           )} */}
    //           {
    //             loopAndDisplayDependency(value.dependency)
    //           }
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
    <div>
      {
        // ModeView({props:{mod_list:mod_list}})
        ModeView({props:{mod_list:mod_list2}})
      }
    </div>
  );
}

// function setDisplay(modDisplayList:modListDisplay[],set_modDisplayList:Dispatch<SetStateAction<modListDisplay[]>>,selectMod:modListDisplay | dependencyDisplay){
//   const index = modDisplayList.findIndex((value) =>  {
//     return _.isEqual(selectMod, value);
//   })
//   if(index !== -1){
//     let new_modDisplayList = [...modDisplayList]
//     new_modDisplayList[index].displayDependency = !new_modDisplayList[index].displayDependency
//     console.log(new_modDisplayList)
//     set_modDisplayList(new_modDisplayList)
//   }
//   else{
//     alert("oh no")
//   }
// }

// function printName(name: string) {
//   // console.log("printName",name);
//   return name;
// }

// //addModNameToShowDependency
// function addModName(
//   activeList: string[],
//   set_activeList: Dispatch<SetStateAction<string[]>>,
//   name_to_add: string,
//   modDisplayList: modListDisplay[]
// ) {
//   console.log("addModName");
//   console.log("modDisplayList", modDisplayList);
//   const new_activeList: string[] = activeList;
//   new_activeList.push(name_to_add);
//   set_activeList(new_activeList);
//   console.log(activeList);
// }
