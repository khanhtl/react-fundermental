import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import { useState } from "react";
import Modal from "./Modal";

function Details() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  // useEffect(() => {
  //   throw new Error();
  // }, []);

  const { name, animal, city, state, breed, images, description } =
    results.data.pets[0];
  return (
    <div className="details">
      <Carousel images={images} />
      <div>
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {city},{state}
          <button onClick={() => setShowModal(true)}>Adopt {name}</button>
          <p>{description}</p>
          {showModal && (
            <Modal>
              <h1>Would you like to adopt {name}</h1>
              <div className="buttons">
                <button>Yes</button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </Modal>
          )}
        </h2>
      </div>
    </div>
  );
}

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
