import React, { useState } from "react";
import { Button, ComposedModal, ModalHeader, ModalBody } from '@carbon/react';
import { useHistory } from "react-router";

import ResearchCard from "./card/ResearchCard";
import SeedCard from "./card/SeedCard";
import plugginLogo from "../Images/plugginLogo.svg"; 

import "./Cards.scss"

const Reco = React.forwardRef((props, ref) => {
  let history = useHistory();

  const dummyData = {
    "lat": "123",
    "long": "456",
    "crop": "Oat",
  }

  const dummySeeds = {
    0: {    name: "seed1",
    yield: "459",
    confidence: "75",
    trait1: "blalab",
    trait2: "456",
    company: "CompanyZ",
    link: "https://developer.mozilla.org/en-US/"
    },
    1:{    name: "seed2",
    yield: "456",
    confidence: "70",
    trait1: "blalab",
    trait2: "456",
    company: "CompanyZ",
    link: "https://developer.mozilla.org/en-US/"
    },
    2:{    name: "seed3",
    yield: "456",
    confidence: "50",
    trait1: "blalab",
    trait2: "456",
    company: "CompanyZ",
    link: "https://developer.mozilla.org/en-US/"
    },
    3:{    name: "seed4",
    yield: "456",
    confidence: "50",
    trait1: "blalab",
    trait2: "456",
    company: "CompanyZ",
    link: "https://developer.mozilla.org/en-US/"
    },
    4:{    name: "seed5",
    yield: "456",
    confidence: "45",
    trait1: "blalab",
    trait2: "456",
    company: "CompanyZ",
    link: "https://developer.mozilla.org/en-US/"
    },
  }

  const [seedModalOpen, setSeedModalOpen] = useState(false)
  const [currentSeed, setCurrentSeed] = useState({})
  const [currentSeedOfficialPage, setCurrentSeedOfficialPage] = useState({})
  const onOpenSeedModal = (seedInfos) => {
    setSeedModalOpen(true);
    let seedDetails = {
      yield: seedInfos.yield,
      confidence: seedInfos.confidence,
      trait1: seedInfos.trait1,
      trait2: seedInfos.trait2
    };
    setCurrentSeed(seedDetails);
    setCurrentSeedOfficialPage(seedInfos.link)
    console.log("seedInfos", seedInfos);
    console.log("seedDetails", seedDetails);


  }

  const closeSeedModalOpen = () => {
    setSeedModalOpen(false);
  }

  const openOfficialSeedPage = () => {
    window.open(currentSeedOfficialPage, "_blank");
  }

  return(
    <div ref={ref} className="reco-page-container">
      <img id="solution-logo" src={plugginLogo} alt="solution logo" />
      <h2>Your custom seed recommendation</h2>
      <div className="reco-page-recap">
        <ResearchCard view="recoPage" searchParams={props.searchParams}/>
        <div>
          <Button onClick={e=> {history.push("/")}}>Modify</Button>
        </div>
      </div>
      <div className="reco-page-results">
        <div className="predictive-value-container"> Predictive values</div>
        <div className="seeds-list d-flex">
          {Object.keys(dummySeeds).map((seed, i) => (
              <SeedCard key={dummySeeds[seed].name} seedInfo={dummySeeds[seed]} seedRanking={i} onOpenSeedModal={onOpenSeedModal} view="seed"/>
            ))
          }  
        </div>
      </div>
      {/* {seedModalOpen && */}
      {seedModalOpen === true && (
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
      )}      {/* } */}
    </div>
  )
});

export default Reco;
