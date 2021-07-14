import React, { useState } from "react";
import "./styles.scss";

import { Form, Button } from "react-bootstrap";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rastreioCode, setRastreioCode] = useState("");

    function submitLogin(event) {
        event.preventDefault();

        console.log(email, password)
    }

    function submitRastreio(event) {
        event.preventDefault();

        console.log(rastreioCode)
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
