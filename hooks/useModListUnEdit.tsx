import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiResponseDefault } from "../interface/api-response";
import modList, { modListDisplay } from "../interface/modList";
import { select_useSettingState, set_useSettingState } from "../store/useSettingSlice";

export function useModListUnEdit(modList: modList[] | modListDisplay[]):[modListDisplay[],Dispatch<SetStateAction<modListDisplay[]>>] {
  const [modListDisplayState, setModListDisplayState] = useState<modListDisplay[]>([]);
  const [installedModList,setInstalledModList] = useState<string[]>([])

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
          displayDependency: false,
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
          status: checkModDependencies(mod),
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
          status:checkModDependencies(modDisplay),
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

  function checkModDependencies(mod: modList): 1 | 2 | 3 {
    if (!installedModList.includes(mod.name)) {
      if (mod.dependency) {
        // console.log(mod)
        if(!mod.dependency || mod.dependency.length === 0){
          return 3;
        }
        else{
          for (const dependency of mod.dependency) {
            if (checkModDependencies(dependency) === 3) {
              return 3;
            }
          }
        }
      }
      // return 2;
      return 3;
    } else {
      if (mod.dependency) {
        // console.log(mod.dependency)
        for (const dependency of mod.dependency) {
          if (checkModDependencies(dependency) !== 1) {
            return 2;
          }
        }
      }
      return 1;
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