import React from "react";


import { CropGrowth, Temperature, RainDrop } from '@carbon/icons-react';

function PredictiveDetail(props) {
  let title;
  let icon
  let description
  if (props.predictiveInfo.type === "soil") {
    title = props.predictiveInfo.title
    icon = <CropGrowth />
    description = `${props.predictiveInfo.value}`
  } else if (props.predictiveInfo.type === "temperature") {
    title = props.predictiveInfo.title
    icon = <Temperature />
    description = `${props.predictiveInfo.value} •C`
  } else if (props.predictiveInfo.type === "precipitation") {
    title = props.predictiveInfo.title
    icon = <RainDrop />
    description = `${props.predictiveInfo.value} mm`
  }

  return (
    <div className="predictive-card-container d-flex-column" >
      <div className="predictive-card-title d-flex">
        <div className="predictive-card-detail-icon">
          {icon}
        </div>
        <div className="bold">{title}</div>
      </div>
      <div className="predictive-card-detail-description">{description}</div>
    </div>
  )
}

export default PredictiveDetail;