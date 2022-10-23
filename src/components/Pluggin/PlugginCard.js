import React from "react";
import ResearchCard from "../card/ResearchCard"

import "../Cards.scss"
import { Button } from '@carbon/react';
import plugginLogo from "../../Images/plugginLogo.svg";

function PlugginCard() {

  return (
    <div className="pluggin-container d-flex-column">
      <header className="pluggin-header d-flex">
        <h4>Get custom seed recommendation</h4>
        <div className="pluggin-logo">
          <img src={plugginLogo} alt="logo" />
        </div>
      </header>
      <div>
        <ResearchCard />
      </div>
      <div className="pluggin-btn d-flex">
        <Button>
          Apply
        </Button>
      </div>
    </div>
  )
};

export default PlugginCard;