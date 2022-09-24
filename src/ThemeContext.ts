import { createContext } from "react";

// In typescript, if we give the default value of a variable,
// The language can then use this to determine its type.
// Here, we are trying to mimic a useState hook. This empty
// function will only be used if we call the context without
// setting the context.,
const ThemeContext = createContext<[string, (theme: string) => void]>([
  "green",
  () => {},
]);

export default ThemeContext;
