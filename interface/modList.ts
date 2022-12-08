//data type

//mod list 
interface modList
{
    id:string,
    name:string,
    dependency?:modList[],
    description?:string,
    version?:string,
    url?:string,
    refFolder?:string,  //in case this is a ref to the mod folder
    tag?:string[], //tag system for seach if mod of similar tag is already install to prevent conflict
}

export interface mod_detail{
    description:string,
    version:string,
    url:string,
    refFolder:string,  //in case this is a ref to the mod folder
    tag:string[], //tag system for seach if mod of similar tag is already install to prevent conflict
}

export interface mod_detail_optional{
    description?:string,
    version?:string,
    url?:string,
    refFolder?:string,  //in case this is a ref to the mod folder
    tag?:string[], //tag system for seach if mod of similar tag is already install to prevent conflict
}

// interface rand{

// }

// interface dependency
// {
//     name:string,
//     dependency?:dependency[],
//     description?:string,
//     version?:string,
//     url?:string,
//     refFolder?:string[],  //in case this is a ref to the mod folder
// }

export default modList

/*
    refFolder 
        when the mod name is kinda weird or not the same as mod this will
        be use to link to that mod for easier mod searching
        also useful when install mod that have multiple folder to check if 
        that mod install correctly
*/

export interface modListCreateDisplay {
    id:string,
    name:string,
    dependency?:modListCreateDisplay[],
    description?:string,
    version?:string,
    url?:string,
    refFolder?:string,  //in case this is a ref to the mod folder
    tag?:string[], //tag system for seach if mod of similar tag is already install to prevent conflict
    displayModDetail:boolean
}

export interface modListDisplay {
    id:string,
    name:string,
    displayDependency?:boolean,
    displayMod?:boolean,
    dependency?:modListDisplay[],
    displayModDetail?:boolean
    description?:string,
    version?:string,
    url?:string,
    refFolder?:string,  //in case this is a ref to the mod folder
    tag?:string[],
    status?:number, //1 = done , 2 = mod installeed but not dependency 3 = mod not installed
}

export interface dependencyDisplay {
    name:string,
    displayDependency?:boolean,
    dependency?:dependencyDisplay[],
    description?:string,
    version?:string,
    url?:string,
    refFolder?:string[],  //in case this is a ref to the mod folder
}