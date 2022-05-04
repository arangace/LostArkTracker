import React, { useState, useContext } from 'react'
import styles from './newCharacter.module.css'
import { ClearCount } from './ModalComponents/ClearCount'
import { Formik, Form } from 'formik'
import { Typography, TextField, Button, Slider, Box, Modal } from '@mui/material'
import { AppContext } from '../../AppContextProvider'
import { LoginPrompt } from './LoginPrompt'
import { Navigate } from "react-router-dom";
const NewCharacter = () => {
    const [CDRB, setCDRB] = useState(0)
    const [GRRB, setGRRB] = useState(0)
    const [UnaRB, setUnaRB] = useState(0)
    const [itemLevel, setitemLevel] = useState()
    const [characterName, setcharacterName] = useState("")
    const [successModal, setsuccessModal] = useState(false)
    const [redirect, setredirect] = useState(false)
    const { account } = useContext(AppContext)

    const modalStyles = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",

    }
    const backdropStyles = {
        position: 'absolute',
        width: "20%",
        height: "20%",
        bgcolor: "#00D100",
        color: "white",
        border: '2px solid #000',
        boxShadow: 24,
        padding: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };
    const chaosDungRB = (value) => {
        setCDRB(value);
    }
    const guardRaidRB = (value) => {
        setGRRB(value);
    }
    const unaRB = (value) => {
        setUnaRB(value);
    }
    const handleItemLevel = (e) => {
        setitemLevel(e.target.value)
        console.log(itemLevel)
    }
    const handleCharacterName = (e) => {
        setcharacterName(e.target.value)
        console.log(characterName)
    }
    const update = async (character) => {
        setsuccessModal(true)

        try {

            await fetch(`https://122.57.82.179:8080/ark/Addcharacters/${account}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(character)
                });
        }
        catch (e) {
            console.log(e)
        }
        setredirect(true)
        setTimeout(() => {
            handlesuccessModal()
            setredirect(false)
        }, 2000);
    }
    const handleAdd = (values) => {

        const characterForm = {
            characterName: characterName,
            itemLevel: itemLevel,
            chaosRestBonus: CDRB,
            guardianRestBonus: GRRB,
            unaRestBonus: UnaRB
        }
        let newCharacter = {
            ...values,
            ...characterForm
        };
        console.log(newCharacter)
        console.log(account)
        update(newCharacter)
    }
    const handlesuccessModal = () => {
        setsuccessModal(false)
    }
    return (
        <>
            <Modal
                sx={modalStyles}
                open={successModal}
                onClose={handlesuccessModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={backdropStyles}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Successfully Added!
                    </Typography>

                </Box>
            </Modal>
            {account ? <div className={styles.page}>
                <Box sx={{ minWidth: 200 }}>

                    <Formik
                        initialValues={
                            {
                                chaosDungeonClearCount: "0",
                                guardianRaidClearCount: "0",
                                unaTaskClearCount: "0",
                            }}
                        onSubmit={handleAdd}
                    >
                        <Form>
                            <div role="group" aria-labelledby="checkbox-group">
                                <Typography id="character-name" variant="h5" component="h5" gutterBottom>
                                    Character Name:
                                </Typography>
                                <TextField autoFocus={true} onChange={handleCharacterName} value={characterName} id="outlined-basic" label="Character Name" variant="outlined" />
                                <Typography id="item-level" variant="h5" component="h5" gutterBottom>
                                    Item Level:
                                </Typography>
                                <TextField onChange={handleItemLevel} value={itemLevel} id="outlined-basic" label="Item Level" variant="outlined" />
                                <Typography id="item-level" variant="h6" component="h6" gutterBottom>
                                    Chaos dungeon rest bonus
                                </Typography>
                                <Slider
                                    aria-label="chaosRestBonus"
                                    defaultValue={0}
                                    getAriaValueText={chaosDungRB}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={0}
                                    max={100}
                                />
                                <Typography id="item-level" variant="h6" component="h5" gutterBottom>
                                    Guardian raid rest bonus
                                </Typography>
                                <Slider
                                    aria-label="guardianRestBonus"
                                    defaultValue={0}
                                    getAriaValueText={guardRaidRB}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={0}
                                    max={100}
                                />
                                <Typography id="item-level" variant="h6" component="h5" gutterBottom>
                                    Una's tasks rest bonus
                                </Typography>
                                <Slider
                                    aria-label="unaRestBonus"
                                    defaultValue={0}
                                    getAriaValueText={unaRB}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={0}
                                    max={100}
                                />
                                <Typography id="todays-clears" variant="h6" component="h5">
                                    Todays Clears:
                                </Typography>
                                <ClearCount />
                            </div>
                            <Button variant="contained" type="submit">Update</Button>
                        </Form>
                    </Formik>
                </Box>
            </div>
                : <LoginPrompt />}
            {((redirect) && <Navigate to="/tracker" />)}
        </>

    )
}

export default NewCharacter