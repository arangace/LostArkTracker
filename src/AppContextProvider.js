import React, { useEffect, useState } from "react";
const AppContext = React.createContext();

function AppContextProvider({ children }) {
  const baseTasks = [
    {
      taskName: "Chaos Dungeons",
      label: "chaosDungeonClearCount",
      cleared: "uncleared",
      restBonus: 0,
      totalClears: 2,
    },
    {
      taskName: "Guardian Raids",
      label: "guardianRaidClearCount",
      cleared: "uncleared",
      restBonus: 0,
      totalClears: 2,
    },
    {
      taskName: "Una Tasks",
      label: "unaTaskClearCount",
      cleared: "uncleared",
      restBonus: 0,
      totalClears: 3,
    },
  ];

  const [account, setAccount] = useState();
  const [characterTasks, setCharacterTasks] = useState(baseTasks);
  const [modal, setModal] = useState(false);
  const [completedTasksSubmit, setcompletedTasksSubmit] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCharacter, setcurrentCharacter] = useState({});
  const [characters, setCharacters] = useState([]);
  const [version, setversion] = useState(0);
  const url = "https://122.57.82.16:8080";

  const sendUpdate = (updatePayload) => {
    const sendData = async (character) => {
      try {
        await fetch(`${url}/ark/Updatecharacters/${character.charId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(character),
        });
      } catch (e) {
        throw new Error("Couldn't update character error: " + e);
      }
    };
    updatePayload.forEach((character) => {
      sendData(character);
    });
    setcompletedTasksSubmit([]);
    setTimeout(() => {
      setversion(version + 1);
    }, 500);
  };
  useEffect(() => {
    localStorage.getItem("currentAccount")
      ? setAccount(localStorage.getItem("currentAccount"))
      : setAccount(0);
    setversion(version + 1);
  }, []);

  const context = {
    url,
    completedTasksSubmit,
    setcompletedTasksSubmit,
    modal,
    setModal,
    account,
    setAccount,
    characterTasks,
    setCharacterTasks,
    isLoading,
    setIsLoading,
    currentCharacter,
    setcurrentCharacter,
    characters,
    setCharacters,
    sendUpdate,
    version,
    setversion,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider };
