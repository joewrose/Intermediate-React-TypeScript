import { useState, useEffect } from "react";
import { Animal, BreedListAPIResponse } from "./APIResponseTypes";

// This cache is used to reduce API calls
const localCache: {
  [key: string]: string[];
} = {};

type Status = "unloaded" | "loading" | "loaded";

export default function useBreedList(animal: Animal) {
  const [breedList, setBreedList] = useState([] as string[]);
  const [status, setStatus] = useState("unloaded" as Status);

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      // Since we are using an async function, it will return a promise, which
      // we have to explicity ignore using 'void'.
      void requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = (await res.json()) as BreedListAPIResponse;
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
