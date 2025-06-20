export async function fetchAndCache(url, key, dispatch) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    dispatch({ type: "set_data", key, payload: data.results });
  } catch (err) {
    console.error("Failed to fetch", key, err);
  }
}