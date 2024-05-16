import { useEffect } from "react";
import { useState } from "react";
import { token } from "../../config";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message + "error");
          //   return toast.error(result.message);
        }
        // console.log(result);
        setData(result.data);
        setloading(false);
      } catch (error) {
        setloading(false);

        // console.log(error.message);
      }
    };
    console.log(data);
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
