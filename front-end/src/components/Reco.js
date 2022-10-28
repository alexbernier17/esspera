import React, { useState, useEffect } from "react";
import { Button, ComposedModal, ModalHeader, ModalBody } from "@carbon/react";
import { useHistory } from "react-router";

import ResearchCard from "./card/ResearchCard";
import SeedCard from "./card/SeedCard";
import PredictiveDetail from "./card/PredictiveDetail";

import logo from "../Images/logo.svg";
import "./Cards.scss";

import axios from "axios";

const Reco = React.forwardRef((props, ref) => {
  let history = useHistory();
  useEffect(() => {
    callYieldAPI();
  }, []);
  const dummySeeds = {
    0: { name: "seed1", yield: "459", confidence: "75", trait1: "blalab", trait2: "456", company: "CompanyZ", link: "https://developer.mozilla.org/en-US/" },
    1: { name: "seed2", yield: "456", confidence: "70", trait1: "blalab", trait2: "456", company: "CompanyZ", link: "https://developer.mozilla.org/en-US/" },
    2: { name: "seed3", yield: "456", confidence: "50", trait1: "blalab", trait2: "456", company: "CompanyZ", link: "https://developer.mozilla.org/en-US/" },
    3: { name: "seed4", yield: "456", confidence: "50", trait1: "blalab", trait2: "456", company: "CompanyZ", link: "https://developer.mozilla.org/en-US/" },
    4: { name: "seed5", yield: "456", confidence: "45", trait1: "blalab", trait2: "456", company: "CompanyZ", link: "https://developer.mozilla.org/en-US/" },
  };
  const dummyPredictives = {
    0: { type: "soil", title: "Soil Type", value: "silt" },
    1: { type: "temperature", title: "Forcasting Temperature", value: "17.5" },
    2: { type: "precipitation", title: "Forcasting Precipitation", value: "86.8" },
  };

  const [seedModalOpen, setSeedModalOpen] = useState(false);
  const [currentSeed, setCurrentSeed] = useState({});
  const [currentSeedOfficialPage, setCurrentSeedOfficialPage] = useState({});
  const onOpenSeedModal = (seedInfos) => {
    setSeedModalOpen(true);
    let seedDetails = {
      yield: seedInfos.yield,
      confidence: seedInfos.confidence,
      trait1: seedInfos.trait1,
      trait2: seedInfos.trait2,
    };
    setCurrentSeed(seedDetails);
    setCurrentSeedOfficialPage(seedInfos.link);
    console.log("seedInfos", seedInfos);
    console.log("seedDetails", seedDetails);
  };

  const closeSeedModalOpen = () => {
    setSeedModalOpen(false);
  };

  const openOfficialSeedPage = () => {
    window.open(currentSeedOfficialPage, "_blank");
  };

  const callYieldAPI = () => {
    axios("/yield", {
      params: {
        lon: props.searchParams.long,
        lat: props.searchParams.lat,
        cropType: "'" + props.searchParams.crop + "'",
      },
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div ref={ref} className="reco-page-container">
      <img id="solution-logo" src={logo} alt="solution logo" />
      <h2>Your custom seed recommendation</h2>
      <div className="reco-page-recap">
        <ResearchCard view="recoPage" searchParams={props.searchParams} />
        <div>
          <Button
            onClick={(e) => {
              history.push("/");
            }}
          >
            Modify
          </Button>
        </div>
      </div>
      <div className="reco-page-results">
        <div className="predictive-value-container">
          <div className="predictive-value-title bold">
            <h4 className="bold">Estimate based on:</h4>
          </div>
          <div className="predictive-list d-flex-column">
            {Object.keys(dummyPredictives).map((predictive, i) => (
              <PredictiveDetail key={dummyPredictives[predictive].type} predictiveInfo={dummyPredictives[predictive]} />
            ))}
          </div>
        </div>
        <div className="seeds-list d-flex">
          {Object.keys(dummySeeds).map((seed, i) => (
            <SeedCard key={dummySeeds[seed].name} seedInfo={dummySeeds[seed]} seedRanking={i} onOpenSeedModal={onOpenSeedModal} view="seed" />
          ))}
        </div>
      </div>
      {/* To add when will be seed details to display */}
      {/* {seedModalOpen === true && (
        <ComposedModal
          open={seedModalOpen}
          onClose={closeSeedModalOpen}
          size="lg"
          className="seed-modal"
        >
          <ModalHeader>
            <h2>
              SEED NAME from Company B
            </h2>
          </ModalHeader>
          <ModalBody>
            <div className="seeds-list d-flex">
              {Object.keys(currentSeed).map((el, i) => (
                  <SeedCard key={Math.random()} seedInfo={[el,currentSeed[el]]} view="seed details" />
                ))
              } 
            </div>
            <div className="seeds-off-page-btn d-flex" onClick={openOfficialSeedPage}>
              <h4>Discover more seed's specifications</h4>
            </div>
            <div className="modal-back-btn d-flex" onClick={closeSeedModalOpen}><Button>Back to list</Button></div>
          </ModalBody>
        </ComposedModal>
      )} */}
    </div>
  );
});

export default Reco;
