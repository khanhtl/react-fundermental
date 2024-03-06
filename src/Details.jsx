import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import fetchPet from "./fetchPet";

function Details() {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const { name, animal, city, state, breed, description } =
    results.data.pets[0];
  return (
    <div className="details">
      <div>
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {city},{state}
          <button>Adopt {name}</button>
          <p>{description}</p>
        </h2>
      </div>
    </div>
  );
}

export default Details;
