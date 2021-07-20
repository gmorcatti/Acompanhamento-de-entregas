import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import baseUrl from "../../Config/baseUrl";
import {showError} from '../../Config/global';

import "./styles.scss";

function Home() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rastreioCode, setRastreioCode] = useState("");

  async function submitLogin(event) {
      event.preventDefault();
    try {
      if(!email || !password) return showError('Preencha todos os dados de acesso');
  
      const authInfo = {
        email, 
        password
      };
  
      const response = await axios.post(`${baseUrl}/auth/authenticate`, authInfo);
      
      const token = response.data.token;
      localStorage.setItem('___wimpauth', token);

      history.push(`/createPackage`);
    } catch(err) {
      showError(err, 'Ocorreu um erro inesperado. Tente novamente.');
    }

  }

  async function submitRastreio(event) {
    event.preventDefault();

    try {
      if(!rastreioCode) return showError('Código de rastreio não inserido!');
  
      await axios.get(`${baseUrl}/package/getLocation/${rastreioCode}`);
      
      history.push(`/viewPackage/${rastreioCode}`);
      
    } catch (err) {
      showError(err, 'Pacote não encontrado, confira o código de rastreio.');
    }

  }

  return (
    <div id="homePage">
      <section id="login">
        <div className="centered">
          <h2>É funcionário da transportadora?</h2>
          <h3>Realize seu login aqui!</h3>
          <Form onSubmit={submitLogin}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </section>
      <section id="rastreio">
        <div className="centered">
          <h2>Possui um código de rastreio?</h2>
          <h3>Insira ele abaixo!</h3>
          <Form onSubmit={submitRastreio}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Código de Rastreio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o código de rastreio"
                value={rastreioCode}
                onChange={(e) => setRastreioCode(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Consultar
            </Button>
          </Form>
        </div>
      </section>
    </div>
  );
}

export default Home;
