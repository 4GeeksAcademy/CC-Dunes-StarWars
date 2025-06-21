import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { CardItem } from "../components/CardItem";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const fetchDetails = async (endpoint, type) => {
  const res = await fetch(`https://www.swapi.tech/api/${endpoint}`);
  if (!res.ok) return; 
  const data = await res.json();

  const detailedItems = [];

  for (const item of data.results) {
    const resDetail = await fetch(item.url);
    if (!resDetail.ok) continue;

    const detailData = await resDetail.json();
    detailedItems.push({ ...detailData.result.properties, uid: item.uid });
    
    await new Promise(r => setTimeout(r, 100)); 
  }

  dispatch({ type, payload: detailedItems });
};


  useEffect(() => {
    if (store.people.length === 0) fetchDetails("people", "set_people");
    if (store.planets.length === 0) fetchDetails("planets", "set_planets");
    if (store.vehicles.length === 0) fetchDetails("vehicles", "set_vehicles");
  }, []);

  const renderSection = (title, data, type) => (
    <div className="mb-5">
      <h2 className="text-white">{title}</h2>
      <div className="scroll-wrapper d-flex flex-nowrap overflow-auto gap-3">
        {data.map((item) => (
          <CardItem key={`${item.uid}-${type}`} item={item} type={type} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      {renderSection("Characters", store.people, "people")}
      {renderSection("Planets", store.planets, "planets")}
      {renderSection("Vehicles", store.vehicles, "vehicles")}
    </div>
  );
};
