import axios from "axios";
import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {useHistory} from 'react-router-dom';

import { showError, showSuccess } from "../../Config/global";
import baseUrl from "../../Config/baseUrl";

import "./styles.scss";

function CreatePackage() {
  const history = useHistory();

  const [partida, setPartida] = useState("");
  const [chegada, setChegada] = useState("");
  const [cep, setCep] = useState("");
  const [name, setName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");

  

  function getCEPinfo(event, type) {
    let cepValue = event.target.value;
    cepValue = cepValue.replace(/[^0-9]/g, "");

    axios
      .get(`http://viacep.com.br/ws/${cepValue}/json/`)
      .then((res) => {
        if (res.data.erro) throw "Endereço não encontrado";
        const endereco = `${res.data.logradouro} - ${res.data.bairro} - ${res.data.localidade}`;
        setChegada(endereco);
      })
      .catch((err) => {
        showError(err, 'Endereço destino não encontrado.');
        setChegada('Endereço não encontrado');
      });
  }

  function setMaskedCEPValue(event) {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, "");

    if (value.length > 8) {
      return;
    } else if (value.length > 5) {
      value = value.replace();
      value = value.replace(/(\d{5})(\d{1,2})/g, "$1-$2");
    }

    setCep(value);
  }

  async function handleCreatePackage(event) {
    event.preventDefault();

    try {
      if (!name || !receiverName || !cep || !number)
        return showError('Preencha todo formulário!');
      if (chegada === 'Endereço não encontrado')
        return showError('O CEP de Destino inserido é inválido!');

      const packageInfo = {
        name,
        receiver: {
          name: receiverName,
          cep,
          number,
        },
        stoppedIn: {
          latitude: -19.9322122,
          longitude: -43.9701964,
        },
      };

      
      const token = localStorage.getItem('___wimpauth');
      const response = await axios({
        method: 'POST',
        url: `${baseUrl}/package/create`,
        data: packageInfo,
        headers: {
          authorization: 'Bearer ' + token,
        }
      });
      setCode(response.data._id);
      showSuccess('Carga criada com sucesso!');
    } catch (err) {
      showError(err, 'Ocorreu um erro ao criar a nova carga.');
    }
  }

  return (
    <div id="createPackagePage">
      <h1>Criação de nova carga</h1>
      <Form onSubmit={handleCreatePackage}>
        <Row>
          <Form.Group className="mb-3" controlId="packageName">
            <Form.Label>Nome da Carga</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insira o nome da carga"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="consumerName">
            <Form.Label>Nome do destinatário</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insira o nome do destinatário"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
            />
          </Form.Group>
        </Row>
        {/* <Row>
          <Col md={8}>
            <Form.Group className="mb-3" controlId="localPartida">
              <Form.Label>CEP de Partida</Form.Label>
              <Form.Control
                type="text"
                placeholder="Local de Partida"
                onBlur={(e) => getCEPinfo(e, "partida")}
              />
              <Form.Text className="text-muted">
                {Boolean(partida) && partida}
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="numeroPartida">
              <Form.Label>Número</Form.Label>
              <Form.Control type="text" placeholder="Nº" />
            </Form.Group>
          </Col>
        </Row> */}
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3" controlId="localDestino">
              <Form.Label>CEP de Destino</Form.Label>
              <Form.Control
                type="text"
                placeholder="Local de Destino"
                onBlur={(e) => getCEPinfo(e, "chegada")}
                value={cep}
                onChange={setMaskedCEPValue}
              />
              <Form.Text className="text-muted">
                {Boolean(chegada) && chegada}
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="numeroDestino">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nº"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form>
      {Boolean(code) && (
        <div id="createdPackageInfo">
          <h4>Código de Rastreio: {code}</h4>
          <QRCode value={code} size={180} />
        </div>
      )}
    </div>
  );
}

export default CreatePackage;
