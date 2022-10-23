import React from "react";

import { TextInput, Select, SelectItem, Dropdown } from '@carbon/react';

const items = ["test1", "test2", "test3"];

function ResearchCard() {

  return (
    <div className="research-card-container">
      <div className="research-card-element d-flex-column">
        Location:
        <div className="element-inputs d-flex">
          <TextInput
            className="research-input"
            id="lat"
            invalidText="A valid value is required"
            placeholder="Enter latitude"
          />
          <TextInput
            className="research-input"
            id="long"
            invalidText="A valid value is required"
            placeholder="Enter longitude"
          />
        </div>
  
      </div>
      <div className="research-card-element d-flex-column">
        Crop type:
        {/* <Select
          className="research-select-container"
          defaultValue="placeholder-item"
          id="select-1"
          invalidText="A valid value is required"
        >
          <SelectItem
            className="research-select-item"
            text="Select crop"
            value="placeholder-item"
          />
          <SelectItem
            className="research-select-item"
            text="Option 3"
            value="option-3"
          />
          <SelectItem
            className="research-select-item" 
            text="Option 4"
            value="option-4"
          />
        </Select> */}

        <Dropdown
          className="research-dropdown"
          ariaLabel="Dropdown"
          id="carbon-dropdown-example"
          items={items}
          label="Select crop"
        />
      </div>
  
    </div>
  )
}

export default ResearchCard;