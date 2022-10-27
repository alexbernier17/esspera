import React, { useState } from "react";
import ResearchCard from "../card/ResearchCard"
import { useHistory } from 'react-router-dom';


import "../Cards.scss"
import { Button } from '@carbon/react';
import plugginLogo from "../../Images/plugginLogo.svg";

function PlugginCard(props) {

  let history = useHistory();
  const [lat, setLat] = useState("")
  const [long, setLong] = useState("")
  const [crop, setCrop] = useState("")

  const onApply =()=> {
    // history.push("/recopage");
    const search = {"lat": lat, "long": long, "crop": crop};

    history.push({
      pathname: '/recopage',
      state: { search: search }
    });
    console.log("search",search);
  }

  const setInput = (input, type) => {
    if(type==="lat") {
      setLat(input);
      console.log("lat", input)
    } else if(type==="long"){
      setLong(input);
      console.log('long', input)
    } else if(type==="crop"){
      setCrop(input);
      console.log('crop', input)
    }
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
          <ResearchCard view={props.view} onSetInput={setInput}/>
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