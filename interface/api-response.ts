import modList from "./modList";

export interface apiResponseDefault {
  status: boolean;
  data: any;
  message: string;
  debug?: any;
}

export interface lookUpAllSettingResponse extends apiResponseDefault {
  data: {
    data: any;
    message: string;
    name: string;
    status: boolean;
  }[];
}

export interface lookupAllModResponse extends apiResponseDefault {
  data:modList[]
}