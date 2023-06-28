import { useState } from "react";
import Modal from "./Modal";

function AddMemberBoard({ handleAddMember }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const addMember = () => {
    handleAddMember();
  };
}
