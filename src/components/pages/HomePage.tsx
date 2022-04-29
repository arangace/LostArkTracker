import { useState, useEffect } from "react";
import styles from "./homePage.module.css";
export const HomePage = () => {
  const [currentData, setCurrentData] = useState({}); // Array instead of object

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

  return (
    <div className={styles.page}>
      <h1>HomePage</h1>
    </div>
  );
};
