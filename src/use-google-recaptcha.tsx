import * as React from "react";
import { GoogleReCaptchaContext } from "./google-recaptcha-provider";

export const useGoogleRecaptcha = () =>
  React.useContext(GoogleReCaptchaContext);
