import { Form, Formik } from "formik";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Slider,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../../AppContextProvider";
import { ClearCount } from "./ClearCount";
import { deleteButtonStyles, backdropStyles, modalStyles } from "./ModalStyles";
import DeleteModal from "./DeleteModal";

const ModalForm = (props) => {
  const { setModal, modal, completedTasksSubmit, setcompletedTasksSubmit } =
    useContext(AppContext);
  const [itemLevel, setitemLevel] = useState();
  const [deleteModal, setdeleteModal] = useState(false);
  const [CDRB, setCDRB] = useState(0);
  const [GRRB, setGRRB] = useState(0);
  const [UnaRB, setUnaRB] = useState(0);

  const handleUpdate = async (values) => {
    try {
      const newTaskSubmit = {
        itemLevel: itemLevel ? itemLevel : props.character.itemLevel,
        characterName: props.character.name,
        charId: props.character.id,
        chaosRestBonus: CDRB,
        guardianRestBonus: GRRB,
        unaRestBonus: UnaRB,
        ...values,
      };
      //check if there is a duplicate update, then replace the old update with the new one
      const duplicate = completedTasksSubmit.filter(
        (form) => form.charId !== newTaskSubmit.charId
      );
      const newCompletedTasksSubmit = [...duplicate, newTaskSubmit];
      setcompletedTasksSubmit(newCompletedTasksSubmit);
      setitemLevel();
      handleModal();
    } catch (err) {
      throw new Error("Error has occured: " + err);
    }
  };
  function handleModal() {
    setModal(false);
  }
  const handleItemLevel = (e) => {
    setitemLevel(e.target.value);
  };
  const handleDeleteModal = () => {
    setdeleteModal(!deleteModal);
  };
  return (
    <Modal
      sx={modalStyles}
      open={modal}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={backdropStyles}>
        <DeleteModal
          character={props.character}
          modal={deleteModal}
          handleModal={handleModal}
          handleDeleteModal={handleDeleteModal}
        />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Typography id="modal-modal-title" variant="h3" component="h3">
            {props.character.name}
          </Typography>
          <Formik
            initialValues={{
              chaosDungeonClearCount: props.character.chaosDungeonClearCount
                ? props.character.chaosDungeonClearCount
                : 0,
              guardianRaidClearCount: props.character.guardianRaidClearCount
                ? props.character.guardianRaidClearCount
                : 0,
              unaTaskClearCount: props.character.unaTaskClearCount
                ? props.character.unaTaskClearCount
                : 0,
            }}
            onSubmit={handleUpdate}
          >
            <Form>
              <div role="group" aria-labelledby="checkbox-group">
                <Typography
                  id="todays-clears"
                  variant="h5"
                  component="h5"
                  gutterBottom
                >
                  Update Item Level:
                </Typography>
                <TextField
                  onChange={handleItemLevel}
                  value={itemLevel}
                  id="outlined-basic"
                  label="Item Level"
                  variant="outlined"
                />

                <Typography id="todays-clears" variant="h5" component="h5">
                  Todays Clears:
                </Typography>
                <ClearCount />
                <Typography id="rest-bonus" variant="h5" component="h5">
                  Manually Change Rest Bonus:
                </Typography>
                <Typography
                  id="item-level"
                  variant="h6"
                  component="h5"
                  gutterBottom
                >
                  Chaos Dungeon rest bonus:
                </Typography>
                <Slider
                  aria-label="chaosRestBonus"
                  defaultValue={props.character.chaosRB}
                  getAriaValueText={(value) => setCDRB(value)}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={0}
                  max={100}
                />
                <Typography
                  id="item-level"
                  variant="h6"
                  component="h5"
                  gutterBottom
                >
                  Guardian raid rest bonus:
                </Typography>
                <Slider
                  aria-label="guardianRestBonus"
                  defaultValue={props.character.guardianRaidRB}
                  getAriaValueText={(value) => setGRRB(value)}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={0}
                  max={100}
                />
                <Typography
                  id="item-level"
                  variant="h6"
                  component="h5"
                  gutterBottom
                >
                  Una's tasks rest bonus:
                </Typography>
                <Slider
                  aria-label="unaRestBonus"
                  defaultValue={props.character.unaRB}
                  getAriaValueText={(value) => setUnaRB(value)}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={0}
                  max={100}
                />
              </div>
              <Box sx={{ display: "flex" }}>
                <Button variant="contained" type="submit">
                  Update Character
                </Button>
                <Button
                  sx={deleteButtonStyles}
                  onClick={handleDeleteModal}
                  variant="contained"
                >
                  Delete
                </Button>
              </Box>
            </Form>
          </Formik>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalForm;
