import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { themes } from "../data/colors.js";

const Home = ({ data }) => {
  const [bg, setbg] = useState("");
  const [color, setcolor] = useState("");

  const handleclick = (e) => {
    setbg(e.target.innerText);
    setcolor(e.target.innerText);
    console.log(data);
  };

  useEffect(() => {
    const headers = {
      "x-access-token": data.accessToken
    };
    if (color) {
      axios
        .post(
          "https://theme-switcher-sud.herokuapp.com/api/theme/updatetheme",
          {
            username: data.username,
            themename: color
          },
          {
            headers: headers
          }
        )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [color]);

  useEffect(() => {
    data && data.theme && setbg(data.theme);
  }, [data]);

  return (
    <>
      <div style={{ backgroundColor: bg, width: "1600px", height: "1600px" }}>
        <div className="navbar">
          <div className="dropdown">
            <button className="dropbtn">
              <span id="thms">Primary Themes</span>
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              {themes.map((item) => {
                return (
                  <a key={item} href="#" onClick={(e) => handleclick(e)}>
                    {item}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
