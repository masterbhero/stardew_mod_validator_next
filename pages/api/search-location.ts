import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { readdir } from "fs/promises";
import _ from "lodash";

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
        const path = req.query.path
        if(_.isString(path)){
            const read_file_list = await readdir(path)
            if(read_file_list.includes('Stardew Valley.exe') && read_file_list.includes('Mods')){
                return res.status(200).json({
                    status:true,
                    data:path,
                    message:"read dir success",
                    debug:{
                        1:read_file_list.includes('Stardew Valley.exe'),
                        2:read_file_list.includes('Mods'),
                        3:read_file_list
                    }
                })
            }
            else{
                return res.status(200).json({
                    status:false,
                    data:path,
                    debug:{
                        1:read_file_list.includes('Stardew Valley.exe'),
                        2:read_file_list.includes('Mods'),
                        3:read_file_list
                    },
                    message:"read dir success but Stardew Valley and Mod not found"
                })
            }
        }
        else{
            return res.status(400).json({
                status:false,
                data:null,
                message:"path is not string"
            })
        }
    }
    catch(err:any){
        if(err.toString().includes('ENOENT')){
            return res.status(500).json({
                status:false,
                data:null,
                message:'dir not found'
            })
        }
        else{
            console.log(err)
            return res.status(500).json({
                status:false,
                data:null,
                message:err.message
            })
        }
    }
})

export default apiRoute;