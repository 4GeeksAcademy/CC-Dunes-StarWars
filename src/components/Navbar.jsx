import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemoveFavorite = (uid, type) => {
    dispatch({ type: "toggle_favorite", payload: { uid, type } });
  };

  const findItem = (uid, type) => {
    const list = store[type] || [];
    return list.find((item) => String(item.uid) === String(uid));
  };

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
              store.favorites.map((fav) => {
                const item = findItem(fav.uid, fav.type);
                return item ? (
                  <li
                    key={`${fav.uid}-${fav.type}`}
                    className="dropdown-item d-flex justify-content-between align-items-center"
                  >
                    <span className="text-truncate" style={{ maxWidth: "150px" }}>{item.name}</span>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => handleRemoveFavorite(fav.uid, fav.type)}
                    >
                      <i className="fa fa-trash" />
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
