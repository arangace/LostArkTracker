import { useState, useEffect } from "react";
import styles from "./navBar.module.css";
export const Navbar = () => {
  return (
    <div className={styles.navBar}>
      <h1>LATracker</h1>
      <ul className={styles["sub-nav"]}>
        <h1>Login</h1>
        <h1>Login</h1>
        <h1>Login</h1>
      </ul>
    </div>
  );
};
