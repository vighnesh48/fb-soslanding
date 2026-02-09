
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
      data-height="450px"
      data-w="85ede9b36e7402c8518bc48b83ed8bf7"
      style={{ minHeight: "450px" }}
    ></div>
  );
};
<div></div>
export default NoPaperFormWidget;