import * as React from "react";
import { useGoogleRecaptcha } from "../use-google-recaptcha";

export const GoogleRecaptchaExample: React.FunctionComponent = () => {
  const { executeRecaptcha } = useGoogleRecaptcha();
  const [token, setToken] = React.useState("");

  const clickHandler = async () => {
    if (!executeRecaptcha) {
      return;
    }

    const result = await executeRecaptcha("homepage");

    setToken(result);
  };

  return (
    <div>
      <button onClick={clickHandler}>Test Recaptcha</button>
      {token && <p>Token: {token}</p>}
    </div>
  );
};
