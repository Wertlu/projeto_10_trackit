import { Container } from "./footerStyle";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import  UserContext  from "../../contexts/userContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function Footer() {
    const { progress } = useContext(UserContext);
    return (
      <Container>
        <Link to="/habitos">Hábitos</Link>
        <Link to={"/hoje"}>
          <CircularProgressbar
            className="progress-bar"
            value={progress}
            text={"Hoje"}
            background
            backgroundPadding={6}
            styles={buildStyles({
              pathTransitionDuration: 0.5,
              backgroundColor: "#52B6FF",
              textColor: "#ffffff",
              pathColor: "#ffffff",
              trailColor: "transparent",
              strokeLinecap: "round",
            })}
          />
        </Link>
        <Link to="/historico">Histórico</Link>
      </Container>
    );
  }