// import './App.scss';
import PlugginCard from "../components/Pluggin/PlugginCard";
import { Tree } from '@carbon/icons-react';

import "./Pages.scss"

function AssosPage() {

  return (
    <>
      <div className="assos-page-container">
        <header className="assos-page-header d-flex">
          <div className="assos-page-logo d-flex">
            <Tree size="32"/>
          </div>
          <h1>The Association</h1>
        </header>
        <div className="assos-page-body d-flex-column">
          <div className="assos-page-variables d-flex-column">
            <h3>The Association supports farmers</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <PlugginCard view="assosPage" />
          <div className="assos-page-variables">
            <h3>Be a part of your community</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssosPage;
