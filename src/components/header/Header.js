import { Container } from "./headerStyle";
import React, { useContext } from "react";
import UserContext from "../../contexts/userContext";
export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <Container>
      <h1>TrackIt</h1>
      <img src={user.image} alt="user" />
    </Container>
  );
}