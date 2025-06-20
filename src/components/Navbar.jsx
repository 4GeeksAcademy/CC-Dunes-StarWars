import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemoveFavorite = (fav) => {
    dispatch({ type: "remove_favorite", payload: fav });
  };

  const allItems = [
    ...store.people.map(p => ({ ...p, type: "people" })),
    ...store.planets.map(p => ({ ...p, type: "planets" })),
    ...store.vehicles.map(v => ({ ...v, type: "vehicles" }))
  ];

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/11/Star-Wars-Emblem.png"
              alt="Star Wars Logo"
              style={{ width: "100px" }}
            />
          </span>
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites <span className="badge bg-dark">{store.favorites.length}</span>
          </button>

          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
            {store.favorites.length === 0 ? (
              <li className="dropdown-item text-muted">No favorites</li>
            ) : (
              store.favorites.map((fav, index) => {
                const item = allItems.find((el) => String(el.uid) === String(fav.uid) && String(el.type) === String(fav.type));

                return item ? (
                  <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                    <span className="text-truncate" style={{ maxWidth: "150px" }}>{item.name}</span>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => handleRemoveFavorite(fav)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </li>
                ) : null;
              })
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
