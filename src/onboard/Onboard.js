import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogin, getRegister, getHome } from "../redux/actioncreator";
import axios from "axios";
import Home from "./Home";
import "./home.css";

const { useState, useEffect } = require("react");

const Onboard = () => {
  const [val, setval] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loginsubmit, setloginsubmit] = useState(false);
  const [regsubmit, setregsubmit] = useState(false);
  const [data, setdata] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const login = useSelector((state) => state.login);
  const home = useSelector((state) => state.home);

  const dispatch = useDispatch();

  const handleregsubmit = (e) => {
    e.preventDefault();
    setregsubmit(true);
  };

  const handleloginsubmit = (e) => {
    e.preventDefault();
    setloginsubmit(true);
  };

  useEffect(() => {
    if (loginsubmit) {
      console.log("Hello");
      setloading(true);
      axios
        .post("https://theme-switcher-sud.herokuapp.com/api/auth/signin", {
          username: val.username,
          password: val.password
        })
        .then((response) => {
          console.log(response);
          response && response.data && setdata(response.data);
          setloading(false);
          dispatch(getHome());
        })
        .catch((err) => {
          console.log(err);

          setloading(false);
          seterror(
            "Wrong username/password. Please check username/password and retry"
          );
          dispatch(getLogin());
        });
    } else if (regsubmit) {
      console.log("Hii");
      setloading(true);
      axios
        .post("https://theme-switcher-sud.herokuapp.com/api/auth/signup", {
          username: val.username,
          email: val.email,
          password: val.password
        })
        .then((response) => {
          console.log(response);
          setloading(false);
          dispatch(getLogin());
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
          seterror(err.message);
          dispatch(getRegister());
        });
    }
  }, [loginsubmit, regsubmit]);

  return (
    <>
      {loading ? "Loading..." : ""}
      {error ? error : ""}
      {home ? (
        <>
          <Home data={data} />
        </>
      ) : !login ? (
        <div className="containerreg">
          <header className="hd1">
            <button className="ttl">Theme Changer App</button>
          </header>
          <div id="regContainer">
            <form onSubmit={(e) => handleregsubmit(e)} id="regform">
              <div className="lbl">
                <label>Username</label>
              </div>
              <div>
                <input
                  type="text"
                  value={val.username}
                  onChange={(e) => {
                    e.preventDefault();
                    setval({ ...val, username: e.target.value });
                  }}
                />
              </div>
              <div className="lbl">
                <label>Email</label>
              </div>
              <div>
                <input
                  type="text"
                  value={val.email}
                  onChange={(e) => {
                    e.preventDefault();
                    setval({ ...val, email: e.target.value });
                  }}
                />
              </div>
              <div className="lbl">
                <label>Password</label>
              </div>
              <div>
                <input
                  type="text"
                  value={val.password}
                  onChange={(e) => {
                    e.preventDefault();
                    setval({ ...val, password: e.target.value });
                  }}
                />
              </div>
              <button type="submit" id="regbtn">
                Register
              </button>
            </form>
            <div id="altlog">
              Already have an account?
              <button id="logpg" onClick={() => dispatch(getLogin())}>
                Login
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="containerlog">
            <header className="hd1">
              <button className="ttl">Theme Changer App</button>
            </header>
            <div id="logincontainer">
              <form onSubmit={(e) => handleloginsubmit(e)} id="logform">
                <div className="lbl">
                  <label>Username</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={val.username}
                    onChange={(e) => {
                      e.preventDefault();
                      setval({ ...val, username: e.target.value });
                    }}
                  />
                </div>
                <div className="lbl">
                  <label>Password</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={val.password}
                    onChange={(e) => {
                      e.preventDefault();
                      setval({ ...val, password: e.target.value });
                    }}
                  />
                </div>
                <button id="logme" type="submit">
                  Login
                </button>
              </form>
              <div id="regsw">
                <span>Don't have an account? </span>
                <button id="regp" onClick={() => dispatch(getRegister())}>
                  Create New Account
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Onboard;
