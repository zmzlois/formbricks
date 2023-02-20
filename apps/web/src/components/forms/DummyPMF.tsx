import { useEffect } from "react";

declare global {
  interface Window {
    formbricksPmf: any;
  }
}

export default function DummyPMF() {
  useEffect(() => {
    window.formbricksPmf = {
      ...window.formbricksPmf,
      config: {
        formbricksUrl: "https://app.formbricks.com",
        formId: "cle2plrty0002nu0hqt83bi8q",
        containerId: "formbricks",
        customer: {
          id: "blog@formbricks.com",
          name: "Blog Submissions",
          email: "blog@formbricks.com",
        },
        style: {
          brandColor: "#6366F1",
          containerBgColor: "F8FAFC",
        },
      },
    };
    require("@formbricks/pmf");
    window.formbricksPmf.init();
  }, []);

  return <div className="my-6 rounded-lg shadow-lg" id="formbricks"></div>;
}
