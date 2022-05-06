import { Field, Form, Formik } from "formik";
import { Modal, Box, Typography, Button, TextField, Slider } from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../../../AppContextProvider";
import { ClearCount } from "./ClearCount";
import DeleteModal from "./DeleteModal";
const ModalForm = (props) => {
  const { setModal, modal, completedTasksSubmit, setcompletedTasksSubmit, account } = useContext(AppContext)
  const [itemLevel, setitemLevel] = useState()
  const [deleteModal, setdeleteModal] = useState(false);
  const [CDRB, setCDRB] = useState(0)
  const [GRRB, setGRRB] = useState(0)
  const [UnaRB, setUnaRB] = useState(0)
  const backdropStyles = {
    position: 'absolute',
    width: "50%",
    height: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const modalStyles = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  }

  const deleteButtonStyles = {
    backgroundColor: "crimson",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

  const handleUpdate = async (values) => {
    try {
      console.log(values)
      const newTaskSubmit = {
        itemLevel: itemLevel ? itemLevel : props.character.itemLevel,
        characterName: props.character.name,
        charId: props.character.id,
        chaosRestBonus: CDRB,
        guardianRestBonus: GRRB,
        unaRestBonus: UnaRB,
        ...values
      }
      console.log(`Submitting character: ${values} CD: ${CDRB} GR: ${GRRB} UNA: ${UnaRB}`)
      //check if there is a duplicate update, then replace the old update with the new one
      const duplicate = completedTasksSubmit.filter((form) => (
        form.charId !== newTaskSubmit.charId
      ))
      const newCompletedTasksSubmit = [...duplicate, newTaskSubmit]
      setcompletedTasksSubmit(newCompletedTasksSubmit)
      handleModal()
    }
    catch (e) {
      console.log(e)
    }

  }
  function handleModal() {
    setModal(false)
  }
  const handleItemLevel = (e) => {
    setitemLevel(e.target.value)
    console.log(itemLevel)
  }
  const handleDeleteModal = () => {
    setdeleteModal(!deleteModal)
    console.log(deleteModal)
  }
  return (
    <div>

      <Modal
        sx={modalStyles}
        open={modal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={backdropStyles}>
          <DeleteModal character={props.character} modal={deleteModal} handleModal={handleModal} handleDeleteModal={handleDeleteModal} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Typography id="modal-modal-title" variant="h3" component="h3">
              {props.character.name}
            </Typography>
            <Formik
              initialValues={
                {
                  chaosDungeonClearCount: (props.character.chaosDungeonClearCount ? props.character.chaosDungeonClearCount : 0),
                  guardianRaidClearCount: (props.character.guardianRaidClearCount ? props.character.guardianRaidClearCount : 0),
                  unaTaskClearCount: (props.character.unaTaskClearCount ? props.character.unaTaskClearCount : 0),
                }}
              onSubmit={handleUpdate}
            >
              <Form>
                <div role="group" aria-labelledby="checkbox-group">
                  <Typography id="todays-clears" variant="h5" component="h5" gutterBottom>
                    Update Item Level:
                  </Typography>
                  <TextField onChange={handleItemLevel} value={itemLevel} id="outlined-basic" label="Item Level" variant="outlined" />

                  <Typography id="todays-clears" variant="h5" component="h5">
                    Todays Clears:
                  </Typography>
                  <ClearCount />
                  <Typography id="rest-bonus" variant="h5" component="h5">
                    Manually Change Rest Bonus:
                  </Typography>
                  <Typography id="item-level" variant="h6" component="h5" gutterBottom>
                    Chaos Dungeon rest bonus:
                  </Typography>
                  <Slider
                    aria-label="chaosRestBonus"
                    defaultValue={0}
                    getAriaValueText={(value) => setCDRB(value)}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={0}
                    max={100}
                  />
                  <Typography id="item-level" variant="h6" component="h5" gutterBottom>
                    Guardian raid rest bonus:
                  </Typography>
                  <Slider
                    aria-label="guardianRestBonus"
                    defaultValue={0}
                    getAriaValueText={(value) => setGRRB(value)}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={0}
                    max={100}
                  />
                  <Typography id="item-level" variant="h6" component="h5" gutterBottom>
                    Una's tasks rest bonus:
                  </Typography>
                  <Slider
                    aria-label="unaRestBonus"
                    defaultValue={0}
                    getAriaValueText={(value) => setUnaRB(value)}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={0}
                    max={100}
                  />
                </div>
                <Box sx={{ display: "flex" }}>
                  <Button variant="contained" type="submit">Update Character</Button>
                  <Button sx={deleteButtonStyles} onClick={handleDeleteModal} variant="contained" >Delete</Button>
                </Box>
              </Form>
            </Formik>
          </Typography>

        </Box>
      </Modal>

    </div>
  );
};

export default ModalForm;
