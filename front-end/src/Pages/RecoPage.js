import React, {useRef} from "react";
import { Button } from '@carbon/react';
import { useReactToPrint } from 'react-to-print';

import "./Pages.scss"
import Reco from "../components/Reco";

const RecoPage = () => {
  const dummyData = {
    "lat": "123",
    "long": "456",
    "crop": "Oat",
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return(
    <div className="reco-page-container">
      {/* <img id="solution-logo" src={plugginLogo} alt="solution logo" />
      <h2>Your custom seed recommendation</h2>
      <div className="reco-page-recap d-flex">
        <ResearchCard view="recoPage" searchParams={dummyData}/>
        <div>
          <Button onClick={e=> {history.push("/")}}>Modify</Button>
        </div>
      </div>
      <div className="reco-page-results">
        <div> Predictive values</div>
        <div>seeds cards</div>
      </div> */}
      <Reco ref={componentRef} searchParams={dummyData} />
      <div id="print-btn">
        <Button onClick={handlePrint}>Print</Button>
      </div>
    </div>
  )
}

export default RecoPage;
