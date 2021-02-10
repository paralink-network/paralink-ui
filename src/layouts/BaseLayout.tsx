import { Container } from 'semantic-ui-react';
import React, { ReactNode } from 'react';
import { NavigationBar } from '../NavigationBar';

interface BaseLayoutProps {
  children: any;
}

function BaseLayout(props: BaseLayoutProps): ReactNode {
  return (
    <div>
      <NavigationBar />

      <Container textAlign="left" style={{ marginTop: '7em' }}>
        {props.children}
      </Container>
    </div>
  );
}

export default BaseLayout;
