import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import Map from "./Components/Map";

import baseUrl from "../../Config/baseUrl";
import { showError } from "../../Config/global";

import "./styles.scss";

function ViewPackage({ match }) {
  const history = useHistory();

  const [codigoRastreio, setCodigoRastreio] = useState("");
  const [endereco, setEndereco] = useState({});
  const [transportadorLocation, setTransportadorLocation] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const codigoRastreio = match.params.code;
        setCodigoRastreio(codigoRastreio);

        const transportadorLocation = await getTransportadorLocation(
          codigoRastreio
        );

        await getEndereco(transportadorLocation);
      } catch (err) {
        history.push("/");
      }
    })();
  }, [match.params.code, history]);

  async function getEndereco(location) {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`
      );
      setEndereco(response.data);
    } catch (err) {
      throw showError(err, "Informações de endereço não encontradas.");
    }
  }

  async function getTransportadorLocation(code) {
    try {
      const response = await axios.get(
        `${baseUrl}/package/getLocation/${code}`
      );
      const location = response.data.location;

      const transportadorLocation = {
        latitude: Number(location.latitude),
        longitude: Number(location.longitude),
      };

      setTransportadorLocation(transportadorLocation);

      return transportadorLocation;
    } catch (err) {
      throw showError(err, "Localização do transportador não encontrada.");
    }
  }

  return (
    <div id="viewPackagePage">
      <Map
        latitude={transportadorLocation.latitude || 0}
        longitude={transportadorLocation.longitude || 0}
      />
      <section id="information">
        <div className="title">
          <h2>Localização da Carga</h2>
        </div>
        <div className="dados">
          <h3>
            Código de rastreio inserido: <span>{codigoRastreio}</span>
          </h3>
          <p className="location">
            <strong>Logradouro:</strong> {endereco.address?.road || "-"}
            <br />
            <strong>Cidade:</strong> {endereco.address?.city || "-"}
            <br />
            <strong>CEP:</strong> {endereco.address?.postcode || "-"}
            <br />
            <strong>Endereço Completo:</strong> {endereco.display_name || "-"}
            <br />
          </p>
        </div>
      </section>
    </div>
  );
}

export default ViewPackage;
