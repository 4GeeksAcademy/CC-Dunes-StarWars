// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Characters = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container">
      <ul className="list-group">
        {/* Map over the 'todos' array from the store and render each item as a list element */}
        {store && store.todos?.map((item) => {
          return (
            <li
              key={item.id}  // React key for list items.
              className="list-group-item d-flex justify-content-between"
              style={{ background: item.background }}> 
              
              {/* Link to the detail page of this todo. */}
              <Link to={"/single/" + item.id}>Link to: {item.title} </Link>
              
              <p>Open file ./store.js to see the global store that contains and updates the list of colors</p>
              
              <button className="btn btn-success" 
                onClick={() => dispatch({
                  type: "add_task", 
                  payload: { id: item.id, color: '#ffa500' }
                })}>
                Change Color
              </button>
            </li>
          );
        })}
      </ul>
      <br />

      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>

        <div className="container mt-4">
  <div className="scroll-wrapper d-flex flex-nowrap overflow-auto">
    {[...Array(10)].map((_, i) => (
      <div className="card me-3" style={{ minWidth: "18rem" }} key={i}>
        <div className="card-body">
          <h5 className="card-title">Card {i + 1}</h5>
          <p className="card-text">Some quick content.</p>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>

    
  );
};
