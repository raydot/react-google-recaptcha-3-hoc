import React from "react";

import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

const reCaptchaContentComponent = (props) => {
  const handleChange = (input) => (e) => {
    // this.setState({ [input]: e.target.value });
  };

  const sendMessage = () => {
    // send req/res to google
    // recaptcha.execute();
  };

  const onResolved = () => {
    // this means we've got req/res from google
    // this.setState({ messageSent: true });
    // Process that data //
    // console.log(this.state);
  };

  let confirmation = false;
  // this.state.messageSent ? <div>Message Sent!</div> : null;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={props.recaptchaKeyFromEnv}>
      <React.Fragment>
        {confirmation}
        First Name:
        <input
          label="Enter Your First Name"
          onChange={handleChange("firstName")}
        />
        <br />
        Last Name:
        <input
          label="Enter Your Last Name"
          onChange={handleChange("lastName")}
        />
        <br />
        <button label="Submit" onClick={sendMessage()}>
          Submit
        </button>
      </React.Fragment>
    </GoogleReCaptchaProvider>
  );
};

export default reCaptchaContentComponent;
