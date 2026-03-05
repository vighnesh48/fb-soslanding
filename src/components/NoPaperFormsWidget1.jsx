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
       <div class="npf_wgts" data-height="550px" data-w="85ede9b36e7402c8518bc48b83ed8bf7"></div>
    </div>
  );
}

export default NoPaperFormsWidget1;
