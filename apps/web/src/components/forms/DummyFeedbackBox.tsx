import { useEffect } from "react";

declare global {
  interface Window {
    formbricks: any;
  }
}

export default function FeedbackButton() {
  useEffect(() => {
    window.formbricks = {
      ...window.formbricks,
      config: {
        formbricksUrl: "https://app.formbricks.com",
        formId: "cle2pg7no0000nu0hjefwy3w7",
        containerId: "formbricks-feedback-wrapper",
        contact: {
          name: "Matti",
          position: "Co-Founder",
          imgUrl: "https://avatars.githubusercontent.com/u/675065?s=128&v=4",
        },
      },
    };
    require("@formbricks/feedback");
    window.formbricks.init();
  }, []);

  return <div className="bg-slate-50 shadow-lg" id="formbricks-feedback-wrapper"></div>;
}
