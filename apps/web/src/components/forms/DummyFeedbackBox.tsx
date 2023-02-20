import { useEffect, useState } from "react";

export default function DummyFeedbackBox() {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    window.formbricks = {
      ...window.formbricks,
      config: {
        hqUrl: "https://app.formbricks.com",
        formId: "cle2pg7no0000nu0hjefwy3w7",
        containerId: "formbricks-feedback",
        contact: {
          name: "Matti",
          position: "Co-Founder",
          imgUrl: "https://avatars.githubusercontent.com/u/675065?s=128&v=4",
        },
      },
    };
    // @ts-ignore
    import("@formbricks/feedback").then(() => setInitialized(true));
  }, []);

  useEffect(() => {
    if (initialized) {
      window.formbricks.render();
    }
  }, [initialized]);

  return <div className="my-6 rounded-lg shadow-lg" id="formbricks-feedback"></div>;
}
