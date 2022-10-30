import React from "react";


import { CropGrowth, Temperature, RainDrop, PartlyCloudy } from '@carbon/icons-react';

function PredictiveDetail(props) {
  let title;
  let icon
  let description
  if (props.type === "soil") {
    title = props.title
    icon = <CropGrowth />
    description = `${props.predictiveInfo}`

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
  } else if (props.predictiveInfo.type === "temperature") {
    title = props.predictiveInfo.title
    icon = <Temperature />
    description = `${props.predictiveInfo.value} •C`
  } else if (props.predictiveInfo.type === "precipitation") {
    title = props.predictiveInfo.title
    icon = <RainDrop />
    description = `${props.predictiveInfo.value} mm`
  } else if (props.type === "weather") {
    const weatherValues = props.predictiveInfo;

    const rendered = weatherValues.map((weatherValue) => {
      return (<div className="predictive-card-container" style={{display: "flex", flexDirection: "row"}}>
        <div className="d-flex">{weatherValue.timestampDate.substring(0, 10)}</div>
        <div className="d-flex predictive-card-detail-icon small"><Temperature /></div>
        <div className="d-flex">{weatherValue.temperature.toFixed(0)} °C</div>
        <div className="d-flex predictive-card-detail-icon small"><RainDrop /></div>
        <div className="d-flex">{weatherValue.precipitation.toFixed(2)} mm</div>
      </div>);
    });

    return <div className="predictive-card-container d-flex-column">
      <div className="predictive-card-container d-flex-column">
        <div className="predictive-card-title d-flex">
          <div className="predictive-card-title d-flex">
            <div className="predictive-card-detail-icon">
              <PartlyCloudy />
            </div>
            <div className="bold">{props.title}</div>
          </div>
        </div>
      </div>
      {rendered}
    </div>;
  }
}

export default PredictiveDetail;