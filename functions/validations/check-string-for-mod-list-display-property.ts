import { forOwn } from "lodash";
import { modListDisplay } from "../../interface/modList";

export function checkStringForModListDisplayProperty(string_to_check: string) {

  const testObj:modListDisplay  = {
    id:"",
    name:"",
    displayAddDependency:false,
    displayDependency:false,
    displayMod:false,
    dependency:[],
    displayModDetail:false,
    description:"",
    version:"",
    url:"",
    refFolder:"",  //in case this is a ref to the mod folder
    tag:[],
    status:3, //1 = done , 2 = mod installeed but not dependency 3 = mod not installed
    editMode:false,
}

    let isFound = false;

  forOwn(testObj, (value, key) => {
    // console.log(`${key}: ${value}`);
    if(key === string_to_check){
        isFound = true;
    }
  });

  return isFound
}

// |"id"
// |"name"
// |"displayAddDependency"
// |"displayDependency"
// |"displayMod"
// |"dependency"
// |"displayModDetail"
// |"description"
// |"version"
// |"url"
// |"refFolder"
// |"tag"
// |"status"
// |"editMode"












