import { FunctionComponent, MutableRefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal: FunctionComponent = ({ children }) => {
  // useRef means that an object is passed by reference across
  // all renders. This means that each time you invoke this
  // argument you are refering to the exact same object, not just
  // an equivalent one (===)

  // Here we are expressing that elRef will always either by a HTMLDivElement
  // or nothing, otherwise we'll get an error.
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    // We can't call appendChild on modalRoot unless we assure TypeScript that
    // it won't be null.
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);

    // This function is invoked every time this Modal goes away.
    // Used for cleanup. Every function that you return from
    // your effect should be involved in its

    // We have to repeat the same null check as we did earlier.
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
