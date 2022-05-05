import React, { useEffect, useState } from "react";

const AppContext = React.createContext();

function AppContextProvider({ children }) {
  const baseTasks = [
    { taskName: "Chaos Dungeons", label: "chaosDungeonClearCount", cleared: "uncleared", restBonus: 0, totalClears: 2 },
    { taskName: "Guardian Raids", label: "guardianRaidClearCount", cleared: "uncleared", restBonus: 0, totalClears: 2 },
    { taskName: "Una Tasks", label: "unaTaskClearCount", cleared: "uncleared", restBonus: 0, totalClears: 3 }
  ]

  const [account, setAccount] = useState();
  const [characterTasks, setCharacterTasks] = useState(baseTasks)
  const [modal, setModal] = useState(false)
  const [completedTasksSubmit, setcompletedTasksSubmit] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [currentCharacter, setcurrentCharacter] = useState({})
  const [characters, setCharacters] = useState([]);
  const [version, setversion] = useState(0)
  const url = 'https://122.57.82.16:8080'

  const sendUpdate = (updatePayload) => {
    const sendData = async (character) => {
      console.log(character);
      try {

        await fetch(`${url}/ark/Updatecharacters/${character.charId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(character)
          });
      }
      catch (e) {
        console.log(e)
      }

    }
    updatePayload.forEach((character) => {
      sendData(character)
    })
    setversion(version + 1);
  }
  useEffect(() => {
    localStorage.getItem('currentAccount') ? setAccount(localStorage.getItem('currentAccount')) : setAccount(0)
    setversion(version + 1)
  }, [])

  // The context value that will be supplied to any descendants of this component.
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
    setversion
  };

  // Wraps the given child components in a Provider for the above context.
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider };
