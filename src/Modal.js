import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  // useRef means that an object is passed by reference across
  // all renders. This means that each time you invoke this
  // argument you are refering to the exact same object, not just
  // an equivalent one (===)
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    // This function is invoked every time this Modal goes away.
    // Used for cleanup. Every function that you return from
    // your effect should be involved in its
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
