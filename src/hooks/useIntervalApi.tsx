import { useEffect, useState } from "react";

export default function useIntervalApi(url: string, interval = 60000) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);

        const json = await res.json();

        if (!res.ok) {
          setError(json.message);
        }

        if (json.Note || json.Information) {
          setError(json.Note || json.Information);
        } else {
          setData(json);
        }
      } catch (error: any) {
        console.error("Error: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [url]);

  return { data, loading, error };
}
