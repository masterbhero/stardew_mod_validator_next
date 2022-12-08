import { GetServerSideProps } from "next";
import fs from "fs";
import { readdir } from "fs/promises";
import _ from "lodash";
import { useEffect, useState } from "react";
import { lookup_list_config, setting_location_config } from "../setting/config";
import { lookupSetting } from "../functions/lookup/setting-lookup";
import DisplayActivatedMenu from "../components/displays/display-activated-menu";
import ModView3, {
  loopAndDisplayDependency,
  makeDisplayList,
  getModListJSXFileResult,
} from "../components/menus/mod-view-3/mod-view-3";
import DastaLavista from "../components/test/dastaLavista";
import modList from "../interface/modList";

export default function Test2(
  { file_result } : { file_result : {
    status: boolean;
    data: any;
    message: string;
    name: string;
}[] }
) {
  const [menuNameState, set_menuNameState] = useState("");
  const [modListJSX, set_modListJSX] = useState<JSX.Element>(<div></div>);

  useEffect(() => {
    console.log("file_result", file_result);
    // setModList(getModListResult(file_result));
    // set_modListJSX(getModListJSX(getModListResult(file_result)))
    set_modListJSX(getModListJSXFileResult(file_result))
  }, []);

  // function getModListResult(
  //   file_result: {
  //     status: boolean;
  //     data: any | undefined;
  //     message: string;
  //     name: string
  //   }[]
  // ) {
  //   file_result = file_result.filter((value) => value.name === 'modlist.json')
  //   const modlist = file_result[0].data.modlist
  //   return modlist
  // }

  return (
    <div>
      tasta2
      <button className="tw-border-2 tw-m-2" onClick={() => {set_menuNameState('modlist')}}>modlist</button>
      <button className="tw-border-2 tw-m-2" onClick={() => {set_menuNameState('dasta')}}>dasta</button>
      {DisplayActivatedMenu(menuNameState, [
        { name: "modlist", JSX: ModView3, menu_data: modListJSX },
        { name: "dasta", JSX: DastaLavista },
      ])}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const file_result = await lookupSetting();

  return {
    props: {
      file_result,
    },
  };
};
