import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div className="container mt-4">
      <div className="scroll-wrapper d-flex flex-nowrap overflow-auto">
        <div className="card me-3" style={{ minWidth: "18rem" }}>
          <img
            src="https://image-placeholder.com/images/actual-size/468x240.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Luke Skywalker</h5>
            <p className="card-text">Gender: male</p>
            <p className="card-text">Hair Color: blonde</p>
            <p className="card-text">Eye-Color: blue</p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <Link to="/Characters">
              <button className="btn btn-primary">Learn More!</button>
            </Link>
            <button
              className="btn btn-outline-warning"
              onClick={() => {
                setIsFavorite(!isFavorite);
                // TODO: call addToFavorites() or removeFromFavorites()
              }}
            >
              <i
                className={`fa ${
                  isFavorite ? "fa-thin fa-heart" : "fa-solid fa-heart"
                }`}
              ></i>
            </button>
          </div>
        </div>
        <div className="card me-3" style={{ minWidth: "18rem" }}>
          <img
            src="https://image-placeholder.com/images/actual-size/468x240.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Luke Skywalker</h5>
            <p className="card-text">Gender: male</p>
            <p className="card-text">Hair Color: blonde</p>
            <p className="card-text">Eye-Color: blue</p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <Link to="/Characters">
              <button className="btn btn-primary">Learn More!</button>
            </Link>
            <button
              className="btn btn-outline-warning"
              onClick={() => {
                setIsFavorite(!isFavorite);
                // TODO: call addToFavorites() or removeFromFavorites()
              }}
            >
              <i
                className={`fa ${
                  isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"
                }`}
              ></i>
            </button>
          </div>
        </div>
        <div className="card me-3" style={{ minWidth: "18rem" }}>
          <img
            src="https://image-placeholder.com/images/actual-size/468x240.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Luke Skywalker</h5>
            <p className="card-text">Gender: male</p>
            <p className="card-text">Hair Color: blonde</p>
            <p className="card-text">Eye-Color: blue</p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <Link to="/Characters">
              <button className="btn btn-primary">Learn More!</button>
            </Link>
            <button
              className="btn btn-outline-warning"
              onClick={() => {
                setIsFavorite(!isFavorite);
                // TODO: call addToFavorites() or removeFromFavorites()
              }}
            >
              <i
                className={`fa ${
                  isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"
                }`}
              ></i>
            </button>
          </div>
        </div>
        
        </div>
      </div>
  );
};
