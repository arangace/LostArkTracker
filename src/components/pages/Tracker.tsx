import { useState, useEffect } from "react";
import styles from "./tracker.module.css";
export const TrackerPage = (props: any) => {
  function handleCharacterClick(name: string) {
    console.log(name);
  }
  return (
    <div className={styles.page}>
      <div>
        <h1>Character Selection</h1>
        <ul>
          {props.Characters.map((character: any) => (
            <li onClick={() => handleCharacterClick(character.name)}>
              {character.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
