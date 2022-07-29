import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactValidatableFormProvider } from "react-validatable-form";

import App from "./App";

const myCustomHandler = (elementId) => {
  console.log(elementId);
  const element = document.getElementById(elementId);
  element.classList.add("customErrorFocus");
  element.focus();
  setTimeout(() => {
    element.classList.remove("customErrorFocus");
  }, 2000);
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ReactValidatableFormProvider
      hideBeforeSubmit={true}
      showAfterBlur={true}
      focusToErrorAfterSubmit={true}
      elementFocusHandler={myCustomHandler}
      lang="tr"
    >
      <App />
    </ReactValidatableFormProvider>
  </StrictMode>
);
