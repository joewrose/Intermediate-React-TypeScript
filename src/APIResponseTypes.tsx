// Example of an enumerated type in TS
export type Animal = "dog" | "cat" | "bird" | "reptile" | "rabbit";

// This seems similar to a struct in C
export interface Pet {
  id: number;
  name: string;
  animal: Animal;
  description: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
}

export interface PetAPIResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
}
