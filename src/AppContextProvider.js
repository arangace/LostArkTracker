import React, { useEffect, useState } from "react";

const AppContext = React.createContext();

function AppContextProvider({ children }) {
    const dummyData = [{
        id: 0,
        name: "CoronaYoshi",
        ILevel: 1400.69,
        RestBonus: 3
    }, {
        id: 1,
        name: "YoshiFist",
        ILevel: 1430.69,
        RestBonus: 1
    }]
    const [Characters, setCharacters] = useState(dummyData);
    // Dummy data

    // async function reload() {
    //     if (buttonPressed === false) {
    //     }
    //     else {
    //         await axios.put(
    //             "http://localhost:3000/api/button/setState"
    //         );
    //         await axios.get(
    //             "http://localhost:3000/api/button/state"
    //         );
    //     }

    // };
    // async function setButtonState() {
    //     await axios.put(
    //         "http://localhost:3000/api/button/setState"
    //     );
    //     const response = await axios.get(
    //         "http://localhost:3000/api/button/state"
    //     );
    //     setButtonPressed(response.data);
    // }

    async function getData() {
        const response = await fetch(
            `https://122.57.82.179:8080/ark/Getcharacters`
        );
        const data = response.json();
        console.log(data);
    }
    useEffect(() => {
        getData();

    }, []);
    // The context value that will be supplied to any descendants of this component.
    const context = {
        Characters,
        setCharacters,
    };

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}

export { AppContext, AppContextProvider };
