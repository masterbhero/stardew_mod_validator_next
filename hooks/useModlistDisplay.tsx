import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiResponseDefault } from "../interface/api-response";
import modList, { modListDisplay } from "../interface/modList";
import { select_keepDisplayDependency } from "../store/keepDisplayDependencySlice";
import { select_useSettingState, set_useSettingState } from "../store/useSettingSlice";
import { useHiddenTags } from "./useHiddenTags";

export function useModListDisplay(modList: modList[] | modListDisplay[]):[modListDisplay[],Dispatch<SetStateAction<modListDisplay[]>>] {
  const [modListDisplayState, setModListDisplayState] = useState<modListDisplay[]>([]);
  const [installedModList,setInstalledModList] = useState<string[]>([])

  // const currentPage = useSelector(select_currentPageState)
  const keepDisplayDependency:string[] = useSelector(select_keepDisplayDependency)

  const convertModListToModListDisplay = (
    modList: modList[] | modListDisplay[]
  ): modListDisplay[] => {
    if (Array.isArray(modList) && modList[0]?.hasOwnProperty("id")) {
      // modList is an array of modList objects
      return modList.map((mod) => {
        const modDisplay: modListDisplay = {
          id: mod.id,
          name: mod.name,
          create_date: mod.create_date,
          displayAddDependency: false,
          displayDependency: (mod.dependency && mod.dependency.length > 0 && keepDisplayDependency.includes(mod.id)) ? true : false,
          displayMod: false,
          dependency: mod.dependency
            ? convertModListToModListDisplay(mod.dependency)
            : [],
          displayModDetail: false,
          description: mod.description,
          version: mod.version,
          url: mod.url,
          refFolder: mod.refFolder,
          tag: mod.tag,
          status: getModStatus(mod),
          editMode: false,
        };

        return modDisplay;
      });
    } else if (Array.isArray(modList) && modList[0]?.hasOwnProperty("displayMod")) {
      // modList is an array of modListDisplay objects
      return modList.map((modDisplay) => {
        const updatedModDisplay: modListDisplay = {
          ...modDisplay,
          dependency: modDisplay.dependency
            ? convertModListToModListDisplay(modDisplay.dependency)
            : [],
          displayDependency: (modDisplay.dependency && modDisplay.dependency.length > 0 && keepDisplayDependency.includes(modDisplay.id)) ? true : false,
          status:getModStatus(modDisplay),
        };

        return updatedModDisplay;
      });
    } else {
      // modList is not an array of modList or modListDisplay objects
      return [];
    }
  };

  // reloadTrigger = 1 
  
  useEffect(() => {
    // const modListDisplayResult = convertModListToModListDisplay(modList);
    // setModListDisplayState(modListDisplayResult);
    async function fetchData() {
      const data = await getModList();
      setInstalledModList(data.data)
      setModListDisplayState(convertModListToModListDisplay(sortByCreateDateDESC(modList)))
    }
    fetchData();
  },[modList])

  async function getModList():Promise<apiResponseDefault>{
    const response = await fetch('./api/get/get-installed-modlist', {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }

  // function checkRefFolder(mod: modList){
  //   if(!mod.refFolder){
  //     return true
  //   }
  //   else{
  //     if(!installedModList.includes(mod.refFolder)){
  //       return true
  //     }
  //     else{
  //       return false
  //     }
  //   }
  // }

  // function checkModDependencies(mod: modList): 1 | 2 | 3 {
  //   if (!installedModList.includes(mod.name) && checkRefFolder(mod)) {
  //     if (mod.dependency) {
  //       // console.log(mod)
  //       if(!mod.dependency || mod.dependency.length === 0){
  //         return 3;
  //       }
  //       else{
  //         for (const dependency of mod.dependency) {
  //           if (checkModDependencies(dependency) === 3) {
  //             return 3;
  //           }
  //         }
  //       }
  //     }
  //     // return 2;
  //     return 3;
  //   } else {
  //     if (mod.dependency) {
  //       // console.log(mod.dependency)
  //       for (const dependency of mod.dependency) {
  //         if (checkModDependencies(dependency) !== 1) {
  //           return 2;
  //         }
  //       }
  //     }
  //     return 1;
  //   }
  // }

  function getModStatus(mod: modList): 1 | 2 | 3 {
    // Check if name or refFolder is in installedModList
    const isInstalled = installedModList.includes(mod.name) || (mod.refFolder && installedModList.includes(mod.refFolder));

    // Check if all dependencies are installed
    let allDependenciesInstalled = true;
    if (mod.dependency) {
      for (const dependency of mod.dependency) {
        if (getModStatus(dependency) !== 1) {
          allDependenciesInstalled = false;
          break;
        }
      }
    }

    // Return the correct status
    if (isInstalled && (!mod.dependency || allDependenciesInstalled)) {
      return 1;
    } else if (allDependenciesInstalled || isInstalled) {
      // return 2;
      if(mod.dependency?.length === 0){
        return 3;
      }
      else if(!isInstalled && (!mod.dependency || mod.dependency.length ===0)){        
        return 3;
      }
      else{
        return 2;
      }
    } else {
      return 3;
    }
  }

  
  function sortByCreateDateASC<T extends modList | modListDisplay>(modList: T[]): T[] {
    return modList.sort((a, b) => {
      const dateA = new Date(a.create_date);
      const dateB = new Date(b.create_date);
      return dateA.getTime() - dateB.getTime();
    });
  }

  function sortByCreateDateDESC<T extends modList | modListDisplay>(modList: T[]): T[] {
    return modList.sort((a, b) => {
      const dateA = new Date(a.create_date);
      const dateB = new Date(b.create_date);
      return dateB.getTime() - dateA.getTime();
    });
  }
  

  return [modListDisplayState, setModListDisplayState]
}

// check if mod/dependency is install with that name to check status 
//  - no need just change folder structer to match mod name

// don't reset displayDependency or keep dependency display when add new mod it's annoying

// make status 2 if all dependency is install but main mod is not install

// restructer folder