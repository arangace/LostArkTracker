import { useState, useEffect, useContext } from "react";
import styles from "./login.module.css";
import { Button, Box, TextField, Card } from "@mui/material";
import { Formik, Form } from "formik";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../AppContextProvider";

export const Login = (props) => {
  const [userName, setUserName] = useState("");
  const { account, setAccount, url } = useContext(AppContext);
  const [signUp, setsignUp] = useState(false);
  const [signUpDetails, setSignUpDetails] = useState();
  const handleLogin = async () => {
    try {
      setUserName(userName.toLowerCase());
      console.log(userName);

      // const response = await fetch(`${url}/api/getAccount/${userName}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "Basic ",
      //   },
      // });

      const response = await fetch(
        `https://la-tracker-backend-v3.vercel.app/api/account/`,
        {
          method: "GET",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }
      );
      const data = await response.json();
      // localStorage.setItem("currentAccount", data.id);
      // setAccount(localStorage.getItem("currentAccount"));
      console.log(data);
      // console.log(`Welcome ${data.name} ID: ${data.id}`);
    } catch (e) {
      alert(`User ${userName} not found`);
      console.log(e);
    }
  };
  const handleUserName = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  };
  const handleSignUpName = (e) => {
    e.preventDefault();
    setSignUpDetails(e.target.value);
  };
  const handleSignUp = async () => {
    console.log(signUpDetails);
    let newAccount = { name: signUpDetails.toLowerCase() };
    try {
      await fetch(`${url}/ark/Addaccount/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccount),
      });
      setsignUp(true);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setsignUp(false);
  }, []);

  return (
    <div className={`page ${styles.page}`}>
      <div>
        <Box>
          <Card sx={{ width: "100%", padding: "5%" }}>
            <h2>Login</h2>
            <div className={styles["login-form"]}>
              <Formik initialValues={{}} onSubmit={handleLogin}>
                <Form sx={{ display: "flex", justifyContent: "space-between" }}>
                  <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    onChange={handleUserName}
                  />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button variant="contained" type="submit">
                      Login
                    </Button>
                  </Box>
                </Form>
              </Formik>
              <h2>Or..</h2>
              <h2>Sign Up</h2>
              <Formik onSubmit={handleSignUp}>
                <Form>
                  <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    onChange={handleSignUpName}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </Button>
                </Form>
              </Formik>
              {account && <Navigate to="/tracker" />}
              {signUp && <Navigate to="/" />}
            </div>
          </Card>
        </Box>
      </div>
    </div>
  );
};
