import {
  lookup_list_config,
  setting_location_config,
} from "../../config/config";
import fs from "fs";
import { readdir } from "fs/promises";
import _ from "lodash";

export async function lookupSetting() {
  const read_file_list = await readdir(setting_location_config());

  const lookup_list = lookup_list_config();

  const file_result: {
    status: boolean;
    data: any | undefined;
    message: string;
    name: string;
  }[] = [];

  for (let lookup_file of lookup_list) {
    if (read_file_list.includes(lookup_file.name)) {
      try {
        const path = `${setting_location_config()}/${lookup_file.name}`;
        const file = fs.readFileSync(path, "utf8");
        const json_data = JSON.parse(file);
        if (_.has(json_data, lookup_file.lookup_field)) {
          const data = {
            status: true,
            data: json_data,
            message: `${lookup_file.name} is found and valid`,
            name: lookup_file.name
          };
          file_result.push(data);
        } else {
          const data = {
            status: false,
            data: json_data,
            message: `${lookup_file.name} is found but not valid`,
            name: lookup_file.name
          };
          file_result.push(data);
        }
      } catch (err) {
        // console.log(err)
        const data = {
          status: false,
          data: null,
          message: `${lookup_file.name} not valid or corrupt`,
          name: lookup_file.name
        };
        file_result.push(data);
      }
    } else {
      const data = {
        status: false,
        data: null,
        message: `${lookup_file.name} not found`,
        name: lookup_file.name
      };
      file_result.push(data);
    }
  }

  return file_result
}
