import React from "react";
import Map from "./Components/Map";

import "./styles.scss";

function ViewPackage() {
  return (
    <div id="viewPackagePage">
        <section id="information">
            <h1>Olá, mundo</h1>
        </section>
        <section>
            <Map/>
        </section>
    </div>
  );
}

export default ViewPackage;
