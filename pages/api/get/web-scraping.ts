import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cheerio, { CheerioAPI, load } from 'cheerio';

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  // Error handler
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  // Method not allowed handler
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
    const query = req.query.url
    if(query === undefined || query.length === 0 || query === ""){
        return res.status(400).json({
            status: false,
            data: null,
            message: "query empty",
        });
    }
    const url = query as string
    // const url = 'https://www.nexusmods.com/stardewvalley/mods/15792'; // Specify the URL to scrape here

    try {
        const response = await axios.get(url);
        const html = response.data;
    
        const $ = cheerio.load(html);

        return res.status(200).json({
            status:true,
            message:"success",
            data:{
                name:getName($),
                version:getVersion($),
                desciption:getDescription($),
                tag:getTag($)
            }
        })
    } 
    catch (err:any) {
        console.log("web-scraping-err",err.stack);
        return res.status(500).json({
            status: false,
            data: null,
            message: err.message,
        });
    }
});
export default apiRoute;

function getName($: CheerioAPI) {
    const selector = 'div#pagetitle';
    const elements = $(selector);
  
    const name = elements.find('h1').text();
  
    return name;
}

function getVersion($: CheerioAPI){
    const selector = ".stat-version"
    const elements = $(selector);

    const version = elements.find('.stat').text();

    return version;
}

function getDescription($: CheerioAPI) {
    const selector1 = '.container';
    const selector2 = '.tab-description';

    const element = $(`${selector1}${selector2}`);
    const childParagraphs = element.find('p');
    const chileParagrapthsReplace = childParagraphs.toString().replaceAll("<p>","").replaceAll("</p>","").replaceAll("\n"," ").replaceAll("\t"," ").replace("<b>","").replace("</b>","").replace("<br>"," ").replace(" ","")

    return chileParagrapthsReplace
}

function getTag($: CheerioAPI) {
    const selector = 'a[href^="https://www.nexusmods.com/stardewvalley/mods/categories"]';
    const elements = $(selector);
  
    const scrapedData = elements.map((index, el) => $(el).text()).get();
  
    return scrapedData[2].replace("\n","");
}