import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { readdir } from "fs/promises";
import _ from "lodash";
import { setting_location_config } from '../../setting/config';

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
    if(!req.query.filename){
        return res.status(400).json({
            status:false,
            data:req.body,
            message:'filename missing'
        })
    }
    try{
        const path = `${setting_location_config()}/${req.query.filename}`;
        const file = fs.readFileSync(path, "utf8");
        const json_data = JSON.parse(file);
        return res.status(200).json({
            status:true,
            data:json_data,
            message:"look up success"
        })
    }
    catch(err:any){
        // console.log(err)
        return res.status(200).json({
            status:false,
            data:null,
            message:err.message
        })
    }
})

export default apiRoute;