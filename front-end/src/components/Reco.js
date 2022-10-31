import React, { useState, useEffect } from "react";
import { Button, ComposedModal, ModalHeader, ModalBody, Loading } from "@carbon/react";
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

  const [isLoading, setIsLoading] = useState(true);
  const [soilType, setSoilType] = useState("");
  const [isWeatherForecast, setIsWeatherForecast] = useState(true);
  const [weatherValues, setWeatherValues] = useState([]);
  const [yieldPredictions, setYieldPredictions] = useState([]);

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

  const mapBrandToCompany = (yieldsInfo) => {
    yieldsInfo.forEach((yieldInfo) => {
      if(yieldInfo.seedVariantBrand == "ArgoHybrids") {
        yieldInfo.seedVariantCompany = "ArgoHybrids Inc";
      } else if(yieldInfo.seedVariantBrand == "Corn Seeds") {
        yieldInfo.seedVariantCompany = "Corn Seeds Genetics";
      } else if(yieldInfo.seedVariantBrand == "Hybrids Seeds") {
        yieldInfo.seedVariantCompany = "Hybrids Seeds Inc";
      } else if(yieldInfo.seedVariantBrand == "C Genetics") {
        yieldInfo.seedVariantCompany = "C Genetics Inc";
      } else if(yieldInfo.seedVariantBrand == "Legacy Trials") {
        yieldInfo.seedVariantCompany = "Legacy Trials";
      }
    });
  };

  const callYieldAPI = () => {
    axios("/yield", {
      params: {
        lon: props.searchParams.long,
        lat: props.searchParams.lat,
        cropType: "'" + props.searchParams.crop + "'",
      },
    }).then(function (response) {
      const responseData = response.data;
      setSoilType(responseData.soilType);
      setIsWeatherForecast(responseData.weatherInfo.forecast);
      setWeatherValues(responseData.weatherInfo.values);
      mapBrandToCompany(responseData.yieldsInfo)
      setYieldPredictions(responseData.yieldsInfo);
      setIsLoading(false);
    }).catch(function (error) {
      console.log(error);
      setIsLoading(false);
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
      
      {isLoading ?
        <Loading description="Getting predictions" />
        :
        <div className="reco-page-results">
          <div className="predictive-value-container">
            <div className="predictive-value-title bold">
              <h4 className="bold">Estimate based on:</h4>
            </div>
            <div className="predictive-list d-flex-column">
              <PredictiveDetail type={"soil"} title={"Soil Type"} predictiveInfo={soilType} />
              <PredictiveDetail type={"weather"} title={isWeatherForecast ? "Forecast Weather" : "Current Weather"} predictiveInfo={weatherValues} />
            </div>
          </div>
          <div className="seeds-list d-flex">
            {yieldPredictions.map((yieldPrediction, i) => (
              <SeedCard seedInfo={yieldPrediction} seedRanking={i} onOpenSeedModal={onOpenSeedModal} view="seed" />
            ))}
          </div>
        </div>
      }
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
