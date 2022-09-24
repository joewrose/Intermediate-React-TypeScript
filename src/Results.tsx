import { FunctionComponent } from "react";
import { Pet as PetType } from "./APIResponseTypes";
import Pet from "./Pet";

// Uses a turnary, these are generally used when we unable to use
// if-else statements (A.K.A. when we are writing an expression)
const Results: FunctionComponent<{ pets: PetType[] }> = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
