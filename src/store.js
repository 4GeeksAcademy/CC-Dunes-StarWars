export const initialStore = () => {
  const storedFavorites = localStorage.getItem("favorites");
  const favorites = storedFavorites && isValidJSON(storedFavorites)
    ? JSON.parse(storedFavorites)
    : [];

  return {
    people: [],
    planets: [],
    vehicles: [],
    favorites,
  };
};

// Simple manual JSON validation
function isValidJSON(str) {
  return (
    typeof str === "string" &&
    str.startsWith("[") &&
    str.endsWith("]") &&
    str.length > 1
  );
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_people":
      return { ...store, people: action.payload };

    case "set_planets":
      return { ...store, planets: action.payload };

    case "set_vehicles":
      return { ...store, vehicles: action.payload };

    case "toggle_favorite": {
      const { uid, type } = action.payload;
      const exists = store.favorites.some(
        (fav) => fav.uid === uid && fav.type === type
      );

      const updatedFavorites = exists
        ? store.favorites.filter((fav) => !(fav.uid === uid && fav.type === type))
        : [...store.favorites, { uid, type }];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return {
        ...store,
        favorites: updatedFavorites,
      };
    }

    default:
      throw new Error("Unknown action type: " + action.type);
  }
}
