import React, { useContext } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { AppContext } from "../../AppContextProvider";
import { backdropStyles, modalStyles } from "./ModalStyles";

const DeleteModal = (props) => {
  const { setversion, version, url } = useContext(AppContext);

  const deleteCharacter = async () => {
    try {
      await fetch(`${url}/ark/Deletecharacters/${props.character.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      throw new Error("Could not delete character " + err);
    }
    setversion(version + 1);
    props.handleDeleteModal(false);
    props.handleModal();
  };
  const handleButton = (value) => {
    value ? deleteCharacter() : props.handleDeleteModal(!value);
  };

  return (
    <Modal
      sx={modalStyles}
      open={props.modal}
      onClose={props.handleDeleteModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={backdropStyles}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Delete {props.character.name}?
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={() => handleButton(true)}
            variant="contained"
            type="submit"
          >
            Yes
          </Button>
          <Button
            onClick={() => handleButton(false)}
            variant="contained"
            type="submit"
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
