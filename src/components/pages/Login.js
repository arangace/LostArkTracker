import { useState, useEffect, useContext } from "react";
import styles from "./login.module.css";
import { Button, Box, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../AppContextProvider";

export const Login = (props) => {
  const [userName, setUserName] = useState("");
  const { account, setAccount } = useContext(AppContext)

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://122.57.82.179:8080/ark/Getaccount/${userName}`);
      const data = await response.json();
      localStorage.setItem('currentAccount', data.id)
      setAccount(localStorage.getItem('currentAccount'))
      console.log(`Welcome ${data.name} ID: ${data.id}`)
    }
    catch (e) {
      alert(`User${userName} not found`)
      console.log(e)
    }

  };
  const handleUserName = (e) => {
    e.preventDefault()
    setUserName(e.target.value)

  }
  return (
    <div className={styles.page}>
      <div>
        <h1>Login</h1>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
        >
          <div className={styles["login-form"]}>
            <Formik
              initialValues={
                {
                }}
              onSubmit={handleSubmit}
            >
              <Form>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  onChange={handleUserName}
                />
                <Button variant="contained" type="submit">Login</Button>
                {(account) && <Navigate to="/" />}
              </Form>
            </Formik>

          </div>
        </Box>
      </div>
    </div>
  );
};
