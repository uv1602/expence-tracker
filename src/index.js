import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// import {AuthProvider} from "./context/AuthProvider"
//  ReactDOM.render(
//    <React.StrictMode>
//      <BrowserRouter>
//     <AuthProvider>
//       <Route path="/*" element={<App />} />
//     </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
