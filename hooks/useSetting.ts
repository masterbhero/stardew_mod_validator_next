import { useState, useEffect } from "react";
import { lookUpAllSettingResponse } from "../interface/api-response";
import { select_useSettingState } from "../store/useSettingSlice";
import { useDispatch, useSelector } from "react-redux";

export default function useSetting() {
  const reloadTrigger = useSelector(select_useSettingState)
  // const dispatch = useDispatch();
  const [data, setData] = useState<
    {
      data: any;
      message: string;
      name: string;
      status: boolean;
    }[]
  >();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./api/lookup-all-setting");
        const json: lookUpAllSettingResponse = await response.json();
        setData(json.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  },[reloadTrigger]);

  return { data, error, loading };
}
