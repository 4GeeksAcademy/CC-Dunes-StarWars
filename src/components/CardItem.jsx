import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CardItem = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();

  const isFavorite = store.favorites.some(
    (fav) => String(fav.uid) === String(item.uid) && fav.type === type
  );

  const handleFavoriteToggle = () => {
    dispatch({
      type: "toggle_favorite",
      payload: { uid: item.uid, type },
    });
  };

  const placeholderImg = "https://placehold.co/400x200";
  const imageUrl = `https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`;

  const renderDetails = () => {
    const textStyle = { color: "white", fontSize: "0.9rem" };

    if (type === "people") {
      return (
        <div style={textStyle}>
          <div>Gender: {item.gender || "N/A"}</div>
          <div>Eye Color: {item.eye_color || "N/A"}</div>
          <div>Hair Color: {item.hair_color || "N/A"}</div>
        </div>
      );
    } else if (type === "planets") {
      return (
        <div style={textStyle}>
          <div>Climate: {item.climate || "N/A"}</div>
          <div>Terrain: {item.terrain || "N/A"}</div>
          <div>Population: {item.population || "N/A"}</div>
        </div>
      );
    } else if (type === "vehicles") {
      return (
        <div style={textStyle}>
          <div>Model: {item.model || "N/A"}</div>
          <div>Manufacturer: {item.manufacturer || "N/A"}</div>
          <div>Class: {item.vehicle_class || "N/A"}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="card me-3 bg-dark text-white shadow"
      style={{ minWidth: "18rem", maxWidth: "18rem", borderRadius: "10px" }}
    >
      <img
        src={imageUrl}
        className="card-img-top rounded-top"
        alt={item.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholderImg;
        }}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title text-truncate" title={item.name}>
          {item.name}
        </h5>
        {renderDetails()}
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <Link to={`/${type}/${item.uid}`} className="btn btn-outline-light btn-sm">
          Learn More
        </Link>
        <button
          className="btn btn-sm btn-outline-warning"
          onClick={handleFavoriteToggle}
        >
          <i className={`fa ${isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"}`} />
        </button>
      </div>
    </div>
  );
};
