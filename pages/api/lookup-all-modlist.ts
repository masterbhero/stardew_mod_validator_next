import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { readdir } from "fs/promises";
import _ from "lodash";
import { setting_location_config } from '../../config/config';
import { lookupSetting } from '../../functions/lookup/setting-lookup';
import { lookUpAllSettingResponse } from '../../interface/api-response';

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
        const file_result = await lookupSetting()
        if(file_result && file_result.length > 0){
            const index = file_result.findIndex((value) => {
                return value.name === 'modlist.json'
            })

            const modlist = file_result[index].data.modlist
            return res.status(200).json({
                status:true,
                data:modlist,
                message:"look up success"
            })
        }
        else{
            return res.status(200).json({
                status:false,
                data:[],
                message:"look up fail"
            })
        }
        // return res.status(200).json({
        //     status:true,
        //     data:file_result,
        //     message:"look up success"
        // })
    }
    catch(err:any){
        return res.status(200).json({
            status:false,
            data:null,
            message:err.message
        })
    }
})

export default apiRoute;