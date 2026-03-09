import { useEffect } from "react";

function NoPaperFormsWidget1() {

  useEffect(() => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://widgets.in4.nopaperforms.com/emwgts.js";

    document.body.appendChild(s);

    return () => {
      document.body.removeChild(s);
    };
  }, []);

  return (
    <div>
       <div class="npf_wgts" data-height="550px" data-w="61eadc64fb6a2a3ab9d22e77978e3a4c"></div>
    </div>
  );
}

export default NoPaperFormsWidget1;
