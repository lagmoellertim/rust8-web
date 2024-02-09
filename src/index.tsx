import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import init from "wasm-rust8/rust8_wasm";

console.log(`
██████╗ ██╗   ██╗███████╗████████╗ █████╗ 
██╔══██╗██║   ██║██╔════╝╚══██╔══╝██╔══██╗
██████╔╝██║   ██║███████╗   ██║   ╚█████╔╝
██╔══██╗██║   ██║╚════██║   ██║   ██╔══██╗
██║  ██║╚██████╔╝███████║   ██║   ╚█████╔╝
╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝    ╚════╝ 
                                          
      Made with ❤️ by @lagmoellertim
`);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

init().then(() =>
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
);
