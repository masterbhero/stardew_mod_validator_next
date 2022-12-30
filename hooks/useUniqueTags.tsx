import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import modList from "../interface/modList"

export function useUniqueTags(modLists: modList[]):[string[],Dispatch<SetStateAction<string[]>>] {
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);

  useEffect(() => {
    // get all tags from all modLists
    const allTags = modLists.flatMap(modList => modList.tag);
    let allTagsNotUndefined:string[] = []

    for(let tag of allTags){
      if(tag !== undefined) allTagsNotUndefined.push(tag)
    }

    const uniqueSet = new Set(allTagsNotUndefined);

    setUniqueTags(Array.from(uniqueSet))
    // const allTags = modLists.flatMap



    // get unique tags
    // const uniqueTags = [...new Set(allTags)];

    // setUniqueTags(modLists.map(mod => mod.tag).flat().filter(tag => tag !== undefined) as string[]);
    // console.log(uniqueTags)
  }, [modLists]);

  return [uniqueTags, setUniqueTags];
}