import * as React from "react";
import * as ReactDom from "react-dom";
import { GoogleRecaptchaProvider } from "../src/google-recaptcha-provider";
import { GoogleRecaptchaExample } from "./google-recaptcha-example";

const recaptchaKeyFromEnv = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

ReactDom.render(
  <div className="App">
    <GoogleRecaptchaProvider reCaptchaKey={recaptchaKeyFromEnv} language="en">
      <h2>Google Recaptcha Example</h2>
      {/* <ReCaptchaContentComponent /> */}
      <GoogleRecaptchaExample />
    </GoogleRecaptchaProvider>
  </div>
);
