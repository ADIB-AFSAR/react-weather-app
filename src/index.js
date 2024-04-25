import React from "react";
import { createRoot } from 'react-dom/client';

import App from "./components/App";
import Credit from "./components/Credit";

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
    <Credit />
  </React.StrictMode>
);
