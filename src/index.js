import { h, render } from "preact";
import habitat from "preact-habitat";
import DPSNavWidget from "./components/nav-container";

export function init(options) {
  render(<DPSNavWidget onCollapse={options.onCollapse} onExpand={options.onExpand}/>, document.getElementById(options.id));
}
