import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import BaseLayout from "./layouts/BaseLayout.js";
import IpfsList from "./ipfs/IpfsList.js";
import Ipfs from "./ipfs/Ipfs.js";

function App() {
  return (
    <Router>
      <BaseLayout>
        <Switch>
          <Route path="/ipfs/:hash" component={Ipfs} />
          <Route path={["/", "/ipfs"]} component={IpfsList} />
        </Switch>
      </BaseLayout>
    </Router>
  );
}

export default App;
