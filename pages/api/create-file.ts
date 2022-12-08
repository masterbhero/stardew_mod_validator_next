import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs"
import { lookupSetting } from '../../functions/lookup/setting-lookup';

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

// const postbody = {
//     filepath:`./setting/setting.json`,
//     data:JSON.stringify(initData)
// }

apiRoute.post(async (req,res) => {
    if(!req.body.filepath || !req.body.create_data){
        return res.status(400).json({
            status:false,
            data:req.body,
            message:'filepath or create_data missing'
        })
    }
    try{
        const filepath:string = req.body.filepath
        const create_data:string = req.body.create_data
        fs.writeFileSync(filepath,create_data)
        const file_result = await lookupSetting()
        res.status(200).json({
            status:true,
            data:file_result,
            message:'create success'
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

export default apiRoute;