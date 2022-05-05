import { useState, useEffect, useContext } from "react";
import styles from "./login.module.css";
import { Button, Box, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../AppContextProvider";

export const Login = (props) => {
  const [userName, setUserName] = useState("");
  const { account, setAccount, url } = useContext(AppContext)
  const [signUp, setsignUp] = useState(false)
  const [signUpDetails, setSignUpDetails] = useState()
  const handleSubmit = async () => {
    try {
      console.log(userName)

      const response = await fetch(`${url}/ark/Getaccount/${userName}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '
          }
        })

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
  const handleSignUpName = (e) => {
    e.preventDefault()
    setSignUpDetails(e.target.value)
  }
  const handleSignUp = async () => {
    console.log(signUpDetails)
    let newAccount = { name: signUpDetails }
    try {
      await fetch(`${url}/ark/Addaccount/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newAccount)
        });
      setsignUp(true)
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    setsignUp(false)
  }, [])

  return (
    <div className={styles.page}>
      <div>
        <h2>Login</h2>
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
              <Form sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  onChange={handleUserName}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button variant="contained" type="submit">Login</Button>
                </Box>
              </Form>
            </Formik>
            <h2>Or..</h2>
            <h2>Sign Up</h2>
            <Formik
              onSubmit={handleSignUp}
            >
              <Form>


                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  onChange={handleSignUpName}
                />
                <Button variant="contained" color="secondary" onClick={handleSignUp}>Sign Up</Button>
              </Form>
            </Formik>
            {((account) && <Navigate to="/tracker" />)}
            {signUp && <Navigate to='/' />}
          </div>
        </Box>
      </div>
    </div>
  );
};
