import * as React from "react";

enum GoogleRecaptchaError {
  SCRIPT_NOT_AVAILABLE = "Google recaptcha is not available",
}

interface IGoogleReCaptchaProviderProps {
  reCaptchaKey?: String;
  language?: String;
}

export interface IGoogleRecaptchaConsumerProps {
  executeRecaptcha?: (action?: string) => Promise<string>;
}

const GoogleReCaptchaContext = React.createContext<
  IGoogleRecaptchaConsumerProps
>({
  // Dummy default context
});

const { Consumer: GoogleReCaptchaConsumer } = GoogleReCaptchaContext;

export { GoogleReCaptchaConsumer, GoogleReCaptchaContext };

export class GoogleRecaptchaProvider extends React.Component<
  IGoogleReCaptchaProviderProps
> {
  scriptId = "google-recaptcha-v3";
  googleRecaptchaSrc = "https://www.google.com/recaptcha/api.js";
  resolver: any = undefined;
  rejecter: any = undefined;

  grecaptcha: Promise<any> = new Promise((resolve, reject) => {
    this.resolver = resolve;
    this.rejecter = reject;
  });

  componentDidMount() {
    if (!this.props.reCaptchaKey) {
      return;
    }

    this.injectGoogleRecaptchaScript();
  }

  componentDidUpdate(prevProps: IGoogleReCaptchaProviderProps) {
    if (prevProps.reCaptchaKey || !this.props.reCaptchaKey) {
      return;
    }

    this.injectGoogleRecaptchaScript();
  }

  componentWillUnmount(): void {
    // I can't imagine what the use case for this would be...

    // remove badge from page
    const nodeBadge = document.querySelector(".grecaptcha-badge");
    if (nodeBadge && nodeBadge.parentNode) {
      document.body.removeChild(nodeBadge.parentNode);
    }

    // remove script
    const script = document.querySelector(`#${this.scriptId}`);
    if (script) {
      script.remove();
    }
  }

  get googleRecaptchaContextValue() {
    return { executeRecaptcha: this.executeRecaptcha };
  }

  executeRecaptcha = async (action?: string) => {
    const { reCaptchaKey } = this.props;

    return this.grecaptcha.then((_grecaptcha) =>
      _grecaptcha.execute(reCaptchaKey, { action })
    );
  };

  handleOnLoad = () => {
    if (!window || !(window as any).grecaptcha) {
      console.warn(GoogleRecaptchaError.SCRIPT_NOT_AVAILABLE);

      return;
    }

    (window as any).grecaptcha.ready(() => {
      this.resolver((window as any).grecaptcha);
    });
  };

  injectGoogleRecaptchaScript = () => {
    /**
     * Scripts has already been injected script.
     * Return this to avoid duplicated scripts
     */
    if (document.getElementById(this.scriptId)) {
      this.handleOnLoad();
      return;
    }

    const { reCaptchaKey, language } = this.props;
    const head = document.getElementsByTagName("head")[0];

    const js = document.createElement("script");
    js.id = this.scriptId;
    js.src = `${this.googleRecaptchaSrc}?render=${reCaptchaKey}${
      language ? `&hl=${language}` : ""
    }`;
    js.onload = this.handleOnLoad;

    head.appendChild(js);
  };

  render() {
    const { children } = this.props;

    return (
      <GoogleReCaptchaContext.Provider value={this.googleRecaptchaContextValue}>
        {children}
      </GoogleReCaptchaContext.Provider>
    );
  }
}
