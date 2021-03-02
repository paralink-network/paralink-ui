import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserContext from '../state/user';
import Ipfs from './pages/ipfs/Ipfs';
import IpfsList from './pages/ipfs/IpfsList';
import QueryController from './pages/query/QueryLoader';
import {
  HOME_PAGE_ROUTE,
  IPFS_BASE_PAGE_ROUTE,
  IPFS_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  QUERY_BUILDER_ROUTE,
  QUERY_LIST_ROUTE,
} from './routes';

const Page = (): JSX.Element => {
  const { user } = useContext(UserContext);

  if (!user.isLoggedIn) return <Redirect to={LOGIN_PAGE_ROUTE} />;

  return (
    <Switch>
      <Route exact path={IPFS_BASE_PAGE_ROUTE} component={IpfsList} />
      <Route path={IPFS_PAGE_ROUTE} component={Ipfs} />
      <Route exact path={QUERY_LIST_ROUTE} render={() => <div />} />
      <Route path={QUERY_BUILDER_ROUTE} component={QueryController} />
      <Route path="" render={() => <Redirect to={HOME_PAGE_ROUTE} />} />
    </Switch>
  );
};

export default Page;
