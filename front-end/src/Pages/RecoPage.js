import React, {useRef} from "react";
import { Button } from '@carbon/react';
import { useReactToPrint } from 'react-to-print';
import { useLocation } from "react-router-dom";

import "./Pages.scss"
import Reco from "../components/Reco";

const RecoPage = () => {
  const location = useLocation();
  const search = location.state.search

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return(
    <div className="reco-page-container">
      <Reco ref={componentRef} searchParams={search} />
      <div id="print-btn">
        <Button onClick={handlePrint}>Print</Button>
      </div>
    </div>
  )
}

export default RecoPage;
