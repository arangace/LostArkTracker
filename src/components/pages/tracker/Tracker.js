import { useState, useEffect, useContext } from "react";
import styles from "./tracker.module.css";
import { AppContext } from "../../../AppContextProvider";
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Card,
  Button,
} from "@mui/material";
import ModalForm from "../../ModalComponents/ModalForm";
import RestBonusBar from "../../RestBonusBar";
import DoneModal from "../../ModalComponents/DoneModal";
import { LoginPrompt } from "../loginprompt/LoginPrompt";
import Loading from "../loading/Loading";

export const TrackerPage = () => {
  const {
    url,
    account,
    setModal,
    currentCharacter,
    setcurrentCharacter,
    isLoading,
    setIsLoading,
    version,
  } = useContext(AppContext);

  const [doneModal, setDoneModal] = useState(false);
  const [characters, setCharacters] = useState([]);

  const doneButtonStyles = {
    right: 0,
    bottom: 0,
  };

  async function handleCharacterClick(selection) {
    setcurrentCharacter(selection);
    setModal(true);
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/ark/Getcharacters/${account}`);
      const data = await response.json();
      setIsLoading(false);
      const characterList = data.map((element) => {
        return {
          id: element.charId,
          name: element.characterName,
          itemLevel: element.itemLevel,
          chaosRB: element.chaosRestBonus,
          guardianRaidRB: element.guardianRestBonus,
          unaRB: element.unaRestBonus,
          guardianRaidCC: element.guardianRaidClearCount,
          chaosDungCC: element.chaosDungeonClearCount,
          unaTaskCC: element.unaTaskClearCount,
        };
      });
      setCharacters(characterList);
    } catch (e) {
      throw new Error("Couldn't get characters see error: " + e);
    }
  };

  const handleDone = () => {
    setDoneModal(true);
  };

  const handleDoneModal = () => {
    setDoneModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();

    // TESTING
    // setCharacters([{
    //   id: 1,
    //   name: "kelvin",
    //   itemLevel: 1306.22,
    //   chaosRB: 30,
    //   guardianRaidRB: 20,
    //   unaRB: 20,
    //   guardianRaidCC: 1,
    //   chaosDungCC: 1,
    //   unaTaskCC: 0,
    // }, {
    //   id: 2,
    //   name: "david",
    //   itemLevel: 1306.22,
    //   chaosRB: 30,
    //   guardianRaidRB: 20,
    //   unaRB: 20,
    //   guardianRaidCC: 1,
    //   chaosDungCC: 1,
    //   unaTaskCC: 0,
    // }]
    // );

    // return () => {
    //   characters.map((element) =>
    //     console.log("character: " + element.id, element.name)
    //   );
    // };
  }, [version]);

  return (
    <div className={`page ${styles.page} `}>
      {account ? (
        <div className={styles.content}>
          <Card sx={{ padding: "1fr", width: "90%" }}>
            <CardContent>
              <div>
                <h4>Tip: </h4>Add new users with the "Add Character" Link, view
                character's on this page.<br></br>Edit characters rest bonuses,
                guardian raid clears etc by clicking on the characters card.
                <br></br>
                Click "Submit Character Changes" to update all changed
                characters
              </div>
              <ModalForm character={currentCharacter} />
              <DoneModal modal={doneModal} handleDoneModal={handleDoneModal} />

              <Box sx={{ width: "100%" }}>
                <Grid container spacing={{ xs: 1, md: 0 }}>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    characters.map((character, key) => (
                      <Grid key={key} item xs={{ width: "30%" }}>
                        <Card
                          sx={{ bgcolor: "#F9FFE3" }}
                          className={styles.card}
                          onClick={() => handleCharacterClick(character)}
                          variant="outlined"
                        >
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                            >
                              {"Character ID: " + character.id}
                            </Typography>
                            <Typography
                              variant="h5"
                              component="div"
                              gutterBottom
                            >
                              {character.name}
                            </Typography>
                            <Typography sx={{ mb: 1 }} color="text.secondary">
                              {"Item Level: " + character.itemLevel}
                            </Typography>
                            <Typography variant="body2">
                              <Box sx={{ flexGrow: 1 }}>
                                <Grid
                                  direction="column"
                                  container
                                  spacing={0.5}
                                >
                                  <Grid item xs={1}>
                                    {"Chaos Dungeon Clears: " +
                                      character.chaosDungCC}
                                  </Grid>
                                  <Grid item xs={1}>
                                    {"Rest Bonus: " + character.chaosRB}
                                    <RestBonusBar value={character.chaosRB} />
                                  </Grid>
                                  <Grid item xs={1}>
                                    {"Guardian Raid Clears: " +
                                      character.guardianRaidCC}
                                  </Grid>
                                  <Grid item xs={1}>
                                    {"Rest Bonus: " + character.guardianRaidRB}
                                    <RestBonusBar
                                      value={character.guardianRaidRB}
                                    />
                                  </Grid>
                                  <Grid item xs={1}>
                                    {"Una's Tasks Clears: " +
                                      character.unaTaskCC}
                                  </Grid>
                                  <Grid item xs={1}>
                                    {"Rest Bonus: " + character.unaRB}
                                    <RestBonusBar value={character.unaRB} />
                                  </Grid>
                                </Grid>
                              </Box>
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  )}
                </Grid>
              </Box>
              <Button
                sx={doneButtonStyles}
                onClick={handleDone}
                size="large"
                color="success"
                variant="contained"
                type="submit"
              >
                Submit Character Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <LoginPrompt />
      )}
    </div>
  );
};
