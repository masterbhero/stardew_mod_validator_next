import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { readdir } from "fs/promises";
import _ from "lodash";
import { lookupSetting, lookupSettingJson } from '../../../functions/lookup/setting-lookup';

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    //error
    onError(error, req, res) {
      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    //method not match
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.get(async (req,res) => {
    try{
        const file_result = await lookupSettingJson()
        if(!file_result.status){
            throw ({
                message:"find or validate setting.json fail"
            })
        }
        const mod_folder_location = `${file_result.data.stardew_location}\\Mods`
        const installModList = fs.readdirSync(mod_folder_location)
        // return res.status(200).send({
        //     file_result,
        //     mod_folder_location:mod_folder_location,
        //     installModList:installModList
        // })
        return res.status(200).json({
            status:true,
            data:installModList,
            message:"look up success"
        })
    }
    catch(err:any){
        console.log(err.stack)
        return res.status(500).json({
            status:false,
            data:null,
            message:err.message
        })
    }
})

export default apiRoute;