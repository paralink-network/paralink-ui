import React from 'react';
import { NavigationBar } from '../NavigationBar';

const BaseLayout: React.FC<{}> = ({ children }) => (
  <div>
    <NavigationBar />


    <div className="container-fluid" style={{ paddingTop: '7em' }}>
      {children}
    </div>
  </div>
);

export default BaseLayout;
