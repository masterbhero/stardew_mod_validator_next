import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { modListDisplay } from "../interface/modList";

export function useModTemplateFilter(modListDisplayState: modListDisplay[]):[modListDisplay[], Dispatch<SetStateAction<string>>]{

    const [filterText,setFilterText] = useState<string>("")
    const [filterdModList,setFilterModList] = useState<modListDisplay[]>([])

    useEffect(() => {
        const cloned_modListDisplay = [...modListDisplayState]

        console.log("filterText",filterText)
        console.log("cloned_modListDisplay",cloned_modListDisplay)

        // const filter_modListDisplay = (filterText && filterText !== '') ? cloned_modListDisplay.filter(mod => mod.name.toLowerCase().includes(filterText)) : cloned_modListDisplay;
        const filter_modListDisplay = (filterText && filterText !== '') ? cloned_modListDisplay.filter(mod => mod.name.toLowerCase().includes(filterText)) : [];

        console.log("filter_modListDisplay",filter_modListDisplay)

        setFilterModList(filter_modListDisplay)

    },[modListDisplayState,filterText])

    return [filterdModList,setFilterText]
}