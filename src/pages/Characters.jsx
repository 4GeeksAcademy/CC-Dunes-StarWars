import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Characters = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="container mt-4">
      <h2>Characters</h2>
      <div className="scroll-wrapper d-flex flex-nowrap overflow-auto">
        {store.people.map((character) => (
          <div className="card me-3" style={{ minWidth: "18rem" }} key={character.uid}>
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
              className="card-img-top"
              alt={character.name}
            />
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <Link to={`/details/people/${character.uid}`}>
                <button className="btn btn-primary">Learn More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Link to="/">
          <button className="btn btn-secondary">Back home</button>
        </Link>
      </div>
    </div>
  );
};