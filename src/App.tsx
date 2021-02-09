import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import BaseLayout from "./layouts/BaseLayout";
import IpfsList from "./ipfs/IpfsList";
import Ipfs from "./ipfs/Ipfs";

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
