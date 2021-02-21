import React from 'react';
import NavigationBar from '../NavigationBar';

interface BaseLayoutProps {
  children: any;
}

export default function BaseLayout(props: BaseLayoutProps): JSX.Element {
  return (
    <div>
      <NavigationBar />
      <div className="text-left max-w-screen-lg px-4 mx-auto mt-24">{props.children}</div>
    </div>
  );
}
