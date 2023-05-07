import { useContext } from "react";
import styles from "./homePage.module.css";
import { AppContext } from "../../../AppContextProvider";
import { Card, CardContent, Typography, Link } from "@mui/material";
export const HomePage = () => {
  const { url } = useContext(AppContext);
  return (
    <div className={"page"}>
      <div className={styles.content}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom>
              Welcome To LATracker
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Getting Started
            </Typography>
            <Typography variant="body2">
              Get started by clicking
              <Link href={`${url}/ark/Getcommands`} underline="none">
                {" here "}
              </Link>
              and click agree. Then click
              <Link href="/login" underline="none">
                {" login "}
              </Link>
              using your pre-existing details or sign up!<br></br>
              Then view your characters on the Tracker tab and add characters
              with the Add Character tab<br></br>
              <Typography variant="h6" component="h1" gutterBottom>
                NOTE: DO NOT REFRESH ANY PAGE OTHER THAN THE HOME PAGE. Netlify
                is bugging out with react router, working on a fix
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
