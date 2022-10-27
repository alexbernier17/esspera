import './App.scss';
import PlugginCard from "./components/Pluggin/PlugginCard";
import { 
  Switch,
  Route } from 'react-router-dom';

import AssosPage from "./Pages/AssosPage";
import RecoPage from "./Pages/RecoPage";
import { Tree } from '@carbon/icons-react';

function App() {
  return (
    <div className="page-container">
    <Switch>
        <Route path="/recopage" >
          <RecoPage />
        </Route>
        <Route path="/" >
          <AssosPage />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
