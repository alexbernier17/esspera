import React from "react";


import { Sprout, Building } from '@carbon/icons-react';

function SeedCard(props) {
  const seedDetails = props.seedInfo;
  console.log("seedDetails", seedDetails)

  return (
    <div className="seed-card-container" >
      {props.view === "seed" &&
        <div onClick={e=> {props.onOpenSeedModal(seedDetails)}}>
          <div className="seed-card-rank d-flex">{props.seedRanking}</div>
          <div className="seed-card-details">
            <div className="bold">{seedDetails.name}</div>
            <div className="seed-card-details-container d-flex">
              <div className="seed-card-detail d-flex-column">
                <div className="seed-card-title d-flex">
                  <div className="seed-card-detail-icon">
                    {/* <Add size="24" /> */}
                    <Sprout />
                  </div>
                  <div className="bold">Yield</div>
                </div>
                <div className="seed-card-detail-description">{seedDetails.yield}</div>
              </div>
              <div className="seed-card-detail d-flex-column">
                <div className="seed-card-title d-flex">
                  <div className="seed-card-detail-icon">
                    <Building />
                  </div>
                  <div className="bold">Company</div>
                </div>

                <div className="seed-card-detail-description">{seedDetails.company}</div>
              </div>
            </div>
          </div>
        </div>
      }
      {props.view === "seed details" &&
        <>
          <div className="seedDetails-card-details">
            <div className="seed-card-detail d-flex">
              <div className="seed-card-detail-icon">
                {/* <Add size="24" /> */}
                <Sprout />
              </div>
              <h4>{seedDetails[0].toUpperCase()}</h4>
            </div>
            <div className="seed-card-detail d-flex">
              <h4>
                {seedDetails[1]}
              </h4>
              <div className="seed-card-detail-description">
                {seedDetails[0] === "yield" &&
                  <p>description 1</p>
                }
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default SeedCard;