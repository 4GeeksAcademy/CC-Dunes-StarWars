import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CardItem = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();
  const isFavorite = store.favorites.includes(item.uid);

  return (
    <div className="card me-3" style={{ minWidth: "18rem" }}>
      <img
        src={`https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`}
        className="card-img-top"
        alt={item.name}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <Link to={`/${type}/${item.uid}`}>
          <button className="btn btn-primary">Learn More</button>
        </Link>
        <button
          className="btn btn-outline-warning"
          onClick={() => dispatch({ type: "toggle_favorite", payload: item.uid })}
        >
          <i className={`fa ${isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"}`} />
        </button>
      </div>
    </div>
  );
};
