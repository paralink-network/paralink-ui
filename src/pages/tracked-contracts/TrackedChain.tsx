import React from 'react';

interface TrackedChainProps {
  name: string;
  active: boolean;
  onClick: () => void;
}

const TrackedChain: React.FC<TrackedChainProps> = ({ name, active, onClick }) => {
  return (
    <div
      className={`focus:outline-none py-4 capitalize cursor-pointer ${active ? 'font-bold text-primary' : ''}`}
      role="button"
      onClick={() => onClick()}
      onKeyPress={() => onClick()}
      tabIndex={0}
    >
      {name}
    </div>
  );
};

export default TrackedChain;
