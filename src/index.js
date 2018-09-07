import { h, render } from "preact";
import habitat from "preact-habitat";
import DPSNavWidget from "./components/menu";

export function init(options) {
  render(<DPSNavWidget collapseOnInit={options.collapseOnInit} standalone={options.standalone}
    urlPrefix={options.urlPrefix}
    onCollapse={options.onCollapse} onExpand={options.onExpand} navigate={options.navigate} />, 
    document.getElementById(options.id));
}