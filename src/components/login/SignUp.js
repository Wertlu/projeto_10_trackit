import { Container, Button } from "../../components/login/Style.js";
import logo from "../../components/login/Login.js";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
export default function SignUpPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });

  function handleInputChange(e) {
    formData[e.target.name] = e.target.value;
    setFormData({ ...formData });
  }
  function signUp(formData){
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", formData)
    return promise
   }
  function handleSingUp(e) {
    e.preventDefault();
    setLoading(true);
    const promise = signUp(formData);
    promise.then(() => {
      setLoading(false);
      navigate("/");
    });
    promise.catch((error) => {
      alert(error.response.data.message);
      setLoading(false);
    });
  }

  return (
    <Container>
      <img src={logo} alt="TrackIt" />
      <form onSubmit={handleSingUp}>
        <input
          value={formData.email}
          type="email"
          placeholder="email"
          name="email"
          onChange={handleInputChange}
          disabled={loading}
        />
        <input
          value={formData.password}
          type="password"
          placeholder="senha"
          name="password"
          onChange={handleInputChange}
          disabled={loading}
        />
        <input
          value={formData.name}
          type="text"
          placeholder="nome"
          name="name"
          onChange={handleInputChange}
          disabled={loading}
        />
        <input
          value={formData.image}
          type="text"
          placeholder="foto"
          name="image"
          onChange={handleInputChange}
          disabled={loading}
        />
        <Button disabled={loading}>
          {loading ? (
            <Loader
              type="ThreeDots"
              color="#FFFFFF"
              height={13}
              width={51}
              timeout={3000}
            />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
      <Link to="/">J?? tem uma conta? Fa??a login!</Link>
    </Container>
  );
}