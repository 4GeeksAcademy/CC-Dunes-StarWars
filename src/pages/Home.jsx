import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { CardItem } from "../components/CardItem";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchData = async (url, key) => {
      const response = await fetch(url);
      if (!response.ok) return console.error("Fetch failed for", key);

      const data = await response.json();
      if (!data || !data.results) return console.error("Invalid data structure for", key);

      const detailedData = await Promise.all(
        data.results.map(async (item) => {
          const res = await fetch(item.url);
          const json = await res.json();
          return {
            ...json.result,
            type: key === "people" ? "characters" : key // Add type to each item
          };
        })
      );

      dispatch({ type: `set_${key}`, payload: detailedData });
    };

    if (!store.people.length) fetchData("https://www.swapi.tech/api/people", "people");
    if (!store.planets.length) fetchData("https://www.swapi.tech/api/planets", "planets");
    if (!store.vehicles.length) fetchData("https://www.swapi.tech/api/vehicles", "vehicles");
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
