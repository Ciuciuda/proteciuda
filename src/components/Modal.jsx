import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Modal.css";

const Modal = (props) => {
  return (
    <AnimatePresence>
      {props.visible && (
        <motion.div
          className="background-blur"
          initial={{
            backdropFilter: "blur(0px) brightness(1)",
          }}
          animate={{
            backdropFilter: "blur(17px) brightness(.7)",
          }}
          exit={{
            backdropFilter: "blur(0px) brightness(1)",
          }}
        >
          <motion.div
            className="modal__wrapper"
            initial={{
              scale: .95,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            exit={{
              scale: .95,
              opacity: 0
            }}
          >
            {props.children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
