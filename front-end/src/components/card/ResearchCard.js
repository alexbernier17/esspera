import React from "react";

import { TextInput, Select, SelectItem, Dropdown } from '@carbon/react';

const items = ["Corn", "Soybean", "Rice", "Wheat", "Nut"];

function ResearchCard(props) {

  const searchParams = props.searchParams

  return (
    <>
      {props.view === "assosPage" &&
        <div className="research-card-container">
          <div className="research-card-element d-flex-column">
            Location:
            <div className="element-inputs d-flex">
              <TextInput
                className="research-input"
                id="lat"
                invalidText="A valid value is required"
                placeholder="Enter latitude"
                onChange={e => {
                  props.onSetInput(e.target.value, "lat")
                }}
              />
              <TextInput
                className="research-input"
                id="long"
                invalidText="A valid value is required"
                placeholder="Enter longitude"
                onChange={e => {
                  props.onSetInput(e.target.value, "long")
                }}
              />
            </div>
      
          </div>
          <div className="research-card-element d-flex-column">
            Crop type:
            <Dropdown
              className="research-dropdown"
              ariaLabel="Dropdown"
              id="carbon-dropdown-example"
              items={items}
              label="Select crop"
              onChange={e => {
                props.onSetInput(e.selectedItem, "crop")
              }}
            />
          </div>
        </div>
      }
      {props.view === "recoPage" &&
        <div className="research-card-container research-card-container-reco">
          <div className="research-card-element d-flex">
            Location:
            <div className="element-inputs d-flex">
              <TextInput
                className="research-input"
                id="lat"
                invalidText="A valid value is required"
                value={searchParams["lat"]}
                disabled={true}
              />
              <TextInput
                className="research-input"
                id="long"
                invalidText="A valid value is required"
                value={searchParams["long"]}
                disabled={true}
              />
            </div>
      
          </div>
          <div className="research-card-element d-flex">
            Crop:
            <TextInput
                className="research-input"
                id="crop"
                invalidText="A valid value is required"
                value={searchParams["crop"]}
                disabled={true}
            />
          </div>
        </div>
      }

    </>
  )
}

export default ResearchCard;