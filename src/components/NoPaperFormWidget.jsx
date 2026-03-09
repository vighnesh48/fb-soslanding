
import { useEffect } from "react";

const NoPaperFormWidget = () => {
  useEffect(() => {
    // Add the external script to load the widget
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widgets.in4.nopaperforms.com/emwgts.js";
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="npf_wgts"
      data-height="500px"
      data-w="61eadc64fb6a2a3ab9d22e77978e3a4c"
      style={{ minHeight: "500px" }}
    ></div>
  );
};
<div></div>
export default NoPaperFormWidget;