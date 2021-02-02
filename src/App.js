import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import BaseLayout from "./layouts/BaseLayout.js";
import IpfsList from "./ipfs/IpfsList.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={["/", "/ipfs"]}>
          <BaseLayout>
            <IpfsList />
          </BaseLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
