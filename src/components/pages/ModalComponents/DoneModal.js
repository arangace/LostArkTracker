import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../../AppContextProvider'
import { Modal, Box, Typography, Button } from '@mui/material'
const DoneModal = (props) => {
    const { completedTasksSubmit, sendUpdate } = useContext(AppContext)
    const modalStyles = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    }
    const backdropStyles = {
        position: 'absolute',
        width: "50%",
        height: "80%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        padding: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };
    const submitForm = () => {
        sendUpdate(completedTasksSubmit)
        props.handleDoneModal()
    }
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
                    Updated Characters
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {completedTasksSubmit.map((form) => (
                        <>
                            <p>{form.charId}{form.characterName}</p>
                        </>
                    ))}
                </Typography>
                <Button onClick={submitForm} variant="contained" type="submit">Submit</Button>
            </Box>
        </Modal>
    )
}

export default DoneModal