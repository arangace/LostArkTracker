import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import { AppContext } from "../AppContextProvider";
export const Navbar = () => {
  const { account, setAccount } = useContext(AppContext);

  const handleLogout = () => {
    setAccount();
    localStorage.clear();
  };

  return (
    <div className={styles.navBar}>
      <h1 className={styles.title}>
        <Link to="/">LATracker</Link>
      </h1>
      <ul className={styles["sub-nav"]}>
        <h2>
          {account ? (
            <Link onClick={handleLogout} to="/">
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </h2>
        <h2>
          <Link to="/tracker">Tracker</Link>
        </h2>
        <h2>
          <Link to="/new">Add Character</Link>
        </h2>
      </ul>
    </div>
  );
};
