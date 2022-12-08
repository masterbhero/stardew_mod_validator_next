import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import fs, { writeFileSync } from "fs";
import { readdir } from "fs/promises";
import _ from "lodash";
import { lookupSetting } from "../../functions/lookup/setting-lookup";
import { setting_location_config } from "../../setting/config";

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  //error
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  //method not match
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
  if (!req.query.path) {
    return res.status(400).json({
      status: false,
      data: req.body,
      message: "data not complete",
      debug: {
        body: req.body,
      },
    });
  }
  try{
    const read_setting:Buffer = fs.readFileSync(`${setting_location_config()}/${req.query.path}`)
    const json_data = JSON.parse(_.toString(read_setting))
    return res.status(200).json({
        status:true,
        data:json_data,
        message:"find successful",
        debug:{}
      })
  }
  catch(err:any){
    return res.status(500).json({
        status:false,
        data:null,
        message:err.message,
        debug:{
        //   body:req.body,
          path:`${setting_location_config()}/${req.query.name}`
        }
      })
  }
});

export default apiRoute;
