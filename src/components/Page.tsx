import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Ipfs from '../pages/ipfs/Ipfs';
import IpfsList from '../pages/ipfs/IpfsList';
import UserContext from '../state/user';
import { IPFS_BASE_PAGE, IPFS_PAGE, LOGIN_PAGE } from './urls';

const Page = (): JSX.Element => {
  const { user } = useContext(UserContext);

  if (!user.isLoggedIn) return <Redirect to={LOGIN_PAGE} />;

  return (
    <Switch>
      <Route exact path={IPFS_BASE_PAGE} component={IpfsList} />
      <Route path={IPFS_PAGE} component={Ipfs} />
    </Switch>
  );
};

export default Page;
