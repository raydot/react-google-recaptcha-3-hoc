import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Recaptcha from "react-google-invisible-recaptcha";

const recaptchaKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

export class reCaptchaContentComponent extends Component {
  state = {
    firstName: "",
    lastName: "",
    messageSent: false,
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  sendMessage = () => {
    // send req/res to google
    this.recaptcha.execute();
  };

  onResolved = () => {
    // this means we've got req/res from google
    this.setState({ messageSent: true });
    // Process that data //
    console.log(this.state);
  };

  render() {
    let confirmation = this.state.messageSent ? <div>Message Sent!</div> : null;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Contact Form" />
          {confirmation}
          <TextField
            hintText="Enter Your First Name"
            floatingLabelText="First Name"
            onChange={this.handleChange("firstName")}
          />
          <br />
          <TextField
            hintText="Enter Your Last Name"
            floatingLabelText="Last Name"
            onChange={this.handleChange("lastName")}
          />
          <br />
          <RaisedButton
            label="Submit"
            style={StyleSheet.RaisedButton}
            onClick={this.sendMessage}
          />
          <Recaptcha
            ref={(ref) => (this.recaptcha = ref)}
            sitekey={recaptchaKey}
            onResolve={this.onResolved}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default reCaptchaContentComponent;
