export const initialStore = () => {
  const local = localStorage.getItem("swapiStore");
  return local
    ? JSON.parse(local)
    : {
        people: [],
        vehicles: [],
        planets: [],
        favorites: []
      };
};

export default function storeReducer(store, action = {}) {
  let newStore = store;
  switch (action.type) {
    case "set_data":
      newStore = { ...store, [action.key]: action.payload };
      break;
    case "toggle_favorite":
      const exists = store.favorites.includes(action.payload);
      newStore = {
        ...store,
        favorites: exists
          ? store.favorites.filter((fav) => fav !== action.payload)
          : [...store.favorites, action.payload]
      };
      break;
    default:
      throw new Error("Unknown action type");
  }
  localStorage.setItem("swapiStore", JSON.stringify(newStore));
  return newStore;
}