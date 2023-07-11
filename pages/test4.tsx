import { useEffect } from "react"
import { lookupSetting, lookupSettingJson, readAllFolderName } from "../functions/lookup/setting-lookup"
import { GetServerSideProps } from "next";
import useModList from "../hooks/useModlist";
import modList from "../interface/modList";
import axios, { AxiosResponse } from "axios"
// import fs from "fs"

// export default function Test4({ file_result } : {file_result : {
export default function Test4({ file_list }:{ file_list : any }){

    const modList: modList[] = useModList().data;
    
    useEffect(() => {
        console.log("file_list", file_list);
        console.log("modList", modList);
        checkFileNotInTheList(file_list,modList)
        // scrapeWebpage("https://www.nexusmods.com/stardewvalley/mods/15792")
    }, []);
    
    // function scrapeWebpage(url: string) {
    //     try {
    //     //   const response: AxiosResponse<string> = await axios.get(url);
    //     //   console.log(response.data);
    //     axios.get(url).then((response) => {
    //         console.log("axios response",response)
    //     }).catch((err) => {
    //         console.log("axios err",err)
    //     })
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    // }

    function checkFileNotInTheList(file_list:string[],modList:modList[]){

        const not_match = []

        for(let file of file_list){
            const index = modList.findIndex((modIndex) => {
                return modIndex.name === file
            })

            if(index == -1){
                not_match.push(file)
                console.log(file)
            }
        }

        console.log("not_match",not_match)
    }

    return (
        <div>
            {/* <StatusBar /> */}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // const file_result = await lookupSettingJson();
    const file_list = await readAllFolderName()
    // console.log("file_list",file_list)
    return {
      props: {
        file_list
      },
    };
  };

//   function getAllFoldersInDirectory(directoryPath:string) {
//     try {
//       const files = fs.readdirSync(directoryPath);
//       const folders = files.filter((file) =>
//         fs.statSync(`${directoryPath}/${file}`).isDirectory()
//       );
//       return folders;
//     } catch (error) {
//       console.error("Error occurred while reading directory:", error);
//       return [];
//     }
//   }