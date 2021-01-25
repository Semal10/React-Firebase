import React, { useState, useEffect } from "react";
import Form from "./Form";
import Dashboard from "./Dashboard";
import fire from "./fire";
import "./App.css";

const App = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [flag, setFlag] = useState(false);

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(()=>{
        const ref = fire.database().ref("info");
        ref.on("value", (snapshot) => {
        const users = snapshot.val();
        for (let id in users) {
          if (
            users[id].email.email === email &&
            users[id].password.password === password
          ) {
            setDate(users[id].date.date);
            setCountry(users[id].country.country);
          }
      }
    });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
    
    setFlag(true);
    let obj = {
          email,
          password,
          date,
          country,
        };
        localStorage.setItem("user", obj);
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(()=>{
        const ref = fire.database().ref("info");
        let info = {
          email: { email },
          password: { password },
          date: { date },
          country: { country },
    };
    ref.push(info);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
    
    setFlag(true);
  };

  const handleLogout = () => {
    fire.auth().signOut();
    clearInputs();
    setFlag(false);
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setDate("");
    setCountry("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  useEffect(() => {
    setFlag(false);
    authListener();
  }, []);

  return (
    <div className="App">
      {(user && flag) ? (
        <Dashboard
          handleLogout={handleLogout}
          email={email}
          password={password}
          date={date}
          country={country}
          setEmail={setEmail}
          setPassword={setPassword}
          setDate={setDate}
          setCountry={setCountry}
        />
      ) : (
        <Form
          user={user}
          setUser={setUser}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          emailError={emailError}
          setEmailError={setEmailError}
          passwordError={passwordError}
          setPasswordError={setPasswordError}
          isUser={isUser}
          setIsUser={setIsUser}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          date={date}
          setDate={setDate}
          country={country}
          setCountry={setCountry}
          clearInputs={clearInputs}
          clearErrors={clearErrors}
        />
      )}
    </div>
  );
};

export default App;
