import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";

const root = document.getElementById("root");
const rootCreator = createRoot(root!);

rootCreator.render(
    <StrictMode>
        <App/>
    </StrictMode>
);
