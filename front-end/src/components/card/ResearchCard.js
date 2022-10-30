import React, { useState } from "react";

import { TextInput, Button, Select, SelectItem, Dropdown } from "@carbon/react";
const items = ["Early Maturity Corn", "Soybean", "Rice", "Wheat", "Nut"];

function ResearchCard(props) {
  const searchParams = props.searchParams;

  const [latInputValue, setLatInputValue] = useState("");
  const [longInputValue, setLongInputValue] = useState("");

  const onClickUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("geolocation.getCurrentPosition latitude is :", position.coords.latitude);
      setLatInputValue(position.coords.latitude);
      props.onSetInput(position.coords.latitude, "lat");
      console.log("geolocation.getCurrentPosition longitude is :", position.coords.longitude);
      setLongInputValue(position.coords.longitude);
      props.onSetInput(position.coords.longitude, "long");
    });
  };

  return (
    <>
      {props.view === "assosPage" && (
        <div className="research-card-container">
          <div className="research-card-element d-flex-column">
            Location:
            <div className="element-inputs d-flex">
              <TextInput
                className="research-input"
                id="lat"
                invalidText="A valid value is required"
                placeholder="Enter latitude"
                value={latInputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setLatInputValue(value);
                  props.onSetInput(value, "lat");
                }}
              />
              <TextInput
                className="research-input"
                id="long"
                invalidText="A valid value is required"
                placeholder="Enter longitude"
                value={longInputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setLongInputValue(value);
                  props.onSetInput(value, "long");
                }}
              />
            </div>
            <Button onClick={onClickUseMyLocation}>
              Use my location
            </Button>
          </div>
          <div className="research-card-element d-flex-column">
            Crop type:
            <Dropdown
              className="research-dropdown"
              ariaLabel="Dropdown"
              id="carbon-dropdown-example"
              items={items}
              label="Select crop"
              onChange={(e) => {
                const value = e.selectedItem;
                props.onSetInput(value, "crop");
              }}
            />
          </div>
        </div>
      )}
      {props.view === "recoPage" && (
        <div className="research-card-container research-card-container-reco">
          <div className="research-card-element d-flex">
            Location:
            <div className="element-inputs d-flex">
              <TextInput className="research-input" id="lat" invalidText="A valid value is required" value={searchParams["lat"]} disabled={true} />
              <TextInput className="research-input" id="long" invalidText="A valid value is required" value={searchParams["long"]} disabled={true} />
            </div>
          </div>
          <div className="research-card-element d-flex">
            Crop:
            <TextInput className="research-input" id="crop" invalidText="A valid value is required" value={searchParams["crop"]} disabled={true} />
          </div>
        </div>
      )}
    </>
  );
}

export default ResearchCard;
