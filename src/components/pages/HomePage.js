import { useState, useEffect, useContext } from "react";
import styles from "./homePage.module.css";
import { AppContext } from "../../AppContextProvider";
export const HomePage = () => {
  const { completedTasksSubmit } = useContext(AppContext);
  // useEffect(() => {


  //   return () => {
  //     console.log("Updated");
  //   }
  // }, [completedTasksSubmit])


  return (
    <div className={styles.page}>
      <h1>HomePage</h1>

    </div>
  );
};
