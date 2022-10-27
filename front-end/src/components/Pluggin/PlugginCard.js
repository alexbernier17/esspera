import React from "react";
import ResearchCard from "../card/ResearchCard"
import { useHistory } from 'react-router-dom';


import "../Cards.scss"
import { Button } from '@carbon/react';
import plugginLogo from "../../Images/plugginLogo.svg";

function PlugginCard(props) {

  let history = useHistory();
  const onApply =()=> {
    console.log("apply");
    history.push("/recopage");
  }

  return (
    <>
      <div className="pluggin-container d-flex-column">
        <header className="pluggin-header d-flex">
          <h4>Get custom seed recommendation</h4>
          <div className="pluggin-logo">
            <img src={plugginLogo} alt="logo" />
          </div>
        </header>
        <div>
          <ResearchCard view={props.view}/>
        </div>
        <div className="pluggin-btn d-flex">
          <Button onClick={e => {onApply()}}>
            Apply
          </Button>
        </div>
      </div>
    </>
  )
};

export default PlugginCard;