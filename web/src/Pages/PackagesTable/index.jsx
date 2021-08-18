import axios from "axios";
import React, { useMemo, useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

import { showError } from "../../Config/global";
import baseUrl from "../../Config/baseUrl";

import "./styles.scss";

function PackagesTable() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/package`)
      .then((response) => setPackages(response.data))
      .catch((error) => {
        console.error(error.response.data)
        showError('Não foi possível carregar os pacotes')
      })
  }, [packages])

  createTheme("packages", {
    text: {
      primary: "#3d3d3d",
      secondary: "#2aa198",
    },
    background: {
      default: "transparent",
    },
    context: {
      background: "transparent",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });

  const columns = useMemo(
    () => [
      {
        name: "Nome",
        selector: "name",
        sortable: true,
      },
      {
        name: "Destinatário",
        selector: "receiverName",
        sortable: true,
      },
      {
        name: "CEP Destino",
        selector: "receiverCEP",
        sortable: true,
      },
      {
        name: "Em transporte?",
        selector: "isTravelling",
        sortable: true,
        cell: (rowData) => <span>{rowData.isTravelling ? 'Sim' : 'Não'}</span>
      },
      {
        name: "Transportador",
        selector: "transportadorName",
        sortable: true,
      },
    ],
    []
  );

  return (
    <div id="PackagesTablePage">
      <DataTable
        title="Pacotes em transporte"
        columns={columns}
        theme="packages"
        noDataComponent="Não há transportes em andamento"
        data={packages}
      />
    </div>
  );
}

export default PackagesTable;
