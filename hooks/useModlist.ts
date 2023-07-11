import { useState, useEffect } from "react";
import { lookupAllModResponse } from "../interface/api-response";
import { select_useSettingState } from "../store/useSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import modList, { modListDisplay } from "../interface/modList";

export default function useModList() {
  const reloadTrigger = useSelector(select_useSettingState)
  // const dispatch = useDispatch();
  const [data, setData] = useState<modListDisplay[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./api/lookup-all-modlist");
        const json: lookupAllModResponse = await response.json();
        // console.log("useModList",json.data)
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
