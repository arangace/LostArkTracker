import React, { useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { Typography } from "@mui/material";
import ModalItem from "./ModalItem";
export const ClearCount = () => {
  const { characterTasks } = useContext(AppContext);
  return characterTasks.map((task, key) => (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h6">
        {task.taskName}
      </Typography>
      <ModalItem key={key} tasks={task} />
    </>
  ));
};
