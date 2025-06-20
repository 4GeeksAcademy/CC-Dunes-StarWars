import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { fetchAndCache } from "../utils/fetchAndCache";
import { CardItem } from "../components/CardItem";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    if (!store.people.length) fetchAndCache("https://www.swapi.tech/api/people", "people", dispatch);
    if (!store.planets.length) fetchAndCache("https://www.swapi.tech/api/planets", "planets", dispatch);
    if (!store.vehicles.length) fetchAndCache("https://www.swapi.tech/api/vehicles", "vehicles", dispatch);
  }, []);

  const renderSection = (title, data, type) => (
    <div className="mb-5">
      <h2 className="text-danger mb-3 fw-bold" style={{ fontSize: "2rem" }}>{title}</h2>
      <div className="scrolling-wrapper d-flex flex-nowrap overflow-auto pb-3" style={{ gap: "1.5rem" }}>
        {data.map((item) => (
          <div className="card-wrapper" style={{ flex: "0 0 auto", width: "18rem" }} key={item.uid}>
            <CardItem item={item} type={type} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      {renderSection("Characters", store.people, "characters")}
      {renderSection("Planets", store.planets, "planets")}
      {renderSection("Vehicles", store.vehicles, "vehicles")}
    </div>
  );
};
