import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const DetailPage = () => {
  const { type, uid } = useParams();
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
      if (!res.ok) {
        setLoaded(true);
        return;
      }
      const json = await res.json();
      if (!json.result?.properties) {
        setLoaded(true);
        return;
      }
      setData(json.result.properties);
      setLoaded(true);
    };
    fetchDetail();
  }, [type, uid]);

  if (!loaded) return <div className="text-center">Loading...</div>;
  if (!data) return <div className="text-danger text-center">No data found.</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-capitalize">{type}: {data.name || data.title}</h1>
      <ul className="list-group">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="list-group-item">
            <strong>{key.replace(/_/g, " ")}: </strong>
            {value?.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
