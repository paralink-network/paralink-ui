import React from 'react';
import { Container } from 'semantic-ui-react';
import NavigationBar from '../NavigationBar';

interface BaseLayoutProps {
  children: any;
}

export default function BaseLayout(props: BaseLayoutProps): JSX.Element {
  return (
    <div>
      <NavigationBar />

      <Container textAlign="left" style={{ marginTop: '7em' }}>
        {props.children}
      </Container>
    </div>
  );
}
