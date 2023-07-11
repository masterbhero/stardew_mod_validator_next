import { lookupSetting } from "../functions/lookup/setting-lookup";

lookupSetting().then((result) => {
    console.log("result",result)
})