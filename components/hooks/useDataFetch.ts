import React, { useState, useEffect } from "react";
import axios from "axios";

interface useDataFetchOutput {
  data: any;
  loading: boolean;
  error: Error;
  sendNewRequest: (newEndpoint: string) => void;
}

function UseDataFetch(
  originalEndpoint: string,
  cb?: (val: any[] | any) => void
): useDataFetchOutput {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let source = axios.CancelToken.source();

  async function fetchData(endpoint) {
    try {
      setLoading(true);
      await sendRequest(endpoint);
    } catch (err) {
      setLoading(false);
      if (axios.isCancel(err)) {
        console.log("request cancelled");
      } else {
        setError(err);
      }
    }
  }

  async function sendRequest(endpoint) {
    const response = await axios.get(endpoint, {
      cancelToken: source.token,
    });
    if (response.data.status === "ok") {
      setData(response.data.data);
      setLoading(false);
      if (cb) {
        cb(response.data.data);
      }
    } else {
      throw new Error(response.data.message);
    }
  }

  function sendNewRequest(newEndpoint: string): void {
    fetchData(newEndpoint);
  }

  useEffect(() => {
    fetchData(originalEndpoint);
    return () => {
      // Cancels axios request on component unmounting to prevent data leaks
      source.cancel();
    };
  }, []);

  return { data, loading, error, sendNewRequest };
}

export default UseDataFetch;
