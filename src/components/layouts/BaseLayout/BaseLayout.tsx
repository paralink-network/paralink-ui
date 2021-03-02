import React from 'react';
import NavigationBar from '../NavigationBar';

const BaseLayout: React.FC<{}> = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      <div className="text-left max-w-screen-lg px-4 mx-auto mt-24">{children}</div>
    </div>
  );
};

export default BaseLayout;
