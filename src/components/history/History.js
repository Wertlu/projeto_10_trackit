import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Container } from "./historyStyle";
import React from "react";
export default function HistoryPage() {
  return (
    <>
      <Header />
      <Container>
        <p>Histórico</p>
        Em breve
      </Container>
      <Footer />
    </>
  );
}