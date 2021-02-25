import React from 'react';
import { Container } from 'semantic-ui-react';
import { NavigationBar } from '../NavigationBar';

const BaseLayout: React.FC<{}> = ({ children }) => (
  <div>
    <NavigationBar />

    <Container textAlign="left" style={{ marginTop: '7em' }}>
      {children}
    </Container>
  </div>
);

export default BaseLayout;
