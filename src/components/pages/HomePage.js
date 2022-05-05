import { useState, useEffect, useContext } from "react";
import styles from "./homePage.module.css";
import { AppContext } from "../../AppContextProvider";
import { Card, CardContent, Typography, Link } from "@mui/material";
export const HomePage = () => {
  const { completedTasksSubmit, url } = useContext(AppContext);
  // useEffect(() => {


  //   return () => {
  //     console.log("Updated");
  //   }
  // }, [completedTasksSubmit])


  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom>Welcome To LATracker</Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Getting Started
            </Typography>
            <Typography variant="body2">
              Get started by clicking
              <Link href={`${url}/ark/Getcommands`} underline="none">
                {' here'}</Link>
              and click agree. Then click
              <Link href="/login" underline="none">
                {' login '}</Link>
              using your pre-existing details or sign up!<br></br>
              Then view your characters on the Tracker tab and add characters with the Add Character tab
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div >
  );
};
