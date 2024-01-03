import React, { useState, useEffect, useCallback} from "react";
import Table from "./Table";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import makeApiCall from "../../api";

const Requests = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const url = "https://sportenvbackend.vercel.app/request";
      const method = "GET";
      const response = await makeApiCall(url, method, null);
      const updatedData = response.data.map((item) => {
        const requestedDate = new Date(item.requestedDate);
        return {
          ...item,
          requestedDate: requestedDate.toLocaleDateString(),
        };
      });
      setData(updatedData);
    } catch (error) {
      console.log(error);
      toast.error("Error with contacting server...");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [fetchData,token]);

  return (
    <div className="w-full h-[89vh]">
      <h2 className="text-3xl text-center p-5">Requests</h2>
      <div className="p-3 text-center">{loading && "Loading..."}</div>
      <div className="p-3 text-center">
        {!loading && data.length === 0 && "No Items"}
      </div>
      <div className="p-3">
        {!loading && data.length !== 0 && <Table data={data} />}
      </div>
    </div>
  );
};

export default Requests;
