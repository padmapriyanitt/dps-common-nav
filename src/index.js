import { h, render } from "preact";
import habitat from "preact-habitat";
import DPSNavWidget from "./components/menu";

export function init(options) {
  render(<DPSNavWidget collapseOnInit={options.collapseOnInit} standalone={options.standalone} 
    onCollapse={options.onCollapse} onExpand={options.onExpand}/>, document.getElementById(options.id));
}