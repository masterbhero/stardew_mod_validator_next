import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";

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
    
})

export default apiRoute;