import React from "react";
import { Row, Col, Nav, Tab, Tabs } from "react-bootstrap";

import CreatePackage from "../CreatePackage";
import PackagesTable from "../PackagesTable";

import "./styles.scss";

function Management() {
  return (
    <div id="ManagementPage">
      <h1>Área do Gestor</h1>
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Criar nova carga">
          <CreatePackage />
        </Tab>
        <Tab eventKey="profile" title="Gerenciamento de Transporte">
          <PackagesTable />
        </Tab>
      </Tabs>
      {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3} className="pills-collumn">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Criar nova carga</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">
                  Gerenciamento de transportes
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <CreatePackage />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <PackagesTable />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container> */}
    </div>
  );
}

export default Management;
