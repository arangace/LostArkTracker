import React from "react";
import { useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { Modal, Box, Typography, Button } from "@mui/material";
import { backdropStyles, modalStyles } from "./ModalStyles";

const DoneModal = (props) => {
  const { completedTasksSubmit, sendUpdate } = useContext(AppContext);
  const submitForm = () => {
    sendUpdate(completedTasksSubmit);
    props.handleDoneModal();
  };
  return (
    <Modal
      sx={modalStyles}
      open={props.modal}
      onClose={props.handleDoneModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={backdropStyles}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Update Characters
        </Typography>
        <Typography id="modal-modal-title" variant="h5" component="h3">
          Characters Changed:
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {completedTasksSubmit.map((form) => (
            <>
              <text>
                ID {form.charId}: {form.characterName}
              </text>
            </>
          ))}
        </Typography>
        <Button onClick={submitForm} variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default DoneModal;
