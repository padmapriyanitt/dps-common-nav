// import React from "react";
// import ReactDOM from "react-dom";

// const Index = () => {
//   return <div>Hello React!</div>;
// };

// ReactDOM.render(<Index />, document.getElementById("index"));

import { h } from "preact";
import habitat from "preact-habitat";

import Widget from "./components/nav-container";

export function init(options) {
  let _habitat = habitat(Widget);
  _habitat.render({
    selector: `[id=${options.id}]`,
    clean: true
  });
}

// let _habitat = habitat(Widget);
// _habitat.render({
//   selector: `#index`,
//   clean: true
// });
//DPSNavigation.init({id:"index"})
