import React from "react";
import "./App.css";
import ReCaptchaContentComponent from "./components/reCaptchaContentComponent";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const recaptchaKeyFromEnv = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

function App() {
  return (
    <div className="App">
      <GoogleReCaptchaProvider reCaptchaKey={recaptchaKeyFromEnv} language="en">
        <ReCaptchaContentComponent />
      </GoogleReCaptchaProvider>
    </div>
  );
}

export default App;
